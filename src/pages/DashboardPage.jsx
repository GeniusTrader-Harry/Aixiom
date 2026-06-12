import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaChartLine,
  FaGlobe,
  FaLanguage,
  FaComments,
  FaLightbulb,
  FaBookOpen,
  FaExternalLinkAlt,
  FaGoogleDrive,
  FaFileAlt,
  FaCalendarAlt,
  FaLock,
  FaSignOutAlt,
  FaUserGraduate,
  FaTrashAlt,
  FaEnvelope,
} from 'react-icons/fa'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useLanguage } from '../context/LanguageContext'
import { ACCESS_CODES, courseMaterials, mentors, sessionTypes } from '../utils/dashboardData'
import { siteConfig } from '../utils/constants'

const STUDENT_KEY = 'aixiom_student'
const SESSIONS_KEY = 'aixiom_sessions'

const subjectIcons = {
  FaChartLine,
  FaGlobe,
  FaLanguage,
  FaComments,
  FaLightbulb,
}

const materialTypeIcons = {
  link: FaExternalLinkAlt,
  drive: FaGoogleDrive,
  file: FaFileAlt,
}

const strings = {
  en: {
    gateTitle: 'Student Portal',
    gateSubtitle: 'Enter your name and the access code from your tutor to open the dashboard.',
    nameLabel: 'Your name',
    namePlaceholder: 'e.g. Alex Chen',
    codeLabel: 'Access code',
    codePlaceholder: 'Provided by your tutor',
    enter: 'Enter Dashboard',
    wrongCode: 'That access code isn\'t valid. Please check with your tutor.',
    needCode: 'Don\'t have a code yet?',
    contactUs: 'Contact us',
    welcome: 'Welcome back',
    signOut: 'Sign out',
    tabs: { materials: 'Course Materials', booking: 'Book a Session' },
    materialsHeading: 'Your Course Materials',
    materialsSub: 'Everything your tutors have shared, organised by subject.',
    comingSoon: 'Materials coming soon — check back after your next session.',
    bookingHeading: 'Book a Session with a Mentor',
    bookingSub: 'Pick a mentor and book directly, or send us a session request.',
    bookCalendly: 'Book via Calendly',
    requestByEmail: 'Request by Email',
    requestHeading: 'Request a Session',
    requestSub: 'Tell us when you\'d like to meet — we\'ll confirm by email and it\'ll appear in your upcoming sessions below.',
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
    note: 'Session requests open your email app with the details pre-filled — your booking is confirmed once we reply.',
  },
  zh: {
    gateTitle: '学生中心',
    gateSubtitle: '输入您的姓名和导师提供的访问码即可进入学习面板。',
    nameLabel: '您的姓名',
    namePlaceholder: '例如：陈同学',
    codeLabel: '访问码',
    codePlaceholder: '由您的导师提供',
    enter: '进入学生中心',
    wrongCode: '访问码无效，请与您的导师确认。',
    needCode: '还没有访问码？',
    contactUs: '联系我们',
    welcome: '欢迎回来',
    signOut: '退出',
    tabs: { materials: '课程资料', booking: '预约课程' },
    materialsHeading: '您的课程资料',
    materialsSub: '导师分享的全部资料，按学科分类整理。',
    comingSoon: '资料即将上线——请在下次课后再来查看。',
    bookingHeading: '预约导师课程',
    bookingSub: '选择导师直接预约，或向我们发送预约申请。',
    bookCalendly: '通过 Calendly 预约',
    requestByEmail: '邮件预约',
    requestHeading: '发送预约申请',
    requestSub: '告诉我们您方便的时间——我们会通过邮件确认，申请会显示在下方的课程列表中。',
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
    note: '发送预约申请会打开您的邮件应用并自动填写详情——我们回复后即确认预约。',
  },
}

