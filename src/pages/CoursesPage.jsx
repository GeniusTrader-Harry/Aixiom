import { motion } from 'framer-motion'
import { FaBookOpen, FaGlobe, FaAward, FaLanguage, FaComments } from 'react-icons/fa'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'

const courses = [
  {
    id: 1,
    title: "A-Level Courses",
    icon: FaBookOpen,
    description: "Structured learning content covering key A-Level subjects with expert tutors and exam-focused strategies.",
    topics: ["Economics", "Mathematics", "Further Mathematics", "Sociology", "Physics"]
  },
  {
    id: 2,
    title: "IGCSE Courses",
    icon: FaGlobe,
    description: "Comprehensive support for IGCSE students across key subjects, with structured lessons and exam practice.",
    topics: ["Core subject coverage", "Past paper practice", "Exam technique", "Revision resources"]
  },
  {
    id: 3,
    title: "AP Courses",
    icon: FaAward,
    description: "Expert guidance for Advanced Placement exams, covering content review, practice tests, and scoring strategies.",
    topics: ["Content review", "Practice tests", "Scoring strategies", "Exam preparation"]
  },
  {
    id: 4,
    title: "IELTS",
    icon: FaLanguage,
    description: "Targeted preparation for all four IELTS components — Listening, Reading, Writing, and Speaking.",
    topics: ["Listening", "Reading", "Writing", "Speaking"]
  },
  {
    id: 5,
    title: "PF Debate",
    icon: FaComments,
    description: "Public Forum debate coaching covering case construction, rebuttal strategy, and speaking skills.",
    topics: ["Case construction", "Rebuttal strategy", "Crossfire technique", "Speaking skills"]
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Courses
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Structured learning content designed around the A-Level syllabus, covering all the subjects you need to succeed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {courses.map((course, index) => {
            const Icon = course.icon
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
                  <h4 className="font-semibold text-white mb-3">What you'll cover:</h4>
                  <ul className="space-y-2">
                    {course.topics.map((topic) => (
                      <li key={topic} className="flex items-center text-gray-400">
                        <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
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
          <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-8 md:p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Course Format</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">📹</div>
                <h4 className="font-semibold text-white mb-1">Video Lessons</h4>
                <p className="text-gray-400 text-sm">Clear, concise video explanations of every topic</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📝</div>
                <h4 className="font-semibold text-white mb-1">Worksheets</h4>
                <p className="text-gray-400 text-sm">Practice questions and worksheets to reinforce learning</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-semibold text-white mb-1">Past Papers</h4>
                <p className="text-gray-400 text-sm">Exam-style questions with model answers</p>
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
            <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
            <p className="text-lg text-gray-400 mb-6">
              We're putting the finishing touches on our course content. Sign up to be notified when we launch.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-black rounded-lg hover:bg-gray-200 transition-all"
            >
              Get Notified
            </a>
          </div>
        </motion.div>
      </Section>
    </div>
  )
}
