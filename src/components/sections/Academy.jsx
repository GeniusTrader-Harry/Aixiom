import { motion } from 'framer-motion'
import { FaUserGraduate, FaFileAlt, FaComments, FaUniversity } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { siteConfig } from '../../utils/constants'
import Button from '../ui/Button'

const highlights = [
  { icon: FaUserGraduate, label: '1-on-1 Mentoring' },
  { icon: FaFileAlt, label: 'Personal Statement Review' },
  { icon: FaComments, label: 'Interview Prep' },
  { icon: FaUniversity, label: 'University Strategy' },
]

export default function Academy() {
  const navigate = useNavigate()

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">
            Exclusive Programme
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {siteConfig.academy.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {siteConfig.academy.tagline}
          </p>
        </motion.div>

        {/* Highlight icons row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-3xl mx-auto"
        >
          {highlights.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-3">
                <Icon className="text-2xl text-white" />
              </div>
              <span className="text-sm font-medium text-gray-300">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Content paragraphs */}
        <div className="max-w-4xl mx-auto space-y-8 mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-300 leading-relaxed"
          >
            {siteConfig.academy.description}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-300 leading-relaxed"
          >
            {siteConfig.academy.description2}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-gray-300 leading-relaxed"
          >
            {siteConfig.academy.description3}
          </motion.p>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Button
            onClick={() => navigate('/mentoring')}
            size="lg"
            className="bg-white text-black hover:bg-gray-200 border-0"
          >
            {siteConfig.academy.ctaText}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
