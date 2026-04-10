import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../utils/translations'

export default function Hero() {
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const t = translations[lang].hero

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-blue-950">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero-bird.jpg)' }}
      />
      {/* Deep blue overlay */}
      <div className="absolute inset-0 bg-blue-950/65" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left: text content */}
          <div className="flex-1 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight tracking-tight">
                {t.title}
              </h1>
              {t.subtitle2 && (
                <p className="text-2xl font-semibold text-white mb-10 leading-relaxed">
                  {t.subtitle2}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate('/courses')}
                  size="lg"
                  className="bg-white text-black hover:bg-gray-200 border-0"
                >
                  {t.ctaPrimary}
                </Button>
                <Button
                  href="#about"
                  variant="secondary"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  {t.ctaSecondary}
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right: Main avatar */}
          <div className="flex-shrink-0 w-64 h-80 md:w-80 md:h-[400px] lg:w-96 lg:h-[480px]">
            <img
              src="/avatar-main.jpg"
              alt="AiXiom Education"
              className="w-full h-full object-cover rounded-2xl drop-shadow-2xl mix-blend-multiply"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