function pick(value, lang) {
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

export default function DashboardPage() {
  const { lang } = useLanguage()
  const t = strings[lang] ?? strings.en

  const [student, setStudent] = useState(() => loadJSON(STUDENT_KEY, null))
  const [sessions, setSessions] = useState(() => loadJSON(SESSIONS_KEY, []))
  const [activeTab, setActiveTab] = useState('materials')

  // Gate form state
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [gateError, setGateError] = useState(false)

  // Booking form state
  const [form, setForm] = useState({
    mentorId: mentors[0].id,
    sessionType: sessionTypes[0].en,
    date: '',
    time: '',
    topic: '',
  })

  useEffect(() => {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
  }, [sessions])

  const handleEnter = (e) => {
    e.preventDefault()
    if (!ACCESS_CODES.includes(code.trim().toUpperCase())) {
      setGateError(true)
      return
    }
    const s = { name: name.trim() || 'Student' }
    localStorage.setItem(STUDENT_KEY, JSON.stringify(s))
    setStudent(s)
    setGateError(false)
  }

  const handleSignOut = () => {
    localStorage.removeItem(STUDENT_KEY)
    setStudent(null)
    setName('')
    setCode('')
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
    setSessions((prev) => [...prev, session].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)))

    const subject = encodeURIComponent(
      `${form.sessionType} session request — ${student.name} with ${mentorName}`
    )
    const body = encodeURIComponent(
      `Hi AiXiom team,\n\nI'd like to book a session.\n\nStudent: ${student.name}\nMentor: ${mentorName}\nSession type: ${form.sessionType}\nDate: ${form.date}\nTime: ${form.time}\nTopic: ${form.topic || '—'}\n\nThanks!`
    )
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`
    setForm((prev) => ({ ...prev, date: '', time: '', topic: '' }))
  }

  const removeSession = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id))
  }

  const inputClasses =
    'w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/60 transition-colors'

  // ---------- Access gate ----------
  if (!student) {
    return (
      <div className="pt-24">
        <Section background="gray" className="min-h-[70vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-10">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 border border-white/20 text-white rounded-full mb-6">
                <FaLock className="text-xl" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">{t.gateTitle}</h1>
              <p className="text-gray-400 mb-8">{t.gateSubtitle}</p>

              <form onSubmit={handleEnter} className="space-y-5">
                <div>
                  <label htmlFor="student-name" className="block text-sm font-medium text-gray-300 mb-2">
                    {t.nameLabel}
                  </label>
                  <input
                    id="student-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="access-code" className="block text-sm font-medium text-gray-300 mb-2">
                    {t.codeLabel}
                  </label>
                  <input
                    id="access-code"
                    type="password"
                    required
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value)
                      setGateError(false)
                    }}
                    placeholder={t.codePlaceholder}
                    className={inputClasses}
                  />
                  {gateError && (
                    <p className="text-red-400 text-sm mt-2" role="alert">
                      {t.wrongCode}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  {t.enter}
                </Button>
              </form>

              <p className="text-sm text-gray-500 mt-6">
                {t.needCode}{' '}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-white underline hover:text-gray-300">
                  {t.contactUs}
                </a>
              </p>
            </div>
          </motion.div>
        </Section>
      </div>
    )
  }

  // ---------- Dashboard ----------
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
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {t.welcome}, {student.name} 👋
            </h1>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 text-sm font-semibold rounded-lg border border-white/40 text-white hover:bg-white/10 transition-colors"
          >
            <FaSignOutAlt /> {t.signOut}
          </button>
        </motion.div>

        {/* Tabs */}
        <div className="flex mb-12">
          <div className="inline-flex rounded-xl border border-gray-700 p-1 bg-gray-900/60">
            {Object.entries(t.tabs).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`px-6 sm:px-8 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === key ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'materials' ? (
            <motion.div
              key={'materials-' + lang}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">{t.materialsHeading}</h2>
                <p className="text-gray-400">{t.materialsSub}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courseMaterials.map((course, i) => {
                  const Icon = subjectIcons[course.icon] ?? FaBookOpen
                  return (
                    <Card key={course.id} delay={i * 0.08} className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-white">
                          <Icon className="text-xl" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{pick(course.subject, lang)}</h3>
                          <p className="text-gray-400 text-sm mt-1">{pick(course.description, lang)}</p>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {course.materials.map((m) => {
                          const TypeIcon = materialTypeIcons[m.type] ?? FaFileAlt
                          const ready = m.url && m.url !== '#'
                          return (
                            <li key={pick(m.title, 'en')}>
                              {ready ? (
                                <a
                                  href={m.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-950 border border-gray-800 text-gray-200 hover:border-gray-500 hover:text-white transition-colors group"
                                >
                                  <TypeIcon className="text-gray-500 group-hover:text-white transition-colors flex-shrink-0" />
                                  <span className="flex-1">{pick(m.title, lang)}</span>
                                  <FaExternalLinkAlt className="text-xs text-gray-600 group-hover:text-white transition-colors" />
                                </a>
                              ) : (
                                <div
                                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-950/50 border border-gray-800/60 text-gray-500 cursor-not-allowed"
                                  title={t.comingSoon}
                                >
                                  <TypeIcon className="flex-shrink-0" />
                                  <span className="flex-1">{pick(m.title, lang)}</span>
                                  <span className="text-xs uppercase tracking-wide">{lang === 'zh' ? '即将上线' : 'Soon'}</span>
                                </div>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </Card>
                  )
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={'booking-' + lang}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">{t.bookingHeading}</h2>
                <p className="text-gray-400">{t.bookingSub}</p>
              </div>

              {/* Mentor cards */}
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          setForm((prev) => ({ ...prev, mentorId: mentor.id }))
                          document.getElementById('session-request')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                      >
                        <FaEnvelope className="mr-2" /> {t.requestByEmail}
                      </Button>
                    )}
                  </Card>
                ))}
              </div>

              {/* Request form + upcoming sessions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div id="session-request" className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white mb-2">{t.requestHeading}</h3>
                  <p className="text-gray-400 text-sm mb-6">{t.requestSub}</p>
                  <form onSubmit={handleRequest} className="space-y-4">
                    <div>
                      <label htmlFor="req-mentor" className="block text-sm font-medium text-gray-300 mb-2">
                        {t.mentorLabel}
                      </label>
                      <select
                        id="req-mentor"
                        value={form.mentorId}
                        onChange={(e) => setForm((prev) => ({ ...prev, mentorId: e.target.value }))}
                        className={inputClasses}
                      >
                        {mentors.map((m) => (
                          <option key={m.id} value={m.id}>
                            {pick(m.name, lang)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="req-type" className="block text-sm font-medium text-gray-300 mb-2">
                        {t.sessionTypeLabel}
                      </label>
                      <select
                        id="req-type"
                        value={form.sessionType}
                        onChange={(e) => setForm((prev) => ({ ...prev, sessionType: e.target.value }))}
                        className={inputClasses}
                      >
                        {sessionTypes.map((type) => (
                          <option key={type.en} value={type.en}>
                            {pick(type, lang)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="req-date" className="block text-sm font-medium text-gray-300 mb-2">
                          {t.dateLabel}
                        </label>
                        <input
                          id="req-date"
                          type="date"
                          required
                          value={form.date}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label htmlFor="req-time" className="block text-sm font-medium text-gray-300 mb-2">
                          {t.timeLabel}
                        </label>
                        <input
                          id="req-time"
                          type="time"
                          required
                          value={form.time}
                          onChange={(e) => setForm((prev) => ({ ...prev, time: e.target.value }))}
                          className={inputClasses}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="req-topic" className="block text-sm font-medium text-gray-300 mb-2">
                        {t.topicLabel}
                      </label>
                      <textarea
                        id="req-topic"
                        rows={3}
                        value={form.topic}
                        onChange={(e) => setForm((prev) => ({ ...prev, topic: e.target.value }))}
                        placeholder={t.topicPlaceholder}
                        className={inputClasses}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <FaEnvelope className="mr-2" /> {t.sendRequest}
                    </Button>
                    <p className="text-xs text-gray-500">{t.note}</p>
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
                        <li
                          key={s.id}
                          className="flex items-start gap-4 px-4 py-3 rounded-lg bg-gray-950 border border-gray-800"
                        >
                          <div className="p-2.5 rounded-lg bg-white/10 text-white flex-shrink-0">
                            <FaCalendarAlt />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold">{s.mentorName}</p>
                            <p className="text-sm text-gray-400">
                              {s.date} · {s.time}
                              {s.sessionType ? ` · ${s.sessionType}` : ''}
                              {s.topic ? ` — ${s.topic}` : ''}
                            </p>
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-white/10 text-gray-300 border border-white/20">
                              {t.requested}
                            </span>
                          </div>
                          <button
                            onClick={() => removeSession(s.id)}
                            className="text-gray-600 hover:text-red-400 transition-colors p-1"
                            aria-label={t.cancel}
                            title={t.cancel}
                          >
                            <FaTrashAlt />
                          </button>
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
