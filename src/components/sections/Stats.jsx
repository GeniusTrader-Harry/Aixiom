import { FaSmile, FaStar, FaUsers, FaTrophy } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { siteConfig } from '../../utils/constants'
import Section from '../ui/Section'

const iconMap = {
  FaSmile: FaSmile,
  FaStar: FaStar,
  FaUsers: FaUsers,
  FaTrophy: FaTrophy
}

export default function Stats() {
  return (
    <Section background="primary" className="bg-primary-600">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {siteConfig.stats.map((stat, index) => {
          const Icon = iconMap[stat.icon]
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center text-white"
            >
              <Icon className="text-5xl mx-auto mb-4 opacity-80" />
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-lg opacity-90">
                {stat.label}
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
