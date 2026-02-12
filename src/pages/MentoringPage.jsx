import { motion } from 'framer-motion'
import { FaVideo, FaCalendarCheck, FaUserGraduate, FaComments } from 'react-icons/fa'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const steps = [
  {
    id: 1,
    icon: FaCalendarCheck,
    title: "Book a Session",
    description: "Choose a time that works for you and book your session online. Your first introductory session is free."
  },
  {
    id: 2,
    icon: FaComments,
    title: "Tell Us Your Goals",
    description: "We'll discuss your current level, target grades, and the areas you need the most help with."
  },
  {
    id: 3,
    icon: FaUserGraduate,
    title: "Get Matched",
    description: "We'll pair you with a tutor who specialises in your subject and understands your learning style."
  },
  {
    id: 4,
    icon: FaVideo,
    title: "Start Learning",
    description: "Sessions take place online via Zoom or Google Meet — learn from the comfort of your own home."
  }
]

export default function MentoringPage() {
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
            1v1 Mentoring
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Personalised one-on-one sessions tailored to your strengths, weaknesses, and learning goals.
          </p>
        </motion.div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <Card key={step.id} delay={index * 0.1} className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
                    <Icon className="text-3xl" />
                  </div>
                  <div className="text-sm font-bold text-primary-600 mb-2">Step {step.id}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </Card>
              )
            })}
          </div>
        </div>

        {/* What a Typical Session Looks Like */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">What a Typical Session Looks Like</h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                <p><strong className="text-gray-900">Check-in (5 mins)</strong> — Quick review of what you've been working on and any questions from the week.</p>
              </div>
              <div className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                <p><strong className="text-gray-900">Focused Teaching (30 mins)</strong> — Deep dive into a specific topic, concept, or past paper question with your tutor.</p>
              </div>
              <div className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                <p><strong className="text-gray-900">Practice & Application (20 mins)</strong> — Work through practice questions together, building confidence and exam technique.</p>
              </div>
              <div className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-sm">4</span>
                <p><strong className="text-gray-900">Wrap-up (5 mins)</strong> — Summary of key takeaways and action items for the week ahead.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Our Mentors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mentors</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              All our tutors are qualified professionals with real experience in finance and education.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card delay={0} className="p-6 text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h4 className="font-bold text-gray-900 mb-2">Degree-Qualified</h4>
              <p className="text-gray-600 text-sm">All tutors hold relevant degrees from top universities</p>
            </Card>
            <Card delay={0.1} className="p-6 text-center">
              <div className="text-4xl mb-4">📖</div>
              <h4 className="font-bold text-gray-900 mb-2">Syllabus Experts</h4>
              <p className="text-gray-600 text-sm">Deep knowledge of the A-Level syllabus and exam requirements</p>
            </Card>
            <Card delay={0.2} className="p-6 text-center">
              <div className="text-4xl mb-4">💬</div>
              <h4 className="font-bold text-gray-900 mb-2">Approachable</h4>
              <p className="text-gray-600 text-sm">Friendly, patient, and dedicated to your success</p>
            </Card>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-primary-600 rounded-2xl p-8 md:p-12 text-white max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Book a Free Intro Session</h2>
            <p className="text-lg opacity-90 mb-6">
              Not sure if 1v1 mentoring is right for you? Try a free introductory session — no commitment, no pressure.
            </p>
            <Button
              href="#contact"
              variant="secondary"
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-100"
            >
              Book Now
            </Button>
          </div>
        </motion.div>
      </Section>
    </div>
  )
}
