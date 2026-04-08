import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUserGraduate, FaFileAlt, FaComments, FaUniversity } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'

const regions = {
  hkuk: {
    label: 'HK / UK',
    highlights: [
      { icon: FaUserGraduate, label: '1-on-1 Mentoring' },
      { icon: FaFileAlt, label: 'UCAS Personal Statement' },
      { icon: FaComments, label: 'Oxbridge Interview Prep' },
      { icon: FaUniversity, label: 'Russell Group Strategy' },
    ],
    description:
      'AiXiom Academy is our elite 1-on-1 mentoring programme built for students applying to UK universities — including Oxbridge, Russell Group, and top Hong Kong institutions. We don't do group sessions. We don't do generic advice. Every session is tailored to you — your goals, your application, your future.',
    description2:
      'Our mentors have been through the UCAS process themselves, with successful applications to Oxford, Cambridge, LSE, Imperial, and other leading UK universities. They know what admissions tutors are looking for, and they'll work with you to craft a compelling personal statement and ace your interview.',
    description3:
      'Whether you're sitting A-Levels, the IB, or the DSE — AiXiom Academy covers personal statement writing, Oxbridge admissions tests, interview technique, subject choice, and university shortlisting. This is strategic, personalised mentorship designed to get you into your dream UK university.',
    ctaText: 'Book Your Free Intro Session',
  },
  us: {
    label: 'US',
    highlights: [
      { icon: FaUserGraduate, label: '1-on-1 Mentoring' },
      { icon: FaFileAlt, label: 'Common App Essay' },
      { icon: FaComments, label: 'College Interview Prep' },
      { icon: FaUniversity, label: 'Ivy League Strategy' },
    ],
    description:
      'AiXiom Academy is our elite 1-on-1 mentoring programme built for students applying to US colleges — from Ivy League schools to top liberal arts colleges. We don't do group sessions. We don't do generic advice. Every session is tailored to you — your profile, your essays, your college list.',
    description2:
      'Our mentors have navigated the US college admissions process at Harvard, Princeton, Columbia, and other top institutions. They understand what admissions officers are looking for, and they'll help you build a standout application — from your Common App essays to your extracurricular narrative.',
    description3:
      'From crafting compelling Common App and supplemental essays to building your extracurricular profile, choosing the right college list, and preparing for alumni interviews — AiXiom Academy covers every angle of the US college application journey. This is strategic, personalised mentorship designed to get you accepted.',
    ctaText: 'Book Your Free Intro Session',
  },
}

export default function Academy() {
  const navigate = useNavigate()
  const [activeRegion, setActiveRegion] = useState('hkuk')
  const region = regions[activeRegion]

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">
            Exclusive Programme
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">AiXiom Academy</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Your Personal Edge in the College Race</p>
        </motion.div>

        {/* Region Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex rounded-xl border border-gray-700 p-1 bg-gray-900/60">
            {Object.entries(regions).map(([key, val]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveRegion(key)}
                className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeRegion === key
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white'
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
            {/* Highlight icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-3xl mx-auto">
              {region.highlights.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-3">
                    <Icon className="text-2xl text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">{label}</span>
                </div>
              ))}
            </div>

            {/* Content paragraphs */}
            <div className="max-w-4xl mx-auto space-y-8 mb-16">
              {[region.description, region.description2, region.description3].map((text, i) => (
                <p key={i} className="text-lg text-gray-300 leading-relaxed">
                  {text}
                </p>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button onClick={() => navigate('/mentoring')} size="lg">
                {region.ctaText}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
