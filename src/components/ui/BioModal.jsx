import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Split an awards string into individual honours, handling both the
// English ". " separators and the Chinese "；" separator, and trimming
// any trailing full stop / 。 so each line reads cleanly.
const splitItems = (s) =>
  s
    .split(/(?:\.\s+|；|;)/)
    .map((x) => x.replace(/[。.]\s*$/, '').trim())
    .filter(Boolean)

function SectionLabel({ children, tone = 'muted' }) {
  const color = tone === 'award' ? 'text-amber-300' : 'text-gray-500'
  return (
    <h3
      className={`text-xs font-semibold uppercase tracking-wider ${color} mb-2`}
    >
      {children}
    </h3>
  )
}

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

  const awards = member?.awards ? splitItems(member.awards) : []

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
            className="relative bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={labels.close}
              className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white text-3xl leading-none bg-transparent border-0 cursor-pointer"
            >
              ×
            </button>

            {/* Header — photo, name, university directly under name */}
            <div className="flex flex-col items-center text-center px-8 pt-10 pb-6 border-b border-gray-800">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white shadow-lg mb-4">
                <img
                  src={image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h2 className="text-2xl font-bold text-white">{member.name}</h2>
              {member.university ? (
                <>
                  <p className="mt-1.5 flex items-center gap-1.5 text-base font-semibold text-gray-100">
                    <span aria-hidden="true">🎓</span>
                    {member.university}
                  </p>
                  {member.degree && (
                    <p className="mt-0.5 text-sm text-gray-400">{member.degree}</p>
                  )}
                </>
              ) : (
                member.education && (
                  <p className="mt-1.5 text-sm text-gray-400">{member.education}</p>
                )
              )}
              {member.role && (
                <span className="mt-3 inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-gray-200">
                  {member.role}
                </span>
              )}
            </div>

            <div className="px-8 py-6 space-y-6">
              {/* Awards & Honours — highlighted, directly under the header */}
              {awards.length > 0 && (
                <div className="rounded-xl bg-amber-500/10 border border-amber-500/25 p-4">
                  <SectionLabel tone="award">{labels.awards}</SectionLabel>
                  <ul className="space-y-2">
                    {awards.map((a) => (
                      <li
                        key={a}
                        className="flex items-start gap-2.5 text-sm text-amber-50/90 leading-relaxed"
                      >
                        <span aria-hidden="true" className="mt-0.5">
                          🏆
                        </span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Offers Received */}
              {(member.offersTop || member.offers) && (
                <div>
                  <SectionLabel>{labels.offers}</SectionLabel>
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

              {/* Profile */}
              <div>
                <SectionLabel>{labels.profile}</SectionLabel>
                <p className="text-gray-300 leading-relaxed">{member.bio}</p>
              </div>

              {/* Academic Experience */}
              <div>
                <SectionLabel>{labels.academicExperience}</SectionLabel>
                <p className="text-gray-300 leading-relaxed">
                  {member.academicExperience}
                </p>
              </div>

              {/* Can Teach */}
              {member.teaches && (
                <div>
                  <SectionLabel>{labels.teaches}</SectionLabel>
                  <p className="text-gray-300 leading-relaxed">{member.teaches}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
