import { FaLightbulb, FaCode, FaChartBar } from 'react-icons/fa'
import { siteConfig } from '../../utils/constants'
import Section from '../ui/Section'
import Card from '../ui/Card'

const iconMap = {
  FaLightbulb: FaLightbulb,
  FaCode: FaCode,
  FaChartBar: FaChartBar
}

export default function Services() {
  return (
    <Section id="services" background="white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Services
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive solutions designed to meet your unique business needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {siteConfig.services.map((service, index) => {
          const Icon = iconMap[service.icon]
          return (
            <Card key={service.id} delay={index * 0.15} className="p-8">
              <div className="flex items-center justify-center w-20 h-20 bg-primary-100 text-primary-600 rounded-2xl mb-6">
                <Icon className="text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}
