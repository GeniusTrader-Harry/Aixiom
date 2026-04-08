import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaVideo, FaCalendarCheck, FaUserGraduate, FaComments, FaFileAlt, FaUniversity } from 'react-icons/fa'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const regions = {
  hkuk: {
    label: 'HK / UK',
    highlights: [
      { icon: FaUserGraduate, label: '1-on-1 Mentoring' },
      { icon: FaFileAlt, label: 'UCAS Personal Statement' },
      { icon: FaComments, label: 'Oxbridge Interview Prep' },
      { icon: FaUniversity, label: 'Russell Group Strategy' },
    ],
    subtitle: 'Elite 1-on-1 mentoring for students applying to UK universities — Oxbridge, Russell Group, and top Hong Kong institutions.',
    description:
      "AiXiom Academy is our elite 1-on-1 mentoring programme built for students applying to UK universities — including Oxbridge, Russell Group, and top Hong Kong institutions. We don't do group sessions. We don't do generic advice. Every session is tailored to you — your goals, your application, your future.",
    description2:
      "Our mentors have been through the UCAS process themselves, with successful applications to Oxford, Cambridge, LSE, Imperial, and other leading UK universities. They know what admissions tutors are looking for, and they'll work with you to craft a compelling personal statement and ace your interview.",
    description3:
      "Whether you're sitting A-Levels, the IB, or the DSE — AiXiom Academy covers personal statement writing, Oxbridge admissions tests, interview technique, subject choice, and university shortlisting. This is strategic, personalised mentorship designed to get you into your dream UK university.",
    sessionItems: [
      { label: 'Check-in (5 mins)', detail: 'Quick review of your UCAS application progress and any questions from the week.' },
      { label: 'Strategic Focus (30 mins)', detail: 'Deep dive into personal statement drafts, university shortlisting, or Oxbridge test prep.' },
      { label: 'Practice & Feedback (20 mins)', detail: 'Work through mock interviews, personal statement critiques, or admissions strategy together.' },
      { label: 'Wrap-up (5 mins)', detail: 'Summary of key takeaways and action items for the week ahead.' },
    ],
    mentorNote: 'Mentors from Oxford, Cambridge, LSE, Imperial, and other top UK universities.',
  },
  us: {
    label: 'US',
    highlights: [
      { icon: FaUserGraduate, label: '1-on-1 Mentoring' },
      { icon: FaFileAlt, label: 'Common App Essay' },
      { icon: FaComments, label: 'College Interview Prep' },
      { icon: FaUniversity, label: 'Ivy League Strategy' },
    ],
    subtitle: 'Elite 1-on-1 mentoring for students applying to US colleges — from Ivy League schools to top liberal arts colleges.',
    description:
      "AiXiom Academy is our elite 1-on-1 mentoring programme built for students applying to US colleges — from Ivy League schools to top liberal arts colleges. We don't do group sessions. We don't do generic advice. Every session is tailored to you — your profile, your essays, your college list.",
    description2:
      "Our mentors have earned offers from MIT, the University of Michigan, Vanderbilt, and other top US institutions. They understand what admissions officers are looking for, and they'll help you build a standout application — from your Common App essays to your extracurricular narrative.",
    description3:
      'From crafting compelling Common App and supplemental essays to building your extracurricular profile, choosing the right college list, and preparing for alumni interviews — AiXiom Academy covers every angle of the US college application journey. This is strategic, personalised mentorship designed to get you accepted.',
    sessionItems: [
      { label: 'Check-in (5 mins)', detail: 'Quick review of your Common App progress and any questions from the week.' },
      { label: 'Strategic Focus (30 mins)', detail: 'Deep dive into Common App or supplemental essays, college list building, or interview prep.' },
      { label: 'Practice & Feedback (20 mins)', detail: 'Work through mock alumni interviews, essay critiques, or extracurricular narrative together.' },
      { label: 'Wrap-up (5 mins)', detail: 'Summary of key takeaways and action items for the week ahead.' },
    ],
    mentorNote: 'Mentors with offers from MIT, the University of Michigan, Vanderbilt, and other top US universities.',
  },
}

