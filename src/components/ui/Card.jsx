import { motion } from 'framer-motion'

export default function Card({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`bg-gray-900 border border-gray-800 rounded-xl shadow-lg hover:shadow-xl hover:shadow-black/20 transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  )
}
