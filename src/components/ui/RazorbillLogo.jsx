import { motion } from 'framer-motion'

export default function RazorbillLogo({ className = '' }) {
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      viewBox="0 0 400 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cccccc" />
        </linearGradient>
        <linearGradient id="darkGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
        <linearGradient id="beakGrad" x1="0" y1="0" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#333333" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
        <filter id="hardShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>

      <g filter="url(#hardShadow)">
        {/* === AGGRESSIVE HEAD SHAPE - angular, predatory === */}
        {/* Main head block - sharp jaw, flat top */}
        <path
          d="M145 100 L160 60 L230 55 L260 80 L270 130 L265 170 L240 185 L160 185 L140 165 L135 130 Z"
          fill="url(#darkGrad)"
        />

        {/* Angular forehead crest - aggressive spike */}
        <path
          d="M160 60 L175 25 L210 15 L235 30 L230 55 L160 60 Z"
          fill="#111"
        />

        {/* === FIERCE EYE === */}
        {/* Eye socket - angular slash */}
        <path
          d="M195 95 L245 85 L250 110 L240 125 L200 128 L190 115 Z"
          fill="#222"
        />
        {/* Eye white - narrow, intense */}
        <path
          d="M200 100 L240 92 L244 108 L236 118 L205 120 L198 112 Z"
          fill="white"
        />
        {/* Iris - sharp */}
        <circle cx="222" cy="106" r="10" fill="#111" />
        {/* Pupil slit */}
        <ellipse cx="222" cy="106" rx="4" ry="9" fill="#000" />
        {/* Eye glint - cold */}
        <circle cx="226" cy="102" r="3" fill="white" opacity="0.9" />
        {/* Brow line - scowling */}
        <path
          d="M190 92 L250 80"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* === MASSIVE BEAK - thick, bladed === */}
        {/* Upper beak - heavy, hooked */}
        <path
          d="M265 120 L340 138 L355 150 L350 158 L330 162 L265 155 Z"
          fill="url(#beakGrad)"
        />
        {/* Lower beak - strong jaw */}
        <path
          d="M260 160 L330 165 L345 158 L350 158 L330 172 L260 175 Z"
          fill="#222"
        />
        {/* Beak tip hook */}
        <path
          d="M340 138 L360 145 L355 150 L350 158 L345 158 L340 148 Z"
          fill="#111"
        />
        {/* White beak stripe - razorbill signature, aggressive slash */}
        <path
          d="M270 140 L340 152"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="square"
        />
        {/* Beak ridge line */}
        <path
          d="M265 125 L345 142"
          stroke="#333"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* === WHITE FACE SLASH - war paint === */}
        <path
          d="M245 88 L258 75 L265 80 L255 120 L250 130 L242 120 Z"
          fill="white"
          opacity="0.85"
        />

        {/* === NECK - thick, muscular === */}
        <path
          d="M140 170 L130 220 L125 280 L145 290 L200 295 L255 290 L275 280 L270 220 L260 170 L240 185 L160 185 Z"
          fill="url(#darkGrad)"
        />

        {/* === CHEST - white shield shape === */}
        <path
          d="M155 260 L155 340 L165 390 L200 420 L235 390 L245 340 L245 260 L220 245 L180 245 Z"
          fill="url(#bodyGrad)"
        />

        {/* === WINGS - spread wide, sharp edges === */}
        {/* Left wing - swept back, blade-like */}
        <path
          d="M130 220 L80 250 L40 310 L35 350 L55 380 L90 390 L120 380 L140 340 L145 290 Z"
          fill="#111"
        />
        {/* Left wing feather edges */}
        <path d="M55 340 L40 355" stroke="#333" strokeWidth="2" />
        <path d="M70 350 L55 370" stroke="#333" strokeWidth="2" />
        <path d="M85 360 L72 380" stroke="#333" strokeWidth="2" />
        <path d="M100 370 L90 388" stroke="#333" strokeWidth="2" />
        
        {/* Right wing */}
        <path
          d="M270 220 L320 250 L360 310 L365 350 L345 380 L310 390 L280 380 L260 340 L255 290 Z"
          fill="#111"
        />
        {/* Right wing feather edges */}
        <path d="M345 340 L360 355" stroke="#333" strokeWidth="2" />
        <path d="M330 350 L345 370" stroke="#333" strokeWidth="2" />
        <path d="M315 360 L328 380" stroke="#333" strokeWidth="2" />
        <path d="M300 370 L310 388" stroke="#333" strokeWidth="2" />

        {/* Wing edge highlights */}
        <path
          d="M80 260 L42 325 L38 350"
          stroke="white"
          strokeWidth="1.5"
          opacity="0.15"
          fill="none"
        />
        <path
          d="M320 260 L358 325 L362 350"
          stroke="white"
          strokeWidth="1.5"
          opacity="0.15"
          fill="none"
        />

        {/* === TALONS - sharp, gripping === */}
        {/* Left foot */}
        <path
          d="M170 415 L155 455 L140 465 M155 455 L145 472 M155 455 L152 475"
          stroke="#ccc"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M140 465 L132 468" stroke="#ccc" strokeWidth="3" strokeLinecap="round" />
        <path d="M145 472 L137 476" stroke="#ccc" strokeWidth="3" strokeLinecap="round" />
        <path d="M152 475 L146 480" stroke="#ccc" strokeWidth="3" strokeLinecap="round" />

        {/* Right foot */}
        <path
          d="M230 415 L245 455 L260 465 M245 455 L255 472 M245 455 L248 475"
          stroke="#ccc"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M260 465 L268 468" stroke="#ccc" strokeWidth="3" strokeLinecap="round" />
        <path d="M255 472 L263 476" stroke="#ccc" strokeWidth="3" strokeLinecap="round" />
        <path d="M248 475 L254 480" stroke="#ccc" strokeWidth="3" strokeLinecap="round" />
      </g>
    </motion.svg>
  )
}
