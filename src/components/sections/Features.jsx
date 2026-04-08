import { FaUserGraduate, FaLaptop, FaClipboardCheck, FaPoundSign } from 'react-icons/fa'
import { siteConfig } from '../../utils/constants'
import Section from '../ui/Section'
import Card from '../ui/Card'

const iconMap = {
  FaUserGraduate: FaUserGraduate,
  FaLaptop: FaLaptop,
  FaClipboardCheck: FaClipboardCheck,
  FaPoundSign: FaPoundSign
}

export default function Features() {
  return (
    <Section id="features" background="gray">
      <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Why Choose AiXiom Education?
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          We're here to give you every advantage — whether you're aiming for top exam results or applying to UK and US universities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {siteConfig.features.map((feature, index) => {
          const Icon = iconMap[feature.icon]
          return (
            <Card key={feature.id} delay={index * 0.1} className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 text-white rounded-full mb-6">
                <Icon className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}
