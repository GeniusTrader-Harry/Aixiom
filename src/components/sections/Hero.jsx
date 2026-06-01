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
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#070c18]">
      {/* Navy base + electric-blue glow (matches the new logo) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 22% 12%, rgba(56,160,255,0.30), transparent 55%),' +
            'radial-gradient(ellipse at 82% 26%, rgba(22,112,230,0.22), transparent 55%),' +
            'radial-gradient(ellipse at 60% 95%, rgba(80,180,255,0.16), transparent 60%),' +
            'linear-gradient(135deg, #070c18 0%, #0b1430 50%, #0e1d40 100%)',
        }}
      />
      {/* Subtle circuit grid (echoes the logo's nodes/lines) */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(124,195,255,0.25) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(124,195,255,0.25) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          maskImage: 'radial-gradient(ellipse at 70% 50%, black, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 70% 50%, black, transparent 75%)',
        }}
      />
      <div className="absolute inset-0 bg-[#070c18]/40" />

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

          {/* Right: AiXiom logo */}
          <div className="flex-shrink-0 w-64 h-72 md:w-80 md:h-96 lg:w-[420px] lg:h-[420px] flex items-center justify-center">
            <img
              src="/logo.png"
              alt="AiXiom Education"
              className="w-full h-full object-contain"
              style={{ filter: 'drop-shadow(0 0 40px rgba(56,160,255,0.35))' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
