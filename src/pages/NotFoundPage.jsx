import { Link } from 'react-router-dom'
import Section from '../components/ui/Section'

export default function NotFoundPage() {
  return (
    <div className="pt-24">
      <Section background="gray">
        <div className="text-center py-20">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            Sorry, the page you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </Section>
    </div>
  )
}
