import { motion } from 'framer-motion'
import { FaLock } from 'react-icons/fa'
import Section from '../ui/Section'

// Shown when Supabase isn't configured yet, or for access/empty messages.
export default function PortalNotice({ title, message }) {
  return (
    <div className="pt-24">
      <Section background="gray" className="min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 border border-white/20 text-white rounded-full mb-6">
              <FaLock className="text-xl" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">{title}</h1>
            <p className="text-gray-400">{message}</p>
          </div>
        </motion.div>
      </Section>
    </div>
  )
}
