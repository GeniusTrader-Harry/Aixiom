import { useState, useEffect } from 'react'
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
} from 'react-icons/fa'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import PortalLogin from '../components/portal/PortalLogin'
import PortalNotice from '../components/portal/PortalNotice'
import { useAuth } from '../context/AuthContext'
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

const TABS = {
  students: 'Students',
  materials: 'Materials',
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
  const [matForm, setMatForm] = useState({ titleEn: '', titleZh: '', kind: 'link', url: '', file: null, subjectId: '', studentId: '' })
  const [matBusy, setMatBusy] = useState(false)
  const [fbForm, setFbForm] = useState({ studentId: '', subjectId: '', submissionId: '', body: '', grade: '' })
  const [fbBusy, setFbBusy] = useState(false)

  const isTeacher = role === 'teacher'

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

  const submitMaterial = async (e) => {
    e.preventDefault()
    if (!matForm.titleEn || (!matForm.subjectId && !matForm.studentId)) return
    setMatBusy(true)
    try {
      let storagePath = null
      let url = null
      if (matForm.kind === 'file') {
        if (!matForm.file) { setMatBusy(false); return }
        storagePath = await uploadMaterialFile(matForm.file)
      } else {
        url = matForm.url
      }
      await createMaterial({
        titleEn: matForm.titleEn,
        titleZh: matForm.titleZh,
        kind: matForm.kind,
        url,
        storagePath,
        subjectId: matForm.subjectId,
        studentId: matForm.studentId,
        createdBy: user.id,
      })
      setMatForm({ titleEn: '', titleZh: '', kind: 'link', url: '', file: null, subjectId: '', studentId: '' })
      refresh()
    } catch {
      /* ignore */
    }
    setMatBusy(false)
  }

  const removeMaterial = async (id) => {
    try {
      await deleteMaterial(id)
      setMaterials((prev) => prev.filter((m) => m.id !== id))
    } catch {
      /* ignore */
    }
  }

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

          {/* ---- Materials ---- */}
          {tab === 'materials' && (
            <motion.div key="materials" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <form onSubmit={submitMaterial} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-4 self-start">
                <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><FaFolderOpen /> Add material</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title (EN)</label>
                  <input type="text" required value={matForm.titleEn} onChange={(e) => setMatForm((p) => ({ ...p, titleEn: e.target.value }))} className={inputClasses} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title (中文, optional)</label>
                  <input type="text" value={matForm.titleZh} onChange={(e) => setMatForm((p) => ({ ...p, titleZh: e.target.value }))} className={inputClasses} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <select value={matForm.kind} onChange={(e) => setMatForm((p) => ({ ...p, kind: e.target.value }))} className={inputClasses}>
                    <option value="link">Link</option>
                    <option value="file">File upload</option>
                  </select>
                </div>
                {matForm.kind === 'link' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">URL</label>
                    <input type="url" required value={matForm.url} onChange={(e) => setMatForm((p) => ({ ...p, url: e.target.value }))} className={inputClasses} />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">File</label>
                    <input type="file" required onChange={(e) => setMatForm((p) => ({ ...p, file: e.target.files[0] }))} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white file:text-black file:font-semibold hover:file:bg-gray-200" />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <select value={matForm.subjectId} onChange={(e) => setMatForm((p) => ({ ...p, subjectId: e.target.value }))} className={inputClasses}>
                      <option value="">— Any —</option>
                      {subjects.map((s) => (<option key={s.id} value={s.id}>{s.name_en}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Student</label>
                    <select value={matForm.studentId} onChange={(e) => setMatForm((p) => ({ ...p, studentId: e.target.value }))} className={inputClasses}>
                      <option value="">— All in subject —</option>
                      {students.map((s) => (<option key={s.id} value={s.id}>{s.full_name || s.id}</option>))}
                    </select>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Assign to a subject (all enrolled students see it) and/or a specific student.</p>
                <Button type="submit" className="w-full" disabled={matBusy}><FaCloudUploadAlt className="mr-2" /> {matBusy ? 'Saving…' : 'Add material'}</Button>
              </form>

              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-6">All materials</h2>
                {materials.length === 0 ? (
                  <p className="text-gray-500">No materials yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {materials.map((m) => (
                      <li key={m.id} className="flex items-start gap-3 px-4 py-3 rounded-lg bg-gray-950 border border-gray-800">
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
