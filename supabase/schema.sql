-- AiXiom portal schema for Supabase (Postgres + RLS + Storage)
-- Run this in the Supabase SQL editor on a fresh project.
-- V1 scope: per-student accounts, materials (upload & assign), feedback & grades,
-- and student submissions. Session requests stay on the existing mailto flow for now.
--
-- Security model: students can only ever read their OWN rows; teachers can manage
-- everything. Role is stored on `profiles` and must be set to 'teacher' MANUALLY in
-- the dashboard (students cannot self-promote).

-- ────────────────────────────────────────────────────────────────────────────
-- 1. Profiles (extends auth.users)
-- ────────────────────────────────────────────────────────────────────────────
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  role        text not null default 'student' check (role in ('student', 'teacher')),
  created_at  timestamptz not null default now()
);

-- Auto-create a profile row whenever a new auth user signs up (defaults to student).
create function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper: is the current user a teacher?
create function public.is_teacher()
returns boolean language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'teacher');
$$;

-- ────────────────────────────────────────────────────────────────────────────
-- 2. Subjects (the catalogue students get enrolled in)
-- ────────────────────────────────────────────────────────────────────────────
create table public.subjects (
  id       text primary key,           -- e.g. 'alevel-econ'
  name_en  text not null,
  name_zh  text not null
);

insert into public.subjects (id, name_en, name_zh) values
  ('alevel-econ', 'A-Level Economics', 'A-Level 经济学'),
  ('igcse',       'IGCSE Economics',   'IGCSE 经济学'),
  ('ielts',       'IELTS',             '雅思'),
  ('epq',         'EPQ',               'EPQ 拓展项目'),
  ('pf-debate',   'PF Debate',         '公共论坛辩论');

-- ────────────────────────────────────────────────────────────────────────────
-- 3. Enrollments (student ↔ subject ↔ mentor)
-- ────────────────────────────────────────────────────────────────────────────
create table public.enrollments (
  id          uuid primary key default gen_random_uuid(),
  student_id  uuid not null references public.profiles (id) on delete cascade,
  subject_id  text not null references public.subjects (id),
  mentor_id   uuid references public.profiles (id),
  created_at  timestamptz not null default now(),
  unique (student_id, subject_id)
);

-- ────────────────────────────────────────────────────────────────────────────
-- 4. Materials (teacher uploads / links; assigned to a subject and/or a student)
--    student_id null  → visible to everyone enrolled in subject_id
--    student_id set   → visible only to that student
-- ────────────────────────────────────────────────────────────────────────────
create table public.materials (
  id            uuid primary key default gen_random_uuid(),
  title_en      text not null,
  title_zh      text,
  kind          text not null check (kind in ('link', 'file')),
  url           text,                  -- for kind = 'link'
  storage_path  text,                  -- for kind = 'file' (bucket: materials)
  subject_id    text references public.subjects (id),
  student_id    uuid references public.profiles (id) on delete cascade,
  created_by    uuid not null references public.profiles (id),
  created_at    timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────────────────────
-- 5. Submissions (student uploads their work; teacher reviews)
-- ────────────────────────────────────────────────────────────────────────────
create table public.submissions (
  id            uuid primary key default gen_random_uuid(),
  student_id    uuid not null references public.profiles (id) on delete cascade,
  subject_id    text references public.subjects (id),
  title         text not null,
  storage_path  text not null,         -- bucket: submissions
  note          text,
  status        text not null default 'submitted' check (status in ('submitted', 'reviewed')),
  created_at    timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────────────────────
-- 6. Feedback & grades (teacher → student, optionally tied to a submission)
-- ────────────────────────────────────────────────────────────────────────────
create table public.feedback (
  id             uuid primary key default gen_random_uuid(),
  student_id     uuid not null references public.profiles (id) on delete cascade,
  teacher_id     uuid not null references public.profiles (id),
  submission_id  uuid references public.submissions (id) on delete set null,
  subject_id     text references public.subjects (id),
  body           text not null,
  grade          text,                 -- free text, e.g. 'A*', '88/100'
  created_at     timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────────────────────
-- 7. Row-Level Security
-- ────────────────────────────────────────────────────────────────────────────
alter table public.profiles    enable row level security;
alter table public.subjects    enable row level security;
alter table public.enrollments enable row level security;
alter table public.materials   enable row level security;
alter table public.submissions enable row level security;
alter table public.feedback    enable row level security;

-- profiles: read own or (teacher reads all); update own name
create policy "profiles read"   on public.profiles for select using (id = auth.uid() or public.is_teacher());
create policy "profiles update" on public.profiles for update using (id = auth.uid());

-- subjects: anyone signed in can read
create policy "subjects read" on public.subjects for select using (auth.uid() is not null);

-- enrollments: student reads own; teachers full access
create policy "enroll read"  on public.enrollments for select using (student_id = auth.uid() or public.is_teacher());
create policy "enroll write" on public.enrollments for all    using (public.is_teacher()) with check (public.is_teacher());

-- materials: teachers full access; students read those assigned to them or their subjects
create policy "materials teacher" on public.materials for all using (public.is_teacher()) with check (public.is_teacher());
create policy "materials student read" on public.materials for select using (
  student_id = auth.uid()
  or (student_id is null and subject_id in (
        select subject_id from public.enrollments where student_id = auth.uid()))
);

-- submissions: student manages own; teachers read all + update status
create policy "subm student" on public.submissions for all using (student_id = auth.uid()) with check (student_id = auth.uid());
create policy "subm teacher read"   on public.submissions for select using (public.is_teacher());
create policy "subm teacher update" on public.submissions for update using (public.is_teacher());

-- feedback: teachers full access; students read their own
create policy "fb teacher" on public.feedback for all using (public.is_teacher()) with check (public.is_teacher());
create policy "fb student read" on public.feedback for select using (student_id = auth.uid());

-- ────────────────────────────────────────────────────────────────────────────
-- 8. Storage buckets (create in Dashboard → Storage, then apply these policies)
--    Buckets: 'materials' (private), 'submissions' (private)
-- ────────────────────────────────────────────────────────────────────────────
-- Run after the buckets exist:
-- materials: teachers write, assigned students read (read is enforced via signed URLs
--   issued by the app after checking the materials table; keep bucket private).
create policy "materials bucket teacher write" on storage.objects for insert
  to authenticated with check (bucket_id = 'materials' and public.is_teacher());
create policy "materials bucket teacher manage" on storage.objects for all
  to authenticated using (bucket_id = 'materials' and public.is_teacher());

-- submissions: a student writes into their own folder (path prefixed with their uid);
--   teachers can read everything.
create policy "submissions bucket student write" on storage.objects for insert
  to authenticated with check (
    bucket_id = 'submissions' and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "submissions bucket student read own" on storage.objects for select
  to authenticated using (
    bucket_id = 'submissions'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_teacher())
  );
