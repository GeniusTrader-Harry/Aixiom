import { FaInstagram, FaTiktok } from 'react-icons/fa'
import { SiXiaohongshu } from 'react-icons/si'
import { Link } from 'react-router-dom'
import { siteConfig } from '../../utils/constants'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../utils/translations'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { lang } = useLanguage()
  const t = translations[lang]

  return (
    <footer className="bg-black text-gray-300 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/logo.png"
                alt="AiXiom Education logo"
                className="h-9 w-9 object-contain"
              />
              <h3 className="text-2xl font-bold text-white">
                {siteConfig.siteName}
              </h3>
            </div>
            <div className="flex space-x-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-xl"
              >
                <FaInstagram />
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-xl"
              >
                <FaTiktok />
              </a>
              <a
                href={siteConfig.social.xiaohongshu}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-xl"
                aria-label="Little Red Note (小红书)"
              >
                <SiXiaohongshu />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {t.nav.links.map((link) => (
                <li key={link.href}>
                  {link.type === 'route' ? (
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={`/${link.href}`}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.contact}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>{siteConfig.contact.email}</li>
              <li>
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  TikTok
                </a>
              </li>
              <li>
                <a href={siteConfig.social.xiaohongshu} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {t.contact.xiaohongshuLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; {currentYear} {siteConfig.siteName}. {t.footer.allRights}</p>
        </div>
      </div>
    </footer>
  )
}
