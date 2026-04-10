import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaInstagram, FaTiktok } from 'react-icons/fa'
import { siteConfig } from '../../utils/constants'
import Section from '../ui/Section'
import Button from '../ui/Button'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../utils/translations'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('')
  const { lang } = useLanguage()
  const t = translations[lang].contact

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('submitting')

    const body = new URLSearchParams({
      'form-name': 'contact',
      ...formData,
    }).toString()

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
      .then(() => {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      })
      .catch(() => setStatus('error'))
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Section id="contact" background="gray">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.heading}
          </h2>
          <p className="text-xl text-gray-400">
            {t.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              {t.infoHeading}
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 text-white rounded-lg flex items-center justify-center">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{t.emailLabel}</h4>
                  <p className="text-gray-400">{siteConfig.contact.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 text-white rounded-lg flex items-center justify-center">
                  <FaInstagram className="text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{t.instagramLabel}</h4>
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    @aixiomedu
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 text-white rounded-lg flex items-center justify-center">
                  <FaTiktok className="text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{t.tiktokLabel}</h4>
                  <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    @aixiomedu
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form
              onSubmit={handleSubmit}
              name="contact"
              data-netlify="true"
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-white focus:border-transparent transition-all placeholder-gray-500"
                  placeholder={t.namePlaceholder}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  {t.emailFieldLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-white focus:border-transparent transition-all placeholder-gray-500"
                  placeholder={t.emailPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  {t.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-white focus:border-transparent transition-all resize-none placeholder-gray-500"
                  placeholder={t.messagePlaceholder}
                ></textarea>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? t.sendingButton : t.sendButton}
              </Button>

              {status === 'success' && (
                <div className="text-green-400 text-center font-medium">
                  {t.successMessage}
                </div>
              )}
              {status === 'error' && (
                <div className="text-red-400 text-center font-medium">
                  {t.errorMessage} {siteConfig.contact.email}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
