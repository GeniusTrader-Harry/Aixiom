import { useState, useRef, useEffect } from 'react'
import { useCurrency } from '../../context/CurrencyContext'
import { CURRENCIES, CURRENCY_CONFIG } from '../../utils/currency'

// Dropdown currency selector. `compact` renders the smaller mobile-sized trigger.
export default function CurrencySelector({ compact = false }) {
  const { currency, setCurrency } = useCurrency()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const triggerPad = compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center justify-center gap-1.5 ${triggerPad} font-semibold rounded-lg border border-white/40 text-white hover:bg-white/10 transition-colors min-w-[56px]`}
        aria-label="Change currency"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {currency}
        <span className={`opacity-70 transition-transform ${open ? 'rotate-180' : ''}`} style={{ fontSize: '0.6em' }}>
          ▼
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-32 rounded-lg border border-white/20 bg-black/95 backdrop-blur-sm shadow-lg shadow-black/30 overflow-hidden z-50"
        >
          {CURRENCIES.map((c) => (
            <li key={c}>
              <button
                role="option"
                aria-selected={c === currency}
                onClick={() => {
                  setCurrency(c)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between px-4 py-2 text-sm text-left transition-colors ${
                  c === currency
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{c}</span>
                <span className="text-gray-400">{CURRENCY_CONFIG[c].symbol}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
