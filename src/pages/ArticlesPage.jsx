import { motion } from 'framer-motion'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'
import { articles } from '../utils/constants'

function formatDate(isoDate) {
  const date = new Date(isoDate)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

export default function ArticlesPage() {
  return (
    <div className="pt-24">
      <Section background="gray">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Articles</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Insights on A-Levels, admissions, and study strategy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {articles.map((article, index) => (
            <Card key={article.id} delay={index * 0.1} className="p-7 h-full flex flex-col max-w-4xl mx-auto w-full">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span>{article.category}</span>
                <span>{article.readTime}</span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3 leading-tight">{article.title}</h2>

              <p className="text-gray-400 leading-relaxed mb-6 flex-grow">{article.summary}</p>

              {article.content && (
                <div className="text-gray-300 leading-relaxed whitespace-pre-line mb-6">
                  {article.content}
                </div>
              )}

              <p className="text-sm text-gray-500">{formatDate(article.date)}</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}
