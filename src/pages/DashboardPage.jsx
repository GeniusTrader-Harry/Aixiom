import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaExternalLinkAlt,
  FaGoogleDrive,
  FaFileAlt,
  FaCalendarAlt,
  FaSignOutAlt,
  FaUserGraduate,
  FaTrashAlt,
  FaEnvelope,
  FaCommentDots,
  FaCloudUploadAlt,
  FaChalkboardTeacher,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import PortalLogin from '../components/portal/PortalLogin'
import PortalNotice from '../components/portal/PortalNotice'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { mentors, sessionTypes } from '../utils/dashboardData'
import {
  listMyMaterials,
  listMyFeedback,
  listMySubmissions,
  listSubjects,
  submitWork,
  getSignedUrl,
} from '../utils/portalApi'
import { siteConfig } from '../utils/constants'

const SESSIONS_KEY = 'aixiom_sessions'

const materialTypeIcons = { link: FaExternalLinkAlt, drive: FaGoogleDrive, file: FaFileAlt }

const strings = {
  en: {
    gateTitle: 'Student Portal',
    gateSubtitle: 'Sign in with the email your tutor set up for you.',
    notConfigured: 'The portal isn\'t connected yet. Please check back soon.',
    loading: 'Loading…',
    welcome: 'Welcome back',
    signOut: 'Sign out',
    teacherLink: 'Open Teacher Portal',
    tabs: { materials: 'Materials', feedback: 'My Feedback', submit: 'Submit Work', booking: 'Book a Session' },
    materialsHeading: 'Your Course Materials',
    materialsSub: 'Everything your tutors have shared with you.',
    noMaterials: 'No materials yet — your tutor will share them here.',
    feedbackHeading: 'Feedback & Grades',
    feedbackSub: 'Comments and grades from your tutors.',
    noFeedback: 'No feedback yet.',
    grade: 'Grade',
    submitHeading: 'Submit Your Work',
    submitSub: 'Upload your work for your tutor to review.',
    titleLabel: 'Title',
    subjectLabel: 'Subject',
    fileLabel: 'File',
    noteLabel: 'Note (optional)',
    upload: 'Upload',
    uploading: 'Uploading…',
    uploaded: 'Uploaded! Your tutor will review it.',
    mySubmissions: 'My Submissions',
    noSubmissions: 'Nothing submitted yet.',
    statusSubmitted: 'Submitted',
    statusReviewed: 'Reviewed',
    bookingHeading: 'Book a Session with a Mentor',
    bookingSub: 'Pick a mentor and book directly, or send us a session request.',
    bookCalendly: 'Book via Calendly',
    requestByEmail: 'Request by Email',
    requestHeading: 'Request a Session',
    requestSub: 'Tell us when you\'d like to meet — we\'ll confirm by email.',
    mentorLabel: 'Mentor',
    sessionTypeLabel: 'Session type',
    dateLabel: 'Date',
    timeLabel: 'Time',
    topicLabel: 'What would you like to cover?',
    topicPlaceholder: 'e.g. Paper 3 essay technique, personal statement draft…',
    sendRequest: 'Send Request',
    upcomingHeading: 'My Upcoming Sessions',
    noSessions: 'No sessions yet — book one above to get started.',
    requested: 'Requested',
    cancel: 'Remove',
    chooseSubject: '— Select —',
  },
  zh: {
    gateTitle: '学生中心',
    gateSubtitle: '使用导师为您创建的邮箱登录。',
    notConfigured: '学生中心尚未连接，请稍后再来查看。',
    loading: '加载中……',
    welcome: '欢迎回来',
    signOut: '退出',
    teacherLink: '进入教师中心',
    tabs: { materials: '课程资料', feedback: '我的反馈', submit: '提交作业', booking: '预约课程' },
    materialsHeading: '您的课程资料',
    materialsSub: '导师与您分享的全部资料。',
    noMaterials: '暂无资料——导师会在此处分享。',
    feedbackHeading: '反馈与成绩',
    feedbackSub: '导师给您的评语与成绩。',
    noFeedback: '暂无反馈。',
    grade: '成绩',
    submitHeading: '提交您的作业',
    submitSub: '上传作业供导师批阅。',
    titleLabel: '标题',
    subjectLabel: '科目',
    fileLabel: '文件',
    noteLabel: '备注（选填）',
    upload: '上传',
    uploading: '上传中……',
    uploaded: '已上传！导师会进行批阅。',
    mySubmissions: '我的提交',
    noSubmissions: '暂无提交。',
    statusSubmitted: '已提交',
    statusReviewed: '已批阅',
    bookingHeading: '预约导师课程',
    bookingSub: '选择导师直接预约，或向我们发送预约申请。',
    bookCalendly: '通过 Calendly 预约',
    requestByEmail: '邮件预约',
    requestHeading: '发送预约申请',
    requestSub: '告诉我们您方便的时间——我们会通过邮件确认。',
    mentorLabel: '导师',
    sessionTypeLabel: '课程类型',
    dateLabel: '日期',
    timeLabel: '时间',
    topicLabel: '您想学习什么内容？',
    topicPlaceholder: '例如：Paper 3 论述题技巧、个人陈述初稿……',
    sendRequest: '发送申请',
    upcomingHeading: '我的课程安排',
    noSessions: '暂无课程安排——在上方预约即可开始。',
    requested: '已申请',
    cancel: '移除',
    chooseSubject: '— 请选择 —',
  },
}

