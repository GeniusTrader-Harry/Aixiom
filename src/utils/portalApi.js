import { supabase } from './supabase'

// Data layer for the student + teacher portals. Every call relies on Supabase
// Row-Level Security to scope results to the current user — see supabase/schema.sql.

const MATERIALS_BUCKET = 'materials'
const SUBMISSIONS_BUCKET = 'submissions'
const SIGNED_URL_TTL = 60 * 60 // 1 hour

// ---- shared ----
export async function listSubjects() {
  const { data, error } = await supabase.from('subjects').select('*').order('name_en')
  if (error) throw error
  return data
}

export async function getSignedUrl(bucket, path) {
  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, SIGNED_URL_TTL)
  if (error) throw error
  return data.signedUrl
}

// ---- student ----
export async function listMyMaterials() {
  // RLS returns only materials assigned to this student or their subjects.
  const { data, error } = await supabase
    .from('materials')
    .select('*, subjects(name_en, name_zh)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function listMyFeedback() {
  const { data, error } = await supabase
    .from('feedback')
    .select('*, subjects(name_en, name_zh)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function listMySubmissions() {
  const { data, error } = await supabase
    .from('submissions')
    .select('*, subjects(name_en, name_zh)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function submitWork({ userId, title, subjectId, note, file }) {
  const safeName = file.name.replace(/[^\w.\-]+/g, '_')
  const path = `${userId}/${Date.now()}_${safeName}`
  const up = await supabase.storage.from(SUBMISSIONS_BUCKET).upload(path, file)
  if (up.error) throw up.error
  const { error } = await supabase.from('submissions').insert({
    student_id: userId,
    subject_id: subjectId || null,
    title,
    storage_path: path,
    note: note || null,
  })
  if (error) throw error
}

export async function listMyEnrollments() {
  const { data, error } = await supabase
    .from('enrollments')
    .select('*, subjects(name_en, name_zh)')
  if (error) throw error
  return data
}

// ---- teacher ----
export async function listStudents() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'student')
    .order('full_name')
  if (error) throw error
  return data
}

export async function listEnrollments() {
  const { data, error } = await supabase
    .from('enrollments')
    .select('*, subjects(name_en, name_zh)')
  if (error) throw error
  return data
}

export async function createEnrollment({ studentId, subjectId, mentorId }) {
  const { error } = await supabase
    .from('enrollments')
    .insert({ student_id: studentId, subject_id: subjectId, mentor_id: mentorId || null })
  if (error) throw error
}

export async function uploadMaterialFile(file) {
  const safeName = file.name.replace(/[^\w.\-]+/g, '_')
  const path = `${Date.now()}_${safeName}`
  const { error } = await supabase.storage.from(MATERIALS_BUCKET).upload(path, file)
  if (error) throw error
  return path
}

export async function listAllMaterials() {
  const { data, error } = await supabase
    .from('materials')
    .select('*, subjects(name_en, name_zh), profiles!materials_student_id_fkey(full_name)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createMaterial({ titleEn, titleZh, kind, url, storagePath, subjectId, studentId, createdBy }) {
  const { error } = await supabase.from('materials').insert({
    title_en: titleEn,
    title_zh: titleZh || null,
    kind,
    url: url || null,
    storage_path: storagePath || null,
    subject_id: subjectId || null,
    student_id: studentId || null,
    created_by: createdBy,
  })
  if (error) throw error
}

export async function deleteMaterial(id) {
  const { error } = await supabase.from('materials').delete().eq('id', id)
  if (error) throw error
}

export async function listAllSubmissions() {
  const { data, error } = await supabase
    .from('submissions')
    .select('*, subjects(name_en, name_zh), profiles(full_name)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function markSubmissionReviewed(id) {
  const { error } = await supabase.from('submissions').update({ status: 'reviewed' }).eq('id', id)
  if (error) throw error
}

export async function createFeedback({ studentId, teacherId, submissionId, subjectId, body, grade }) {
  const { error } = await supabase.from('feedback').insert({
    student_id: studentId,
    teacher_id: teacherId,
    submission_id: submissionId || null,
    subject_id: subjectId || null,
    body,
    grade: grade || null,
  })
  if (error) throw error
}
