import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'
import CTA from '../components/sections/CTA'
import NotFoundPage from './NotFoundPage'
import { useLanguage } from '../context/LanguageContext'
import { useCurrency } from '../context/CurrencyContext'
import { formatPrice } from '../utils/currency'
import { translations } from '../utils/translations'

export default function CourseCategoryPage() {
  const { category } = useParams()
  const { lang } = useLanguage()
  const { currency } = useCurrency()
  const t = translations[lang].coursesPage
  const detail = t.categories?.[category]

  if (!detail) return <NotFoundPage />

  const labels = t.categoryDetail

  return (
    <div className="pt-24">
      <Section background="gray">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/courses"
            className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
          >
            {labels.backToCourses}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {detail.title}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {detail.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-14"
        >
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-10">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">
              {labels.highlightsHeading}
            </h2>
            {detail.oneOnOne && (
              <div className="border border-white/20 bg-white/5 rounded-xl p-4 mb-6 text-center">
                <div className="text-2xl mb-1">🧑‍🏫</div>
                <p className="text-white font-semibold">{formatPrice(detail.oneOnOne, currency)}</p>
              </div>
            )}
            {detail.bundle && (
              <div className="border border-white/20 bg-white/5 rounded-xl p-4 mb-6 text-center">
                <div className="text-2xl mb-1">📦</div>
                <p className="text-white font-semibold">{formatPrice(detail.bundle, currency)}</p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-6">
              <div>
                <div className="text-3xl mb-2">💳</div>
                <p className="text-white font-semibold">{formatPrice(detail.price, currency)}</p>
              </div>
              <div>
                <div className="text-3xl mb-2">⏳</div>
                <p className="text-white font-semibold">{detail.access}</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🎯</div>
                <p className="text-white font-semibold">{detail.support}</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-center">
              {detail.note}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            {labels.courseListHeading}
          </h2>
          <div className="space-y-4">
            {detail.courses.map((course, i) => (
              <Card key={course.subject} delay={i * 0.05} className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className="text-lg font-semibold text-white">
                    {course.subject}
                  </h3>
                  <p className="text-sm text-gray-400">
                    <span className="text-gray-500 mr-2">{labels.tutorLabel}:</span>
                    {course.tutors}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </Section>

      <CTA contactHref="/#contact" />
    </div>
  )
}
