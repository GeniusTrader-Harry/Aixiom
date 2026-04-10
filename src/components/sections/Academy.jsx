import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUserGraduate, FaFileAlt, FaComments, FaUniversity } from 'react-icons/fa'
import Button from '../ui/Button'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../utils/translations'

const highlightIcons = {
  hkuk: [FaUserGraduate, FaFileAlt, FaComments, FaUniversity],
  us: [FaUserGraduate, FaFileAlt, FaComments, FaUniversity],
}

export default function Academy() {
  const [activeRegion, setActiveRegion] = useState('hkuk')
  const { lang } = useLanguage()
  const t = translations[lang].academy
  const region = t.regions[activeRegion]
  const icons = highlightIcons[activeRegion]

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">
            {t.badge}
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t.tagline}</p>
        </motion.div>

        {/* Region Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex rounded-xl border border-gray-700 p-1 bg-gray-900/60">
            {Object.entries(t.regions).map(([key, val]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveRegion(key)}
                className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeRegion === key
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {val.label}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion + lang}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            {/* Highlight icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-3xl mx-auto">
              {region.highlights.map(({ label }, i) => {
                const Icon = icons[i]
                return (
                  <div key={label} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-3">
                      <Icon className="text-2xl text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-300">{label}</span>
                  </div>
                )
              })}
            </div>

            {/* Content paragraphs */}
            <div className="max-w-4xl mx-auto space-y-8 mb-16">
              {[region.description, region.description2, region.description3].map((text, i) => (
                <p key={i} className="text-lg text-gray-300 leading-relaxed">
                  {text}
                </p>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button
                href="https://calendly.com/wucooper464/30min-intro-session?month=2026-04"
                target="_blank"
                size="lg"
              >
                {region.ctaText}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
