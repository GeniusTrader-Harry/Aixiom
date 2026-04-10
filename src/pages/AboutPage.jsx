import { motion } from 'framer-motion'
import Section from '../components/ui/Section'
import CTA from '../components/sections/CTA'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../utils/translations'

const teamImages = {
  'Harry Zhu': '/avatar-harry.jpg',
  'Cooper Wu': '/avatar-cooper.jpg',
}
const teamLinkedIn = {
  'Harry Zhu': 'https://www.linkedin.com/in/wenhao-zhu-167599373/',
  'Cooper Wu': 'https://www.linkedin.com/in/yuzhelun-cooper-wu-7022b1377/',
}

export default function AboutPage() {
  const { lang } = useLanguage()
  const t = translations[lang].aboutPage

  return (
    <div className="pt-24">
      {/* Hero Header */}
      <Section background="gray">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t.heading}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {translations[lang].about.description}
          </p>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            {t.valuesHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-8"
              >
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Meet the Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-14">
            {t.teamHeading}
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-12">
            {t.teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex flex-col items-center max-w-xs text-center"
              >
                <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-white shadow-2xl mb-6">
                  <img
                    src={teamImages[member.name]}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <p className="text-2xl font-bold text-white mb-1">{member.name}</p>
                <p className="text-sm text-gray-400 mb-4">{member.role}</p>
                <p className="text-gray-400 leading-relaxed">{member.bio}</p>
                {teamLinkedIn[member.name] && (
                  <a
                    href={teamLinkedIn[member.name]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-white hover:text-gray-300 transition-colors font-medium underline"
                  >
                    {t.viewLinkedin}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      <CTA contactHref="/#contact" />
    </div>
  )
}
