import { motion } from 'framer-motion'
import { FaBookOpen, FaExternalLinkAlt } from 'react-icons/fa'
import Section from '../components/ui/Section'
import { useLanguage } from '../context/LanguageContext'

const READING_LISTS = [
  {
    subject: { en: 'Economics', zh: '经济学' },
    description: {
      en: 'Curated reading list for A Level Economics students — covering microeconomics, macroeconomics, and real-world applications.',
      zh: '为A Level经济学学生精心策划的阅读书单——涵盖微观经济学、宏观经济学及实际应用。',
    },
    url: 'https://docs.google.com/spreadsheets/d/1R6sQ5eBFC2oZENr46G8NnnV9lyrWAwa4RYGlzm8s_2c/edit?gid=1678606726#gid=1678606726',
  },
]

export default function ResourcesPage() {
  const { lang } = useLanguage()
  const isEn = lang === 'en'

  return (
    <div className="pt-24">
      <Section background="gray">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {isEn ? 'Resources' : '学习资源'}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {isEn
              ? 'Subject reading lists and materials to support your studies.'
              : '学科阅读书单和学习资料，助力您的学业。'}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">
            {isEn ? 'Subject Reading Lists' : '学科阅读书单'}
          </h2>

          {READING_LISTS.map((item) => (
            <motion.a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="block bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gray-800 text-white">
                  <FaBookOpen className="text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold text-white">
                      {isEn ? item.subject.en : item.subject.zh}{' '}
                      {isEn ? 'Reading List' : '阅读书单'}
                    </h3>
                    <FaExternalLinkAlt className="text-gray-500 text-sm group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-gray-400 mt-2">
                    {isEn ? item.description.en : item.description.zh}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </Section>
    </div>
  )
}
