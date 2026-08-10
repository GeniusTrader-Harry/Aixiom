import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../utils/translations'
import TutorialGrid from '../ui/TutorialGrid'

export default function SampleTutorials() {
  const { lang } = useLanguage()
  const t = translations[lang].tutorials

  // The homepage only previews the first two tutorials — the rest live on
  // the dedicated Sample Tutorials page.
  const preview = t.videos.slice(0, 2)

  return (
    <section id="tutorials" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">
            {t.badge}
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t.tagline}</p>
        </motion.div>

        {/* Preview videos */}
        <TutorialGrid videos={preview} />

        {/* Link to the full tutorials page */}
        <div className="text-center mt-12">
          <Link
            to="/tutorials"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-colors"
          >
            {t.viewAll}
          </Link>
        </div>
      </div>
    </section>
  )
}