function pick(value, lang) {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[lang] ?? value.en
}

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const inputClasses =
  'w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/60 transition-colors'

export default function DashboardPage() {
  const { lang } = useLanguage()
  const t = strings[lang] ?? strings.en
  const { user, profile, role, loading, isSupabaseConfigured, signOut } = useAuth()

  const [activeTab, setActiveTab] = useState('materials')
  const [materials, setMaterials] = useState([])
  const [feedback, setFeedback] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [subjects, setSubjects] = useState([])

  const [sessions, setSessions] = useState(() => loadJSON(SESSIONS_KEY, []))
  const [form, setForm] = useState({
    mentorId: mentors[0].id,
    sessionType: sessionTypes[0].en,
    date: '',
    time: '',
    topic: '',
  })
  const [upload, setUpload] = useState({ title: '', subjectId: '', note: '', file: null })
  const [uploadState, setUploadState] = useState('idle') // idle | busy | done

  // Load the student's data once signed in.
  useEffect(() => {
    if (!user) return
    let active = true
    Promise.all([listMyMaterials(), listMyFeedback(), listMySubmissions(), listSubjects()])
      .then(([m, f, s, subj]) => {
        if (!active) return
        setMaterials(m)
        setFeedback(f)
        setSubmissions(s)
        setSubjects(subj)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
  }, [sessions])

  const studentName = profile?.full_name || user?.email || 'Student'

  const openMaterial = async (m) => {
    if (m.kind === 'link' && m.url) {
      window.open(m.url, '_blank', 'noopener')
    } else if (m.kind === 'file' && m.storage_path) {
      try {
        const url = await getSignedUrl('materials', m.storage_path)
        window.open(url, '_blank', 'noopener')
      } catch {
        /* ignore */
      }
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!upload.file || !upload.title) return
    setUploadState('busy')
    try {
      await submitWork({
        userId: user.id,
        title: upload.title,
        subjectId: upload.subjectId,
        note: upload.note,
        file: upload.file,
      })
      const fresh = await listMySubmissions()
      setSubmissions(fresh)
      setUpload({ title: '', subjectId: '', note: '', file: null })
      setUploadState('done')
    } catch {
      setUploadState('idle')
    }
  }

  const handleRequest = (e) => {
    e.preventDefault()
    if (!form.date || !form.time) return
    const mentor = mentors.find((m) => m.id === form.mentorId)
    const mentorName = pick(mentor.name, lang)
    const session = {
      id: Date.now(),
      mentorName,
      sessionType: form.sessionType,
      date: form.date,
      time: form.time,
      topic: form.topic,
    }
    setSessions((prev) =>
      [...prev, session].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    )
    const subject = encodeURIComponent(
      `${form.sessionType} session request — ${studentName} with ${mentorName}`
    )
    const body = encodeURIComponent(
      `Hi AiXiom team,\n\nI'd like to book a session.\n\nStudent: ${studentName}\nMentor: ${mentorName}\nSession type: ${form.sessionType}\nDate: ${form.date}\nTime: ${form.time}\nTopic: ${form.topic || '—'}\n\nThanks!`
    )
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`
    setForm((prev) => ({ ...prev, date: '', time: '', topic: '' }))
  }

  const removeSession = (id) => setSessions((prev) => prev.filter((s) => s.id !== id))

  // ---------- Gate states ----------
  if (!isSupabaseConfigured) {
    return <PortalNotice title={t.gateTitle} message={t.notConfigured} />
  }
  if (loading) {
    return <PortalNotice title={t.gateTitle} message={t.loading} />
  }
  if (!user) {
    return <PortalLogin title={t.gateTitle} subtitle={t.gateSubtitle} crossTo="teacher" />
  }

  return (
    <div className="pt-24">
      <Section background="gray">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {t.welcome}, {studentName} 👋
          </h1>
          <div className="flex items-center gap-3">
            {role === 'teacher' && (
              <Link
                to="/teacher"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border border-white/40 text-white hover:bg-white/10 transition-colors"
              >
                <FaChalkboardTeacher /> {t.teacherLink}
              </Link>
            )}
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border border-white/40 text-white hover:bg-white/10 transition-colors"
            >
              <FaSignOutAlt /> {t.signOut}
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex mb-12 overflow-x-auto">
          <div className="inline-flex rounded-xl border border-gray-700 p-1 bg-gray-900/60">
            {Object.entries(t.tabs).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`px-5 sm:px-6 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === key ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* ---- Materials ---- */}
          {activeTab === 'materials' && (
            <motion.div key={'materials-' + lang} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">{t.materialsHeading}</h2>
                <p className="text-gray-400">{t.materialsSub}</p>
              </div>
              {materials.length === 0 ? (
                <p className="text-gray-500">{t.noMaterials}</p>
              ) : (
                <ul className="space-y-3 max-w-3xl">
                  {materials.map((m) => {
                    const TypeIcon = materialTypeIcons[m.kind] ?? FaFileAlt
                    return (
                      <li key={m.id}>
                        <button
                          onClick={() => openMaterial(m)}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-950 border border-gray-800 text-gray-200 hover:border-gray-500 hover:text-white transition-colors group text-left"
                        >
                          <TypeIcon className="text-gray-500 group-hover:text-white transition-colors flex-shrink-0" />
                          <span className="flex-1">
                            {lang === 'zh' ? m.title_zh || m.title_en : m.title_en}
                            {m.subjects && (
                              <span className="text-gray-500 text-sm ml-2">· {pick({ en: m.subjects.name_en, zh: m.subjects.name_zh }, lang)}</span>
                            )}
                          </span>
                          <FaExternalLinkAlt className="text-xs text-gray-600 group-hover:text-white transition-colors" />
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </motion.div>
          )}

          {/* ---- Feedback ---- */}
          {activeTab === 'feedback' && (
            <motion.div key={'feedback-' + lang} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">{t.feedbackHeading}</h2>
                <p className="text-gray-400">{t.feedbackSub}</p>
              </div>
              {feedback.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-12 text-gray-500">
                  <FaCommentDots className="text-3xl mb-4" />
                  <p>{t.noFeedback}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {feedback.map((f, i) => (
                    <Card key={f.id} delay={i * 0.06} className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-400">
                          {f.subjects ? pick({ en: f.subjects.name_en, zh: f.subjects.name_zh }, lang) : ''}
                        </span>
                        {f.grade && (
                          <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-white text-black">
                            {t.grade}: {f.grade}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-200 whitespace-pre-wrap">{f.body}</p>
                      <p className="text-xs text-gray-600 mt-3">{(f.created_at || '').slice(0, 10)}</p>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ---- Submit Work ---- */}
          {activeTab === 'submit' && (
            <motion.div key={'submit-' + lang} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">{t.submitHeading}</h2>
                <p className="text-gray-400">{t.submitSub}</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <form onSubmit={handleUpload} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{t.titleLabel}</label>
                    <input type="text" required value={upload.title} onChange={(e) => setUpload((p) => ({ ...p, title: e.target.value }))} className={inputClasses} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{t.subjectLabel}</label>
                    <select value={upload.subjectId} onChange={(e) => setUpload((p) => ({ ...p, subjectId: e.target.value }))} className={inputClasses}>
                      <option value="">{t.chooseSubject}</option>
                      {subjects.map((s) => (
                        <option key={s.id} value={s.id}>{pick({ en: s.name_en, zh: s.name_zh }, lang)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{t.fileLabel}</label>
                    <input type="file" required onChange={(e) => setUpload((p) => ({ ...p, file: e.target.files[0] }))} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white file:text-black file:font-semibold hover:file:bg-gray-200" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{t.noteLabel}</label>
                    <textarea rows={3} value={upload.note} onChange={(e) => setUpload((p) => ({ ...p, note: e.target.value }))} className={inputClasses} />
                  </div>
                  <Button type="submit" className="w-full" disabled={uploadState === 'busy'}>
                    <FaCloudUploadAlt className="mr-2" /> {uploadState === 'busy' ? t.uploading : t.upload}
                  </Button>
                  {uploadState === 'done' && <p className="text-green-400 text-sm">{t.uploaded}</p>}
                </form>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white mb-6">{t.mySubmissions}</h3>
                  {submissions.length === 0 ? (
                    <p className="text-gray-500">{t.noSubmissions}</p>
                  ) : (
                    <ul className="space-y-3">
                      {submissions.map((s) => (
                        <li key={s.id} className="flex items-start gap-3 px-4 py-3 rounded-lg bg-gray-950 border border-gray-800">
                          <FaFileAlt className="text-gray-500 mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold">{s.title}</p>
                            <p className="text-xs text-gray-500">{(s.created_at || '').slice(0, 10)}</p>
                          </div>
                          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${s.status === 'reviewed' ? 'bg-white text-black border-white' : 'bg-white/10 text-gray-300 border-white/20'}`}>
                            {s.status === 'reviewed' ? t.statusReviewed : t.statusSubmitted}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ---- Booking ---- */}
          {activeTab === 'booking' && (
            <motion.div key={'booking-' + lang} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">{t.bookingHeading}</h2>
                <p className="text-gray-400">{t.bookingSub}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14 max-w-3xl mx-auto">
                {mentors.map((mentor, i) => (
                  <Card key={mentor.id} delay={i * 0.08} className="p-6 flex flex-col text-center">
                    <div className="text-4xl mb-4">{mentor.emoji}</div>
                    <h3 className="text-lg font-bold text-white mb-1">{pick(mentor.name, lang)}</h3>
                    <p className="text-sm font-medium text-gray-400 mb-3">{pick(mentor.role, lang)}</p>
                    <p className="text-gray-400 text-sm mb-6 flex-1">{pick(mentor.bio, lang)}</p>
                    {mentor.calendly ? (
                      <Button href={mentor.calendly} target="_blank" size="sm" className="w-full">
                        <FaCalendarAlt className="mr-2" /> {t.bookCalendly}
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full" onClick={() => { setForm((prev) => ({ ...prev, mentorId: mentor.id })); document.getElementById('session-request')?.scrollIntoView({ behavior: 'smooth' }) }}>
                        <FaEnvelope className="mr-2" /> {t.requestByEmail}
                      </Button>
                    )}
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div id="session-request" className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white mb-2">{t.requestHeading}</h3>
                  <p className="text-gray-400 text-sm mb-6">{t.requestSub}</p>
                  <form onSubmit={handleRequest} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">{t.mentorLabel}</label>
                      <select value={form.mentorId} onChange={(e) => setForm((prev) => ({ ...prev, mentorId: e.target.value }))} className={inputClasses}>
                        {mentors.map((m) => (<option key={m.id} value={m.id}>{pick(m.name, lang)}</option>))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">{t.sessionTypeLabel}</label>
                      <select value={form.sessionType} onChange={(e) => setForm((prev) => ({ ...prev, sessionType: e.target.value }))} className={inputClasses}>
                        {sessionTypes.map((type) => (<option key={type.en} value={type.en}>{pick(type, lang)}</option>))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">{t.dateLabel}</label>
                        <input type="date" required value={form.date} min={new Date().toISOString().split('T')[0]} onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))} className={inputClasses} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">{t.timeLabel}</label>
                        <input type="time" required value={form.time} onChange={(e) => setForm((prev) => ({ ...prev, time: e.target.value }))} className={inputClasses} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">{t.topicLabel}</label>
                      <textarea rows={3} value={form.topic} onChange={(e) => setForm((prev) => ({ ...prev, topic: e.target.value }))} placeholder={t.topicPlaceholder} className={inputClasses} />
                    </div>
                    <Button type="submit" className="w-full"><FaEnvelope className="mr-2" /> {t.sendRequest}</Button>
                  </form>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white mb-6">{t.upcomingHeading}</h3>
                  {sessions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-12 text-gray-500">
                      <FaUserGraduate className="text-3xl mb-4" />
                      <p>{t.noSessions}</p>
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {sessions.map((s) => (
                        <li key={s.id} className="flex items-start gap-4 px-4 py-3 rounded-lg bg-gray-950 border border-gray-800">
                          <div className="p-2.5 rounded-lg bg-white/10 text-white flex-shrink-0"><FaCalendarAlt /></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold">{s.mentorName}</p>
                            <p className="text-sm text-gray-400">{s.date} · {s.time}{s.sessionType ? ` · ${s.sessionType}` : ''}{s.topic ? ` — ${s.topic}` : ''}</p>
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-white/10 text-gray-300 border border-white/20">{t.requested}</span>
                          </div>
                          <button onClick={() => removeSession(s.id)} className="text-gray-600 hover:text-red-400 transition-colors p-1" aria-label={t.cancel} title={t.cancel}><FaTrashAlt /></button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </div>
  )
}
