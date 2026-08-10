import { motion } from 'framer-motion'
import Section from '../components/ui/Section'
import TutorialGrid from '../components/ui/TutorialGrid'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../utils/translations'

export default function TutorialsPage() {
  const { lang } = useLanguage()
  const t = translations[lang].tutorials

  return (
    <div className="pt-24">
      <Section background="gray">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">
            {t.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t.tagline}</p>
        </motion.div>

        <TutorialGrid videos={t.videos} />
      </Section>
    </div>
  )
}
