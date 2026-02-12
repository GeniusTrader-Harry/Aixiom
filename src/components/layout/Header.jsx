import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { siteConfig } from '../../utils/constants'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

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
      // Scroll links — if we're not on the homepage, navigate there first
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
        isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg shadow-black/20 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <motion.span
              className="text-2xl font-bold text-white cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              {siteConfig.siteName}
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {siteConfig.nav.links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link)
                }}
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 space-y-3"
          >
            {siteConfig.nav.links.map((link) => (
              <a
                key={link.name}
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
