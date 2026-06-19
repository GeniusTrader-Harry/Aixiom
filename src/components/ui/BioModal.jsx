import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function BioModal({ member, image, labels, onClose }) {
  useEffect(() => {
    if (!member) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [member, onClose])

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          key="bio-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        >
          <motion.div
            key="bio-card"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={member.name}
            className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={labels.close}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl leading-none bg-transparent border-0 cursor-pointer"
            >
              ×
            </button>
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white shadow-lg mb-3">
                <img
                  src={image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="text-2xl font-bold text-white">{member.name}</p>
              <p className="text-sm text-gray-400">{member.role}</p>
            </div>
            {(member.offersTop || member.offers) && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {labels.offers}
                </h3>
                {member.offersTop && (
                  <p className="inline-flex items-center gap-2 mb-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white font-semibold leading-relaxed">
                    🏅 {member.offersTop}
                  </p>
                )}
                {member.offers && (
                  <p className="text-gray-300 leading-relaxed">{member.offers}</p>
                )}
              </div>
            )}
            <p className="text-gray-300 leading-relaxed mb-6">{member.bio}</p>
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                {labels.education}
              </h3>
              <p className="text-gray-300 leading-relaxed">{member.education}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {labels.academicExperience}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {member.academicExperience}
              </p>
            </div>
            {member.awards && (
              <div className="mt-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {labels.awards}
                </h3>
                <p className="text-gray-300 leading-relaxed">{member.awards}</p>
              </div>
            )}
            {member.teaches && (
              <div className="mt-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {labels.teaches}
                </h3>
                <p className="text-gray-300 leading-relaxed">{member.teaches}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
