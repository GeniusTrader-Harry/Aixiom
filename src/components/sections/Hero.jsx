import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { siteConfig } from '../../utils/constants'
import Button from '../ui/Button'
import Section from '../ui/Section'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <Section id="hero" className="pt-32 pb-20 min-h-screen flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {siteConfig.hero.title}
          </h1>
          <p className="text-xl text-gray-600 mb-4 leading-relaxed">
            {siteConfig.hero.subtitle}
          </p>
          {siteConfig.hero.subtitle2 && (
            <p className="text-2xl font-semibold text-primary-600 mb-8 leading-relaxed">
              {siteConfig.hero.subtitle2}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => navigate('/courses')} size="lg">
              {siteConfig.hero.ctaPrimary}
            </Button>
            <Button href="#about" variant="secondary" size="lg">
              {siteConfig.hero.ctaSecondary}
            </Button>
          </div>
        </motion.div>

        {/* Hero Image/Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative w-full h-96 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl shadow-2xl flex items-center justify-center">
            <div className="text-white text-center p-8">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="text-8xl mb-4"
              >
                🎓
              </motion.div>
              <p className="text-2xl font-semibold">Your Grades, Our Mission</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
