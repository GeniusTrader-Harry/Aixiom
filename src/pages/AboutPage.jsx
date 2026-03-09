import { motion } from 'framer-motion'
import Section from '../components/ui/Section'
import CTA from '../components/sections/CTA'

const team = [
  {
    name: 'Harry Zhu',
    image: '/avatar-harry.jpg',
    role: 'Head Mentor',
    bio: 'Harry is passionate about making top-quality education accessible to every student. With deep expertise in Finance and Economics, he brings a results-driven approach to every tutoring session.',
  },
  {
    name: 'Cooper Wu',
    image: '/avatar-cooper.jpg',
    role: 'Head Mentor',
    bio: 'Cooper combines academic excellence with a genuine care for student success. His structured, exam-focused teaching style has helped students consistently achieve their target grades.',
  },
]

const values = [
  {
    title: 'Student First',
    description: 'Everything we do is built around helping students succeed — your goals drive every decision we make.',
  },
  {
    title: 'Results-Driven',
    description: 'We don\'t just teach content — we teach you how to perform under exam conditions and ace every paper.',
  },
  {
    title: 'Accessible Excellence',
    description: 'Top-tier tutoring shouldn\'t be reserved for the few. We keep our pricing transparent and fair.',
  },
]

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero Header */}
      <Section background="gray">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About Us
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            AiXiom Education was founded with a simple goal — to make high-quality A-Level tutoring accessible to every student. We specialise in finance-related subjects and believe that with the right support, every student can achieve the grades they deserve.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="bg-gray-900 border-l-4 border-white p-8 rounded-r-2xl max-w-4xl mx-auto">
            <p className="text-2xl text-gray-200 italic text-center leading-relaxed">
              "Our mission is to empower A-Level students with the knowledge, confidence, and exam skills they need to succeed — or we don't make money."
            </p>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-8"
              >
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Meet the Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-14">
            Meet the Team
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-12">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex flex-col items-center max-w-xs text-center"
              >
                <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-white shadow-2xl mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <p className="text-2xl font-bold text-white mb-1">{member.name}</p>
                <p className="text-sm text-gray-400 mb-4">{member.role}</p>
                <p className="text-gray-400 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      <CTA contactHref="/#contact" />
    </div>
  )
}
