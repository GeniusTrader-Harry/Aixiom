import { useState } from 'react'
import { motion } from 'framer-motion'
import Section from '../ui/Section'
import BioModal from '../ui/BioModal'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../utils/translations'

const team = [
  {
    name: 'Harry Zhu',
    image: '/avatar-harry.png',
    linkedin: 'https://www.linkedin.com/in/wenhao-zhu-167599373/',
  },
  {
    name: 'Cooper Wu',
    image: '/avatar-cooper.png',
    linkedin: 'https://www.linkedin.com/in/yuzhelun-cooper-wu-7022b1377/',
  },
  {
    name: 'Minseok Kim',
    image: '/avatar-minseok.png',
  },
]

export default function About() {
  const { lang } = useLanguage()
  const t = translations[lang].about
  const tAbout = translations[lang].aboutPage
  const [activeBio, setActiveBio] = useState(null)
  const activeMember = activeBio
    ? tAbout.teamMembers.find((m) => m.name === activeBio)
    : null
  const activeImage = activeMember
    ? team.find((m) => m.name === activeMember.name)?.image
    : null

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
              <p className="text-2xl font-semibold">{t.visual}</p>
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
            {t.title}
          </h2>
          <p className="text-lg text-gray-400 mb-6 leading-relaxed">
            {t.description}
          </p>
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
          {t.meetTeam}
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
              <p className="text-sm text-gray-400 mt-1">
                {tAbout.teamMembers.find((m) => m.name === member.name)?.role ?? t.role}
              </p>
              <div className="mt-3 flex flex-col items-center gap-2">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300 transition-colors font-medium underline text-sm"
                  >
                    {t.viewLinkedin}
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setActiveBio(member.name)}
                  className="text-white hover:text-gray-300 transition-colors font-medium underline text-sm bg-transparent border-0 cursor-pointer p-0"
                >
                  {tAbout.viewBio}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <BioModal
        member={activeMember}
        image={activeImage}
        labels={{
          close: tAbout.closeLabel,
          profile: tAbout.profileLabel,
          academicExperience: tAbout.academicExperienceLabel,
          awards: tAbout.awardsLabel,
          offers: tAbout.offersLabel,
          teaches: tAbout.teachesLabel,
        }}
        onClose={() => setActiveBio(null)}
      />
    </Section>
  )
}
