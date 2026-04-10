import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'
import { articles } from '../utils/constants'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../utils/translations'

function formatDate(isoDate, lang) {
  const date = new Date(isoDate)
  return date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

export default function ArticlesPage() {
  const { lang } = useLanguage()
  const t = translations[lang].articlesPage

  return (
    <div className="pt-24">
      <Section background="gray">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.heading}</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t.subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Link key={article.id} to={`/articles/${article.id}`} className="block h-full">
              <Card delay={index * 0.1} className="p-7 h-full flex flex-col hover:border-white transition-colors cursor-pointer">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span>{article.category}</span>
                  <span>{article.readTime}</span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 leading-tight">{article.title}</h2>

                <p className="text-gray-400 leading-relaxed mb-6 flex-grow">{article.summary}</p>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">{formatDate(article.date, lang)}</p>
                  <span className="text-white font-medium text-sm">{t.readMore} →</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  )
}
