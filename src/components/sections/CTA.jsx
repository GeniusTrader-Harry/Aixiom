import { motion } from 'framer-motion'
import Button from '../ui/Button'
import Section from '../ui/Section'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../utils/translations'

export default function CTA({ contactHref = '#contact' }) {
  const { lang } = useLanguage()
  const t = translations[lang].cta

  return (
    <Section background="white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-3xl shadow-2xl p-12 md:p-16 text-center text-white"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          {t.title}
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          {t.description}
        </p>
        <Button
          href={contactHref}
          variant="primary"
          size="lg"
        >
          {t.buttonText}
        </Button>
      </motion.div>
    </Section>
  )
}
