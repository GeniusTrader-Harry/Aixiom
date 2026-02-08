import { FaRocket, FaShieldAlt, FaUsers, FaChartLine } from 'react-icons/fa'
import { siteConfig } from '../../utils/constants'
import Section from '../ui/Section'
import Card from '../ui/Card'

const iconMap = {
  FaRocket: FaRocket,
  FaShieldAlt: FaShieldAlt,
  FaUsers: FaUsers,
  FaChartLine: FaChartLine
}

export default function Features() {
  return (
    <Section id="features" background="gray">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Why Choose Aixiom?
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We deliver exceptional value through innovation, reliability, and dedication to your success.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {siteConfig.features.map((feature, index) => {
          const Icon = iconMap[feature.icon]
          return (
            <Card key={feature.id} delay={index * 0.1} className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
                <Icon className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}
