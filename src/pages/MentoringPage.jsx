import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaVideo, FaCalendarCheck, FaUserGraduate, FaComments, FaFileAlt, FaUniversity } from 'react-icons/fa'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useLanguage } from '../context/LanguageContext'
import { useCurrency } from '../context/CurrencyContext'
import { formatPrice } from '../utils/currency'
import { translations } from '../utils/translations'

const highlightIconMap = {
  hkuk: [FaUserGraduate, FaFileAlt, FaComments, FaUniversity],
  us: [FaUserGraduate, FaFileAlt, FaComments, FaUniversity],
}

const stepIcons = [FaCalendarCheck, FaComments, FaUserGraduate, FaVideo]

export default function MentoringPage() {
  const [activeRegion, setActiveRegion] = useState('hkuk')
  const { lang } = useLanguage()
  const { currency } = useCurrency()
  const t = translations[lang].mentoringPage
  const region = t.regions[activeRegion]
  const icons = highlightIconMap[activeRegion]

  return (
    <div className="pt-24">
      <Section background="gray">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.heading}</h1>
        </motion.div>

        {/* Region Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex rounded-xl border border-gray-700 p-1 bg-gray-900/60">
            {Object.entries(t.regions).map(([key, val]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveRegion(key)}
                className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeRegion === key ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
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
            {/* Region subtitle */}
            <p className="text-center text-lg text-gray-400 max-w-3xl mx-auto mb-12">{region.subtitle}</p>

            {/* Highlight icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto">
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

            {/* Description paragraphs */}
            <div className="max-w-4xl mx-auto space-y-6 mb-16">
              {[region.description, region.description2, region.description3].map((text, i) => (
                <p key={i} className="text-lg text-gray-300 leading-relaxed">
                  {text}
                </p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">{t.howItWorksHeading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.steps.map((step, index) => {
              const Icon = stepIcons[index]
              return (
                <Card key={step.id} delay={index * 0.1} className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 text-white rounded-full mb-6">
                    <Icon className="text-3xl" />
                  </div>
                  <div className="text-sm font-bold text-gray-400 mb-2">{t.stepLabel} {step.id}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </Card>
              )
            })}
          </div>
        </div>

        {/* What a Typical Session Looks Like */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion + '-session-' + lang}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="mb-16"
          >
            <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">{t.typicalSessionHeading}</h2>
              <div className="space-y-4 text-gray-400">
                {region.sessionItems.map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-white/10 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <p>
                      <strong className="text-white">{item.label}</strong> — {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Our Mentors */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion + '-mentors-' + lang}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{t.ourMentorsHeading}</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">{region.mentorNote}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {t.mentorCards.map((card, i) => (
                <Card key={i} delay={i * 0.1} className="p-6 text-center">
                  <div className="text-4xl mb-4">{card.emoji}</div>
                  <h4 className="font-bold text-white mb-2">{card.title}</h4>
                  <p className="text-gray-400 text-sm">{card.desc}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Packages */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-white mb-4">{t.packagesHeading}</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t.packagesSubheading}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {t.packages.map((pkg, i) => (
              <Card
                key={pkg.id}
                delay={i * 0.1}
                className={`p-8 flex flex-col ${
                  pkg.featured ? 'border-white/60 ring-1 ring-white/30' : ''
                }`}
              >
                {pkg.featured && (
                  <span className="inline-block self-start mb-3 px-3 py-1 bg-white text-black text-xs font-bold rounded-full uppercase tracking-wide">
                    {t.mostPopularLabel}
                  </span>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold text-white mb-2">{formatPrice(pkg.price, currency)}</div>
                <p className="text-gray-400 mb-6">{pkg.tagline}</p>
                <ul className="space-y-3 text-gray-300">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <span className="flex-shrink-0 w-1.5 h-1.5 bg-white rounded-full mt-2 mr-3"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-12 text-white max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">{t.bookFreeHeading}</h2>
            <p className="text-lg text-gray-400 mb-6">
              {t.bookFreeDesc}
            </p>
            <Button
              href="https://calendly.com/wucooper464/30min-intro-session?month=2026-04"
              target="_blank"
              size="lg"
            >
              {t.bookNow}
            </Button>
          </div>
        </motion.div>
      </Section>
    </div>
  )
}
