import { motion } from 'framer-motion'

export default function RazorbillLogo({ className = '' }) {
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4 }}
      viewBox="0 0 400 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Body - sleek black oval */}
      <ellipse cx="200" cy="310" rx="85" ry="140" fill="white" opacity="0.95" />
      <ellipse cx="200" cy="310" rx="85" ry="140" fill="url(#bodyGrad)" />

      {/* Inner white breast */}
      <ellipse cx="200" cy="340" rx="50" ry="100" fill="white" opacity="0.95" />

      {/* Head - round black */}
      <circle cx="200" cy="155" r="65" fill="#111111" />

      {/* Neck connecting head to body */}
      <path
        d="M155 180 Q155 230 140 270 Q150 250 175 240 Q200 235 225 240 Q250 250 260 270 Q245 230 245 180"
        fill="#111111"
      />

      {/* White face stripe - characteristic razorbill marking */}
      <path
        d="M215 125 Q225 135 228 150 Q230 165 225 175 Q218 165 215 150 Q213 140 215 125"
        fill="white"
        opacity="0.9"
      />

      {/* Eye */}
      <circle cx="218" cy="145" r="6" fill="white" />
      <circle cx="219" cy="145" r="3.5" fill="#111111" />
      <circle cx="220" cy="143.5" r="1.2" fill="white" />

      {/* Beak - distinctive thick razorbill beak with white line */}
      <path
        d="M240 155 L280 170 Q285 175 278 180 L240 172 Z"
        fill="#111111"
        stroke="#222"
        strokeWidth="0.5"
      />
      {/* White beak stripe - razorbill signature */}
      <line x1="245" y1="167" x2="275" y2="174" stroke="white" strokeWidth="2.5" opacity="0.9" />

      {/* Wing - black with subtle detail */}
      <path
        d="M125 230 Q110 280 115 350 Q120 390 140 420 Q160 410 170 380 Q180 340 175 280 Q170 240 155 220 Z"
        fill="#1a1a1a"
      />
      <path
        d="M275 230 Q290 280 285 350 Q280 390 260 420 Q240 410 230 380 Q220 340 225 280 Q230 240 245 220 Z"
        fill="#1a1a1a"
      />

      {/* Wing edge highlights */}
      <path
        d="M120 280 Q118 320 125 360"
        stroke="#333"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M280 280 Q282 320 275 360"
        stroke="#333"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />

      {/* Feet */}
      <path
        d="M175 440 L160 475 L150 470 M160 475 L155 480 M175 440 L170 475 L163 478"
        stroke="#333"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M225 440 L240 475 L250 470 M240 475 L245 480 M225 440 L230 475 L237 478"
        stroke="#333"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Subtle glow around the bird */}
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.08" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#111111" />
          <stop offset="40%" stopColor="#111111" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="280" r="200" fill="url(#glow)" />
    </motion.svg>
  )
}
