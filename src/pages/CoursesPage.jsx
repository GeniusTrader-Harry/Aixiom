import { motion } from 'framer-motion'
import { FaBookOpen, FaChartLine, FaBriefcase, FaCalculator } from 'react-icons/fa'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'

const courses = [
  {
    id: 1,
    title: "Finance",
    icon: FaChartLine,
    description: "Master financial concepts, markets, and instruments. Covers personal finance, corporate finance, and financial markets as required by the A-Level syllabus.",
    topics: ["Financial markets", "Investment appraisal", "Sources of finance", "Financial planning"]
  },
  {
    id: 2,
    title: "Economics",
    icon: FaBookOpen,
    description: "Develop a strong understanding of micro and macroeconomics. From supply and demand to fiscal policy, we cover everything you need.",
    topics: ["Microeconomics", "Macroeconomics", "International trade", "Economic policy"]
  },
  {
    id: 3,
    title: "Business Studies",
    icon: FaBriefcase,
    description: "Learn how businesses operate, grow, and compete. Covers marketing, operations, HR, and strategic decision-making.",
    topics: ["Marketing strategies", "Operations management", "Human resources", "Business strategy"]
  },
  {
    id: 4,
    title: "Accounting",
    icon: FaCalculator,
    description: "Build confidence with financial statements, ratios, and management accounting. Step-by-step guidance through every topic.",
    topics: ["Financial statements", "Ratio analysis", "Budgeting", "Cost accounting"]
  }
]

export default function CoursesPage() {
  return (
    <div className="pt-24">
      <Section background="gray">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our A-Level Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Structured learning content designed around the A-Level syllabus, covering all the subjects you need to succeed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {courses.map((course, index) => {
            const Icon = course.icon
            return (
              <Card key={course.id} delay={index * 0.1} className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-14 h-14 bg-primary-100 text-primary-600 rounded-2xl mr-4">
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{course.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">{course.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">What you'll cover:</h4>
                  <ul className="space-y-2">
                    {course.topics.map((topic) => (
                      <li key={topic} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
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
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Course Format</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">📹</div>
                <h4 className="font-semibold text-gray-900 mb-1">Video Lessons</h4>
                <p className="text-gray-600 text-sm">Clear, concise video explanations of every topic</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📝</div>
                <h4 className="font-semibold text-gray-900 mb-1">Worksheets</h4>
                <p className="text-gray-600 text-sm">Practice questions and worksheets to reinforce learning</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-semibold text-gray-900 mb-1">Past Papers</h4>
                <p className="text-gray-600 text-sm">Exam-style questions with model answers</p>
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
          <div className="bg-primary-600 rounded-2xl p-8 md:p-12 text-white max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
            <p className="text-lg opacity-90 mb-6">
              We're putting the finishing touches on our course content. Sign up to be notified when we launch.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-all"
            >
              Get Notified
            </a>
          </div>
        </motion.div>
      </Section>
    </div>
  )
}
