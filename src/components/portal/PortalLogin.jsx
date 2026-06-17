import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaLock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Section from '../ui/Section'
import Button from '../ui/Button'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'

const strings = {
  en: {
    signIn: 'Sign in', signUp: 'Create account', name: 'Your name', email: 'Email',
    password: 'Password', haveNoAccount: 'New here? Create an account',
    haveAccount: 'Already have an account? Sign in',
    confirm: 'Account created — check your email to confirm, then sign in.',
    working: 'Please wait…',
    toTeacher: 'Are you a tutor? Teacher sign-in →',
    toStudent: '← Student? Go to the Student Portal',
  },
  zh: {
    signIn: '登录', signUp: '注册账户', name: '您的姓名', email: '邮箱',
    password: '密码', haveNoAccount: '还没有账户？立即注册',
    haveAccount: '已有账户？立即登录',
    confirm: '账户已创建——请查收邮件完成验证后再登录。',
    working: '请稍候……',
    toTeacher: '您是导师？前往教师登录 →',
    toStudent: '← 学生？前往学生登录',
  },
}

const inputClasses =
  'w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/60 transition-colors'

export default function PortalLogin({ title, subtitle, crossTo }) {
  const { signIn, signUp } = useAuth()
  const { lang } = useLanguage()
  const t = strings[lang] ?? strings.en

  const [mode, setMode] = useState('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setInfo('')
    setBusy(true)
    const { error: err } =
      mode === 'signin' ? await signIn(email, password) : await signUp(email, password, name)
    setBusy(false)
    if (err) {
      setError(err.message)
      return
    }
    if (mode === 'signup') setInfo(t.confirm)
  }

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
            <h1 className="text-3xl font-bold text-white mb-3">{title}</h1>
            {subtitle && <p className="text-gray-400 mb-8">{subtitle}</p>}

            <form onSubmit={submit} className="space-y-5">
              {mode === 'signup' && (
                <div>
                  <label htmlFor="pl-name" className="block text-sm font-medium text-gray-300 mb-2">
                    {t.name}
                  </label>
                  <input
                    id="pl-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClasses}
                  />
                </div>
              )}
              <div>
                <label htmlFor="pl-email" className="block text-sm font-medium text-gray-300 mb-2">
                  {t.email}
                </label>
                <input
                  id="pl-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="pl-password" className="block text-sm font-medium text-gray-300 mb-2">
                  {t.password}
                </label>
                <input
                  id="pl-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClasses}
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm" role="alert">
                  {error}
                </p>
              )}
              {info && <p className="text-green-400 text-sm">{info}</p>}
              <Button type="submit" className="w-full" disabled={busy}>
                {busy ? t.working : mode === 'signin' ? t.signIn : t.signUp}
              </Button>
            </form>

            <button
              type="button"
              onClick={() => {
                setMode((m) => (m === 'signin' ? 'signup' : 'signin'))
                setError('')
                setInfo('')
              }}
              className="text-sm text-white underline hover:text-gray-300 mt-6"
            >
              {mode === 'signin' ? t.haveNoAccount : t.haveAccount}
            </button>

            {crossTo === 'teacher' && (
              <div className="mt-8 pt-6 border-t border-gray-800">
                <Link
                  to="/teacher"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold rounded-lg border border-white/40 text-white hover:bg-white/10 transition-colors"
                >
                  {t.toTeacher}
                </Link>
              </div>
            )}
            {crossTo === 'student' && (
              <div className="mt-8 pt-6 border-t border-gray-800">
                <Link
                  to="/dashboard"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold rounded-lg border border-white/40 text-white hover:bg-white/10 transition-colors"
                >
                  {t.toStudent}
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </Section>
    </div>
  )
}
