import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { siteConfig } from '../../utils/constants'
import { useLanguage } from '../../context/LanguageContext'
import CurrencySelector from './CurrencySelector'
import { translations } from '../../utils/translations'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { lang, toggleLanguage } = useLanguage()
  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (link) => {
    setIsMobileMenuOpen(false)

    if (link.type === 'route') {
      navigate(link.href)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          const element = document.querySelector(link.href)
          if (element) element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        const element = document.querySelector(link.href)
        if (element) element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-black/95 backdrop-blur-sm shadow-lg shadow-black/20 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="w-full px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          {/* Logo — icon + "AiXiom Education" */}
          <Link to="/">
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="/logo.png"
                alt="AiXiom Education logo"
                className="h-9 w-9 lg:h-12 lg:w-12 object-contain"
              />
              <span className="hidden sm:inline text-lg sm:text-xl 2xl:text-2xl font-bold text-white whitespace-nowrap">
                {siteConfig.siteName}
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <nav className="flex items-center space-x-5 xl:space-x-6">
              {t.nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link)
                  }}
                  className="text-gray-300 hover:text-white transition-colors font-medium whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <Link
              to="/ai-chat"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-colors whitespace-nowrap"
            >
              AI Chat
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg border border-white/40 text-white hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              {lang === 'en' ? 'Portal' : '学习中心'}
            </Link>
            {/* Currency Selector */}
            <CurrencySelector />
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg border border-white/40 text-white hover:bg-white/10 transition-colors min-w-[56px]"
              aria-label="Toggle language"
            >
              {lang === 'en' ? '中文' : 'EN'}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-1.5">
            {/* Currency Selector Mobile */}
            <CurrencySelector compact />
            {/* Language Toggle Mobile */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center justify-center px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-white/40 text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle language"
            >
              {lang === 'en' ? '中文' : 'EN'}
            </button>
            <button
              className="text-gray-300 text-2xl p-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mt-4 pb-4 space-y-3"
          >
            <Link
              to="/ai-chat"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-white bg-white/10 border border-white/20 rounded-lg px-4 py-2 font-semibold"
            >
              AI Chat
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-white bg-white/10 border border-white/20 rounded-lg px-4 py-2 font-semibold"
            >
              {lang === 'en' ? 'Portal' : '学习中心'}
            </Link>
            {t.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link)
                }}
                className="block text-gray-300 hover:text-white transition-colors font-medium py-2"
              >
                {link.name}
              </a>
            ))}
          </motion.nav>
        )}
      </div>
    </header>
  )
}