const steps = [
  {
    id: 1,
    icon: FaCalendarCheck,
    title: 'Book a Session',
    description: 'Choose a time that works for you and book your session online. Your first introductory session is free.',
  },
  {
    id: 2,
    icon: FaComments,
    title: 'Tell Us Your Goals',
    description: 'We\'ll discuss your target universities, your strengths, and the areas where you need the most support.',
  },
  {
    id: 3,
    icon: FaUserGraduate,
    title: 'Get Matched',
    description: 'We\'ll pair you with a mentor who has navigated the admissions process and understands your goals.',
  },
  {
    id: 4,
    icon: FaVideo,
    title: 'Start Your Journey',
    description: 'Sessions take place online via Zoom or Google Meet — work with your mentor from anywhere.',
  },
]

export default function MentoringPage() {
  const [activeRegion, setActiveRegion] = useState('hkuk')
  const region = regions[activeRegion]

  return (
    <div className="pt-24">
      <Section background="gray">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">AiXiom Academy</h1>
        </motion.div>

        {/* Region Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex rounded-xl border border-gray-700 p-1 bg-gray-900/60">
            {Object.entries(regions).map(([key, val]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveRegion(key)}
                className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeRegion === key ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                {val.label}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            {/* Region subtitle */}
            <p className="text-center text-lg text-gray-400 max-w-3xl mx-auto mb-12">{region.subtitle}</p>

            {/* Highlight icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto">
              {region.highlights.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-3">
                    <Icon className="text-2xl text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">{label}</span>
                </div>
              ))}
            </div>

            {/* Description paragraphs */}
            <div className="max-w-4xl mx-auto space-y-6 mb-16">
              {[region.description, region.description2, region.description3].map((text, i) => (
                <p key={i} className="text-lg text-gray-300 leading-relaxed">
                  {text}
                </p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <Card key={step.id} delay={index * 0.1} className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 text-white rounded-full mb-6">
                    <Icon className="text-3xl" />
                  </div>
                  <div className="text-sm font-bold text-gray-400 mb-2">Step {step.id}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </Card>
              )
            })}
          </div>
        </div>

        {/* What a Typical Session Looks Like */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion + '-session'}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="mb-16"
          >
            <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">What a Typical Session Looks Like</h2>
              <div className="space-y-4 text-gray-400">
                {region.sessionItems.map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-white/10 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <p>
                      <strong className="text-white">{item.label}</strong> — {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Our Mentors */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion + '-mentors'}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Our Mentors</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">{region.mentorNote}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card delay={0} className="p-6 text-center">
                <div className="text-4xl mb-4">🎓</div>
                <h4 className="font-bold text-white mb-2">Top University Graduates</h4>
                <p className="text-gray-400 text-sm">Mentors from Oxbridge, Ivy League, and Russell Group universities</p>
              </Card>
              <Card delay={0.1} className="p-6 text-center">
                <div className="text-4xl mb-4">📖</div>
                <h4 className="font-bold text-white mb-2">Admissions Experts</h4>
                <p className="text-gray-400 text-sm">Deep knowledge of what top universities look for in applicants</p>
              </Card>
              <Card delay={0.2} className="p-6 text-center">
                <div className="text-4xl mb-4">💬</div>
                <h4 className="font-bold text-white mb-2">Dedicated & Personal</h4>
                <p className="text-gray-400 text-sm">Your mentor works exclusively with you throughout the entire process</p>
              </Card>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-12 text-white max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Book a Free Intro Session</h2>
            <p className="text-lg text-gray-400 mb-6">
              Not sure if AiXiom Academy is right for you? Try a free introductory session — no commitment, no pressure.
            </p>
            <Button href="#contact" size="lg">
              Book Now
            </Button>
          </div>
        </motion.div>
      </Section>
    </div>
  )
}
