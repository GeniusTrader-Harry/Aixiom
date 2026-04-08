import { motion } from 'framer-motion'
import { siteConfig } from '../../utils/constants'
import Button from '../ui/Button'
import Section from '../ui/Section'

export default function CTA({ contactHref = '#contact' }) {
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
          {siteConfig.cta.title}
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          {siteConfig.cta.description}
        </p>
        <Button
          href={contactHref}
          variant="primary"
          size="lg"
        >
          {siteConfig.cta.buttonText}
        </Button>
      </motion.div>
    </Section>
  )
}
