import { FaBookOpen, FaGlobe, FaAward, FaLanguage, FaComments } from 'react-icons/fa'
import { siteConfig } from '../../utils/constants'
import Section from '../ui/Section'
import Card from '../ui/Card'

const iconMap = {
  FaBookOpen: FaBookOpen,
  FaGlobe: FaGlobe,
  FaAward: FaAward,
  FaLanguage: FaLanguage,
  FaComments: FaComments
}

export default function Services() {
  return (
    <Section id="services" background="white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          What We Offer
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Everything you need to succeed in your A-Levels, all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {siteConfig.services.map((service, index) => {
          const Icon = iconMap[service.icon]
          return (
            <Card key={service.id} delay={index * 0.15} className="p-8">
              <div className="flex items-center justify-center w-20 h-20 bg-white/10 text-white rounded-2xl mb-6">
                <Icon className="text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}
