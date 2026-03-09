import { motion } from 'framer-motion'
import { siteConfig } from '../../utils/constants'
import Section from '../ui/Section'

const team = [
  {
    name: 'Harry Zhu',
    image: '/avatar-harry.jpg',
    role: 'Head Mentor',
  },
  {
    name: 'Cooper Wu',
    image: '/avatar-cooper.jpg',
    role: 'Head Mentor',
  },
]

export default function About() {
  return (
    <Section id="about" background="gray">
      {/* About intro */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        {/* Image/Visual */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative w-full h-96 bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-xl border border-gray-800 flex items-center justify-center">
            <div className="text-white text-center p-8">
              <div className="text-8xl mb-4">🎓</div>
              <p className="text-2xl font-semibold">Your Success, Our Priority</p>
            </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {siteConfig.about.title}
          </h2>
          <p className="text-lg text-gray-400 mb-6 leading-relaxed">
            {siteConfig.about.description}
          </p>
          <div className="bg-gray-900 border-l-4 border-white p-6 rounded-r-lg">
            <p className="text-gray-300 italic">
              {siteConfig.about.mission}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Meet the Team */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Meet the Team
        </h3>
        <div className="flex flex-col sm:flex-row justify-center gap-10">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col items-center"
            >
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="text-xl font-semibold text-white">{member.name}</p>
              <p className="text-sm text-gray-400 mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}
