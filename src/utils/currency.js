// Currency conversion + formatting.
//
// All prices in translations.js are authored in USD using a `{price:NNN}` token
// (e.g. '{price:150} per course'). formatPrice() replaces those tokens with the
// amount converted into the active currency.
//
// Adjust the exchange rates here in one place if they drift.
export const CURRENCIES = ['USD', 'GBP', 'RMB']

export const CURRENCY_CONFIG = {
  USD: { symbol: '$', rate: 1, round: 1 },     // base currency, shown exactly
  GBP: { symbol: '£', rate: 0.79, round: 10 }, // rounded to the nearest 10
  RMB: { symbol: '¥', rate: 7.2, round: 100 }, // rounded to the nearest 100
}

// Convert a USD amount into the target currency and apply its rounding step.
export function convertAmount(usd, currency) {
  const { rate, round } = CURRENCY_CONFIG[currency] ?? CURRENCY_CONFIG.USD
  const converted = usd * rate
  return round > 1 ? Math.round(converted / round) * round : Math.round(converted)
}

// Replace every `{price:NNN}` token in a string with the formatted amount.
export function formatPrice(text, currency = 'USD') {
  if (!text) return text
  const { symbol } = CURRENCY_CONFIG[currency] ?? CURRENCY_CONFIG.USD
  return text.replace(/\{price:(\d+(?:\.\d+)?)\}/g, (_, n) => {
    const amount = convertAmount(parseFloat(n), currency)
    return symbol + amount.toLocaleString('en-US')
  })
}
