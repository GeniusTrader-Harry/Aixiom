import { createContext, useContext, useEffect, useState } from 'react'
import { CURRENCIES } from '../utils/currency'
import { useLanguage } from './LanguageContext'

const CurrencyContext = createContext()

// Default currency per language.
const LANG_DEFAULT_CURRENCY = { en: 'GBP', zh: 'RMB' }

export function CurrencyProvider({ children }) {
  const { lang } = useLanguage()
  const [currency, setCurrency] = useState(LANG_DEFAULT_CURRENCY[lang] ?? 'GBP')

  // Whenever the language changes, switch to that language's default currency.
  // (The user can still manually pick a different currency afterwards, until
  // the next language change.)
  useEffect(() => {
    setCurrency(LANG_DEFAULT_CURRENCY[lang] ?? 'GBP')
  }, [lang])

  const cycleCurrency = () =>
    setCurrency(CURRENCIES[(CURRENCIES.indexOf(currency) + 1) % CURRENCIES.length])

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, cycleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  return useContext(CurrencyContext)
}
