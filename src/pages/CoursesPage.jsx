import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaBookOpen, FaGlobe, FaAward, FaLanguage, FaComments, FaProjectDiagram } from 'react-icons/fa'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../utils/translations'

const courseIcons = [FaBookOpen, FaGlobe, FaAward, FaLanguage, FaComments, FaProjectDiagram]

export default function CoursesPage() {
  const { lang } = useLanguage()
  const t = translations[lang].coursesPage

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
            {t.heading}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t.subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {t.courses.map((course, index) => {
            const Icon = courseIcons[index]
            return (
              <Card key={course.id} delay={index * 0.1} className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-14 h-14 bg-white/10 text-white rounded-2xl mr-4">
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{course.title}</h3>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6">{course.description}</p>
                <div>
                  <h4 className="font-semibold text-white mb-3">{t.whatYouCover}</h4>
                  <ul className="space-y-2">
                    {course.topics.map((topic) => (
                      <li key={topic} className="flex items-center text-gray-400">
                        <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                {course.slug && (
                  <Link
                    to={`/courses/${course.slug}`}
                    className="mt-6 inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold bg-white text-black rounded-lg hover:bg-gray-200 transition-all"
                  >
                    {t.checkCoursesCta}
                  </Link>
                )}
              </Card>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-8 md:p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">{t.formatHeading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">📹</div>
                <h4 className="font-semibold text-white mb-1">{t.videoTitle}</h4>
                <p className="text-gray-400 text-sm">{t.videoDesc}</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📝</div>
                <h4 className="font-semibold text-white mb-1">{t.worksheetsTitle}</h4>
                <p className="text-gray-400 text-sm">{t.worksheetsDesc}</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-semibold text-white mb-1">{t.pastPapersTitle}</h4>
                <p className="text-gray-400 text-sm">{t.pastPapersDesc}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-12 text-white max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">{t.comingSoonHeading}</h2>
            <p className="text-lg text-gray-400 mb-6">
              {t.comingSoonDesc}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-black rounded-lg hover:bg-gray-200 transition-all"
            >
              {t.getNotified}
            </a>
          </div>
        </motion.div>
      </Section>
    </div>
  )
}
