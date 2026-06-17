import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaSignOutAlt,
  FaUsers,
  FaFolderOpen,
  FaInbox,
  FaCommentDots,
  FaTrashAlt,
  FaDownload,
  FaCheck,
  FaCloudUploadAlt,
  FaChevronDown,
  FaBookOpen,
} from 'react-icons/fa'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import PortalLogin from '../components/portal/PortalLogin'
import PortalNotice from '../components/portal/PortalNotice'
import { useAuth } from '../context/AuthContext'
import { translations } from '../utils/translations'
import { courseIcons, courseKey, courseKeyForSubject, groupMaterialsByCourse } from '../utils/courses'
import {
  listStudents,
  listEnrollments,
  createEnrollment,
  listAllMaterials,
  uploadMaterialFile,
  createMaterial,
  deleteMaterial,
  listAllSubmissions,
  markSubmissionReviewed,
  createFeedback,
  listSubjects,
  getSignedUrl,
} from '../utils/portalApi'

const inputClasses =
  'w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/60 transition-colors'

// The teacher portal is English-only; use the EN course catalogue.
const courseCatalog = translations.en.coursesPage.courses

const TABS = {
  students: 'Students',
  courses: 'Courses',
  submissions: 'Submissions',
  feedback: 'Feedback',
}

export default function TeacherPage() {
  const { user, profile, role, loading, isSupabaseConfigured, signOut } = useAuth()

  const [tab, setTab] = useState('students')
  const [students, setStudents] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [materials, setMaterials] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [subjects, setSubjects] = useState([])

  const [enrollForm, setEnrollForm] = useState({ studentId: '', subjectId: '' })
  const [fbForm, setFbForm] = useState({ studentId: '', subjectId: '', submissionId: '', body: '', grade: '' })
  const [fbBusy, setFbBusy] = useState(false)
  const [openCourses, setOpenCourses] = useState(() => new Set())

  const isTeacher = role === 'teacher'

  // Group every material under the course it belongs to (mirrors the student portal).
  const materialsByCourse = useMemo(() => groupMaterialsByCourse(materials), [materials])

  // Auto-expand the courses that actually have materials once they load.
  useEffect(() => {
    setOpenCourses(new Set(Object.keys(materialsByCourse)))
  }, [materialsByCourse])

  const toggleCourse = (k) =>
    setOpenCourses((prev) => {
      const next = new Set(prev)
      next.has(k) ? next.delete(k) : next.add(k)
      return next
    })

  const refresh = () => {
    Promise.all([
      listStudents(),
      listEnrollments(),
      listAllMaterials(),
      listAllSubmissions(),
      listSubjects(),
    ])
      .then(([st, en, mat, sub, subj]) => {
        setStudents(st)
        setEnrollments(en)
        setMaterials(mat)
        setSubmissions(sub)
        setSubjects(subj)
      })
      .catch(() => {})
  }

  useEffect(() => {
    if (isTeacher) refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTeacher])

  const enrolledSubjects = (studentId) =>
    enrollments
      .filter((e) => e.student_id === studentId)
      .map((e) => e.subjects?.name_en)
      .filter(Boolean)
      .join(', ')

  const submitEnroll = async (e) => {
    e.preventDefault()
    if (!enrollForm.studentId || !enrollForm.subjectId) return
    try {
      await createEnrollment(enrollForm)
      setEnrollForm({ studentId: '', subjectId: '' })
      refresh()
    } catch {
      /* ignore */
    }
  }

  // Subjects that belong to a given course key (e.g. 'alevel' → A-Level Economics).
  const subjectsForCourse = (k) => subjects.filter((s) => courseKeyForSubject(s.id) === k)

  const removeMaterial = async (id) => {
    try {
      await deleteMaterial(id)
      setMaterials((prev) => prev.filter((m) => m.id !== id))
    } catch {
      /* ignore */
    }
  }

  const renderMaterialRows = (items) => (
    <ul className="space-y-2">
      {items.map((m) => (
        <li key={m.id} className="flex items-start gap-3 px-4 py-3 rounded-lg bg-gray-900 border border-gray-800">
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold">{m.title_en}</p>
            <p className="text-xs text-gray-500">
              {m.kind}
              {m.subjects ? ` · ${m.subjects.name_en}` : ''}
              {m.profiles ? ` · ${m.profiles.full_name}` : ''}
            </p>
          </div>
          <button onClick={() => removeMaterial(m.id)} className="text-gray-600 hover:text-red-400 transition-colors p-1" aria-label="Delete"><FaTrashAlt /></button>
        </li>
      ))}
    </ul>
  )

  const downloadSubmission = async (s) => {
    try {
      const url = await getSignedUrl('submissions', s.storage_path)
      window.open(url, '_blank', 'noopener')
    } catch {
      /* ignore */
    }
  }

  const reviewSubmission = async (id) => {
    try {
      await markSubmissionReviewed(id)
      setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'reviewed' } : s)))
    } catch {
      /* ignore */
    }
  }

  const submitFeedback = async (e) => {
    e.preventDefault()
    if (!fbForm.studentId || !fbForm.body) return
    setFbBusy(true)
    try {
      await createFeedback({
        studentId: fbForm.studentId,
        teacherId: user.id,
        submissionId: fbForm.submissionId,
        subjectId: fbForm.subjectId,
        body: fbForm.body,
        grade: fbForm.grade,
      })
      setFbForm({ studentId: '', subjectId: '', submissionId: '', body: '', grade: '' })
    } catch {
      /* ignore */
    }
    setFbBusy(false)
  }

  // ---------- Gate states ----------
  if (!isSupabaseConfigured) return <PortalNotice title="Teacher Portal" message="The portal isn't connected yet." />
  if (loading) return <PortalNotice title="Teacher Portal" message="Loading…" />
  if (!user) return <PortalLogin title="Teacher Portal" subtitle="Sign in with your teacher account." crossTo="student" />
  if (!isTeacher)
    return (
      <PortalNotice
        title="Teacher Portal"
        message="This account isn't a teacher. Ask an admin to set your role to 'teacher'."
      />
    )

  return (
    <div className="pt-24">
      <Section background="gray">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Teacher Portal — {profile?.full_name || user.email}
          </h1>
          <button onClick={signOut} className="inline-flex items-center gap-2 self-start px-4 py-2 text-sm font-semibold rounded-lg border border-white/40 text-white hover:bg-white/10 transition-colors">
            <FaSignOutAlt /> Sign out
          </button>
        </motion.div>

        {/* Tabs */}
        <div className="flex mb-12 overflow-x-auto">
          <div className="inline-flex rounded-xl border border-gray-700 p-1 bg-gray-900/60">
            {Object.entries(TABS).map(([key, label]) => (
              <button key={key} type="button" onClick={() => setTab(key)} className={`px-5 sm:px-6 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 ${tab === key ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* ---- Students ---- */}
          {tab === 'students' && (
            <motion.div key="students" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><FaUsers /> Students</h2>
                {students.length === 0 ? (
                  <p className="text-gray-500">No students yet. They appear here after they sign up.</p>
                ) : (
                  <ul className="space-y-3">
                    {students.map((s) => (
                      <li key={s.id} className="px-4 py-3 rounded-lg bg-gray-950 border border-gray-800">
                        <p className="text-white font-semibold">{s.full_name || '(no name)'}</p>
                        <p className="text-sm text-gray-500">{enrolledSubjects(s.id) || 'Not enrolled in any subject'}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <form onSubmit={submitEnroll} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-4 self-start">
                <h2 className="text-xl font-bold text-white mb-2">Enroll a student</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Student</label>
                  <select value={enrollForm.studentId} onChange={(e) => setEnrollForm((p) => ({ ...p, studentId: e.target.value }))} className={inputClasses}>
                    <option value="">— Select —</option>
                    {students.map((s) => (<option key={s.id} value={s.id}>{s.full_name || s.id}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <select value={enrollForm.subjectId} onChange={(e) => setEnrollForm((p) => ({ ...p, subjectId: e.target.value }))} className={inputClasses}>
                    <option value="">— Select —</option>
                    {subjects.map((s) => (<option key={s.id} value={s.id}>{s.name_en}</option>))}
                  </select>
                </div>
                <Button type="submit" className="w-full">Enroll</Button>
              </form>
            </motion.div>
          )}

          {/* ---- Courses ---- */}
          {tab === 'courses' && (
            <motion.div key="courses" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Courses</h2>
                <p className="text-gray-400">All the courses we offer — open a course to manage and upload its materials.</p>
              </div>
              <div className="space-y-4 max-w-3xl">
                {courseCatalog.map((course, index) => {
                  const k = courseKey(course)
                  const items = materialsByCourse[k] ?? []
                  const isOpen = openCourses.has(k)
                  const Icon = courseIcons[index] ?? FaBookOpen
                  return (
                    <div key={k} className="rounded-xl border border-gray-800 bg-gray-950 overflow-hidden">
                      <button type="button" onClick={() => toggleCourse(k)} aria-expanded={isOpen} className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-gray-900/60 transition-colors">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="flex items-center justify-center w-11 h-11 bg-white/10 text-white rounded-xl flex-shrink-0"><Icon className="text-lg" /></div>
                          <div className="min-w-0">
                            <h3 className="text-white font-semibold">{course.title}</h3>
                            <p className="text-xs text-gray-500 truncate">{course.topics.join(' · ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          {items.length > 0 && (
                            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-white/10 text-gray-300 border border-white/20">{items.length}</span>
                          )}
                          <FaChevronDown className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1">
                          {items.length === 0 ? (
                            <p className="text-gray-600 text-sm py-1">No materials for this course yet.</p>
                          ) : (
                            renderMaterialRows(items)
                          )}
                          <CourseUploader
                            subjectOptions={subjectsForCourse(k)}
                            createdBy={user.id}
                            onCreated={refresh}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}

                {/* Materials whose subject doesn't match a listed course. */}
                {(materialsByCourse.other?.length ?? 0) > 0 && (
                  <div className="rounded-xl border border-gray-800 bg-gray-950 overflow-hidden">
                    <button type="button" onClick={() => toggleCourse('other')} aria-expanded={openCourses.has('other')} className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-gray-900/60 transition-colors">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="flex items-center justify-center w-11 h-11 bg-white/10 text-white rounded-xl flex-shrink-0"><FaFolderOpen className="text-lg" /></div>
                        <h3 className="text-white font-semibold">Other Materials</h3>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-white/10 text-gray-300 border border-white/20">{materialsByCourse.other.length}</span>
                        <FaChevronDown className={`text-gray-500 transition-transform duration-200 ${openCourses.has('other') ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    {openCourses.has('other') && (
                      <div className="px-5 pb-5 pt-1">{renderMaterialRows(materialsByCourse.other)}</div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ---- Submissions ---- */}
          {tab === 'submissions' && (
            <motion.div key="submissions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><FaInbox /> Student submissions</h2>
              {submissions.length === 0 ? (
                <p className="text-gray-500">No submissions yet.</p>
              ) : (
                <ul className="space-y-3 max-w-3xl">
                  {submissions.map((s) => (
                    <li key={s.id} className="flex items-center gap-4 px-4 py-3 rounded-lg bg-gray-950 border border-gray-800">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold">{s.title}</p>
                        <p className="text-sm text-gray-500">
                          {s.profiles?.full_name || 'Student'}
                          {s.subjects ? ` · ${s.subjects.name_en}` : ''}
                          {' · '}{(s.created_at || '').slice(0, 10)}
                        </p>
                        {s.note && <p className="text-sm text-gray-400 mt-1">{s.note}</p>}
                      </div>
                      <button onClick={() => downloadSubmission(s)} className="text-gray-400 hover:text-white p-2" aria-label="Download"><FaDownload /></button>
                      {s.status === 'reviewed' ? (
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-white text-black">Reviewed</span>
                      ) : (
                        <button onClick={() => reviewSubmission(s.id)} className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-white/40 text-white hover:bg-white/10"><FaCheck /> Mark reviewed</button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}

          {/* ---- Feedback ---- */}
          {tab === 'feedback' && (
            <motion.div key="feedback" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }} className="max-w-2xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><FaCommentDots /> Give feedback</h2>
              <form onSubmit={submitFeedback} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Student</label>
                    <select value={fbForm.studentId} onChange={(e) => setFbForm((p) => ({ ...p, studentId: e.target.value }))} className={inputClasses}>
                      <option value="">— Select —</option>
                      {students.map((s) => (<option key={s.id} value={s.id}>{s.full_name || s.id}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject (optional)</label>
                    <select value={fbForm.subjectId} onChange={(e) => setFbForm((p) => ({ ...p, subjectId: e.target.value }))} className={inputClasses}>
                      <option value="">— None —</option>
                      {subjects.map((s) => (<option key={s.id} value={s.id}>{s.name_en}</option>))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Link to a submission (optional)</label>
                  <select value={fbForm.submissionId} onChange={(e) => setFbForm((p) => ({ ...p, submissionId: e.target.value }))} className={inputClasses}>
                    <option value="">— None —</option>
                    {submissions.filter((s) => !fbForm.studentId || s.student_id === fbForm.studentId).map((s) => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Feedback</label>
                  <textarea rows={5} required value={fbForm.body} onChange={(e) => setFbForm((p) => ({ ...p, body: e.target.value }))} className={inputClasses} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Grade (optional)</label>
                  <input type="text" value={fbForm.grade} onChange={(e) => setFbForm((p) => ({ ...p, grade: e.target.value }))} placeholder="e.g. A*, 88/100" className={inputClasses} />
                </div>
                <Button type="submit" className="w-full" disabled={fbBusy}>{fbBusy ? 'Sending…' : 'Send feedback'}</Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </div>
  )
}

// Inline per-course material uploader. Drop a file (or paste a link) and it's
// saved straight to this course's subject — no separate "add material" form.
function CourseUploader({ subjectOptions, createdBy, onCreated }) {
  const [form, setForm] = useState({ titleEn: '', kind: 'file', url: '', file: null, subjectId: '' })
  const [busy, setBusy] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  // Default to (and keep up to date with) the first subject for this course.
  const defaultSubjectId = subjectOptions[0]?.id || ''
  useEffect(() => {
    setForm((p) => (p.subjectId ? p : { ...p, subjectId: defaultSubjectId }))
  }, [defaultSubjectId])

  if (subjectOptions.length === 0) {
    return (
      <p className="text-xs text-gray-600 mt-4 border-t border-gray-800 pt-4">
        No subject is configured for this course yet — add one to the database to enable uploads.
      </p>
    )
  }

  const subjectId = form.subjectId || defaultSubjectId

  const submit = async (e) => {
    e.preventDefault()
    if (!form.titleEn || !subjectId) return
    if (form.kind === 'file' && !form.file) return
    if (form.kind === 'link' && !form.url) return
    setBusy(true)
    try {
      let storagePath = null
      let url = null
      if (form.kind === 'file') storagePath = await uploadMaterialFile(form.file)
      else url = form.url
      await createMaterial({ titleEn: form.titleEn, kind: form.kind, url, storagePath, subjectId, createdBy })
      setForm({ titleEn: '', kind: 'file', url: '', file: null, subjectId })
      onCreated?.()
    } catch {
      /* ignore */
    }
    setBusy(false)
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files?.[0]
    if (f) setForm((p) => ({ ...p, kind: 'file', file: f }))
  }

  return (
    <form onSubmit={submit} className="mt-4 border-t border-gray-800 pt-4 space-y-3">
      <input
        type="text"
        required
        placeholder="Material title"
        value={form.titleEn}
        onChange={(e) => setForm((p) => ({ ...p, titleEn: e.target.value }))}
        className={inputClasses}
      />
      {subjectOptions.length > 1 && (
        <select value={subjectId} onChange={(e) => setForm((p) => ({ ...p, subjectId: e.target.value }))} className={inputClasses}>
          {subjectOptions.map((s) => (<option key={s.id} value={s.id}>{s.name_en}</option>))}
        </select>
      )}
      {form.kind === 'file' ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-2 px-4 py-6 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${dragOver ? 'border-white bg-white/5' : 'border-gray-700 hover:border-gray-500'}`}
        >
          <FaCloudUploadAlt className="text-xl text-gray-400" />
          <p className="text-sm text-gray-400 text-center">{form.file ? form.file.name : 'Drop a file here, or click to browse'}</p>
          <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => setForm((p) => ({ ...p, file: e.target.files[0] }))} />
        </div>
      ) : (
        <input
          type="url"
          required
          placeholder="https://…"
          value={form.url}
          onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
          className={inputClasses}
        />
      )}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setForm((p) => ({ ...p, kind: p.kind === 'file' ? 'link' : 'file', file: null, url: '' }))}
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          {form.kind === 'file' ? 'Add a link instead' : 'Upload a file instead'}
        </button>
        <Button type="submit" size="sm" disabled={busy}>{busy ? 'Saving…' : 'Add to course'}</Button>
      </div>
    </form>
  )
}
