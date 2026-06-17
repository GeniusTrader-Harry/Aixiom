// Currency formatting.
//
// Prices in translations.js are authored with an explicit value per currency
// using a `{price:GBP|RMB}` token, e.g. '{price:120|1100} per recorded course'
// → "£120" in GBP, "¥1,100" in RMB. The two numbers are independent — edit
// either one directly; there is no automatic conversion.
export const CURRENCIES = ['GBP', 'RMB']

export const CURRENCY_CONFIG = {
  GBP: { symbol: '£', index: 0 },
  RMB: { symbol: '¥', index: 1 },
}

// Replace every `{price:GBP|RMB}` token with the value for the active currency.
export function formatPrice(text, currency = 'GBP') {
  if (!text) return text
  const config = CURRENCY_CONFIG[currency] ?? CURRENCY_CONFIG.GBP
  return text.replace(/\{price:(\d+)\|(\d+)\}/g, (_, gbp, rmb) => {
    const amount = config.index === 1 ? rmb : gbp
    return config.symbol + Number(amount).toLocaleString('en-US')
  })
}
