import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { siteConfig } from '../../utils/constants'
import Button from '../ui/Button'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero-bird.jpg)' }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight tracking-tight">
              {siteConfig.hero.title}
            </h1>
            <p className="text-xl text-gray-300 mb-4 leading-relaxed">
              {siteConfig.hero.subtitle}
            </p>
            {siteConfig.hero.subtitle2 && (
              <p className="text-2xl font-semibold text-white mb-10 leading-relaxed">
                {siteConfig.hero.subtitle2}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate('/courses')}
                size="lg"
                className="bg-white text-black hover:bg-gray-200 border-0"
              >
                {siteConfig.hero.ctaPrimary}
              </Button>
              <Button
                href="#about"
                variant="secondary"
                size="lg"
                className="border-white text-white hover:bg-white/10 bg-transparent"
              >
                {siteConfig.hero.ctaSecondary}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
