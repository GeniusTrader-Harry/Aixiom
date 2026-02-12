import { motion } from 'framer-motion'

export default function RazorbillLogo({ className = '' }) {
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      viewBox="0 0 400 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Head gradient - dark brown/black like the photo */}
        <radialGradient id="headGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#3d3530" />
          <stop offset="60%" stopColor="#2a2420" />
          <stop offset="100%" stopColor="#1a1612" />
        </radialGradient>
        {/* Body dark gradient */}
        <radialGradient id="bodyDarkGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#2e2822" />
          <stop offset="100%" stopColor="#1a1612" />
        </radialGradient>
        {/* White breast gradient */}
        <radialGradient id="breastGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f0ece8" />
          <stop offset="100%" stopColor="#d8d0c8" />
        </radialGradient>
        {/* Beak gradient - bluish gray like the photo */}
        <linearGradient id="beakGrad" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#6e7580" />
          <stop offset="50%" stopColor="#5a6068" />
          <stop offset="100%" stopColor="#484e55" />
        </linearGradient>
        {/* Subtle background vignette */}
        <radialGradient id="bgGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#333" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        {/* Feather texture filter */}
        <filter id="softBlur">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
        <filter id="shadow">
          <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Background glow */}
      <ellipse cx="200" cy="300" rx="200" ry="280" fill="url(#bgGlow)" />

      <g filter="url(#shadow)">

        {/* ========== WHITE BREAST / CHEST ========== */}
        {/* Large white front - visible below and to the right like in the photo */}
        <path
          d="M160 350 
             Q140 370 135 400 
             Q130 440 140 480 
             Q155 530 200 550 
             Q245 530 260 480 
             Q270 440 265 400 
             Q260 370 240 350 
             Q220 340 200 338 
             Q180 340 160 350 Z"
          fill="url(#breastGrad)"
        />
        {/* Breast shading - subtle shadow on left side */}
        <path
          d="M160 350 Q140 370 135 400 Q130 440 140 480 Q150 500 165 515"
          stroke="#c0b8ae"
          strokeWidth="8"
          fill="none"
          opacity="0.3"
          filter="url(#softBlur)"
        />

        {/* ========== DARK BODY / WINGS (sides) ========== */}
        {/* Left dark wing/body side */}
        <path
          d="M120 250 
             Q90 280 75 320 
             Q65 360 70 400 
             Q75 440 90 470 
             Q110 500 135 510 
             Q140 480 135 400 
             Q140 360 160 340 
             Q155 310 145 280 Z"
          fill="url(#bodyDarkGrad)"
        />
        {/* Right dark wing/body side */}
        <path
          d="M280 250 
             Q310 280 325 320 
             Q335 360 330 400 
             Q325 440 310 470 
             Q290 500 265 510 
             Q260 480 265 400 
             Q260 360 240 340 
             Q245 310 255 280 Z"
          fill="url(#bodyDarkGrad)"
        />

        {/* ========== NECK ========== */}
        <path
          d="M145 230 
             Q135 260 130 290 
             Q128 320 135 345 
             Q155 330 200 325 
             Q245 330 265 345 
             Q272 320 270 290 
             Q265 260 255 230 
             Q230 245 200 248 
             Q170 245 145 230 Z"
          fill="url(#bodyDarkGrad)"
        />

        {/* ========== HEAD ========== */}
        {/* Main head shape - rounded dome, front-facing */}
        <path
          d="M130 140 
             Q125 100 140 70 
             Q160 40 200 32 
             Q240 40 260 70 
             Q275 100 270 140 
             Q268 180 260 210 
             Q245 240 200 248 
             Q155 240 140 210 
             Q132 180 130 140 Z"
          fill="url(#headGrad)"
        />

        {/* Head top highlight - subtle light catch */}
        <ellipse cx="200" cy="65" rx="35" ry="15" fill="#3d3530" opacity="0.5" filter="url(#softBlur)" />

        {/* Forehead feather texture lines */}
        <path d="M175 55 Q200 48 225 55" stroke="#2a2420" strokeWidth="0.8" fill="none" opacity="0.4" />
        <path d="M168 65 Q200 56 232 65" stroke="#2a2420" strokeWidth="0.8" fill="none" opacity="0.4" />
        <path d="M162 78 Q200 66 238 78" stroke="#2a2420" strokeWidth="0.8" fill="none" opacity="0.3" />

        {/* ========== EYES - narrow, front-facing, squinting ========== */}
        {/* Left eye area - dark socket */}
        <ellipse cx="168" cy="130" rx="18" ry="8" fill="#1a1410" transform="rotate(-5 168 130)" />
        {/* Left eye slit - barely open, menacing */}
        <path
          d="M153 129 Q160 123 170 122 Q180 123 183 129 Q180 133 170 134 Q160 133 153 129 Z"
          fill="#111"
        />
        {/* Left iris glimpse */}
        <ellipse cx="170" cy="128.5" rx="6" ry="4" fill="#1c1c1c" />
        {/* Left eye glint */}
        <circle cx="172" cy="127" r="1.8" fill="white" opacity="0.6" />
        {/* Left eyelid crease */}
        <path d="M152 126 Q168 118 185 126" stroke="#2a2420" strokeWidth="1.2" fill="none" opacity="0.6" />

        {/* Right eye area */}
        <ellipse cx="232" cy="130" rx="18" ry="8" fill="#1a1410" transform="rotate(5 232 130)" />
        {/* Right eye slit */}
        <path
          d="M217 129 Q220 123 230 122 Q240 123 247 129 Q240 133 230 134 Q220 133 217 129 Z"
          fill="#111"
        />
        {/* Right iris glimpse */}
        <ellipse cx="230" cy="128.5" rx="6" ry="4" fill="#1c1c1c" />
        {/* Right eye glint */}
        <circle cx="232" cy="127" r="1.8" fill="white" opacity="0.6" />
        {/* Right eyelid crease */}
        <path d="M215 126 Q232 118 248 126" stroke="#2a2420" strokeWidth="1.2" fill="none" opacity="0.6" />

        {/* ========== BEAK - front-facing, thick, with white line ========== */}
        {/* Beak base / cere area - where beak meets face */}
        <path
          d="M182 155 Q190 148 200 146 Q210 148 218 155 Q215 158 200 160 Q185 158 182 155 Z"
          fill="#3a3530"
        />

        {/* Left beak half */}
        <path
          d="M182 158 
             Q180 170 178 185 
             Q176 200 180 215 
             Q185 228 195 235 
             Q198 237 200 238 
             Q200 220 198 200 
             Q197 180 198 160 
             Q192 158 182 158 Z"
          fill="url(#beakGrad)"
        />
        {/* Right beak half */}
        <path
          d="M218 158 
             Q220 170 222 185 
             Q224 200 220 215 
             Q215 228 205 235 
             Q202 237 200 238 
             Q200 220 202 200 
             Q203 180 202 160 
             Q208 158 218 158 Z"
          fill="url(#beakGrad)"
        />

        {/* Beak center groove / ridge */}
        <path
          d="M200 160 Q200 190 200 220 Q200 232 200 238"
          stroke="#3e444a"
          strokeWidth="2"
          fill="none"
        />

        {/* Beak nostril area - subtle */}
        <ellipse cx="190" cy="168" rx="4" ry="2.5" fill="#4a5058" opacity="0.5" transform="rotate(-10 190 168)" />
        <ellipse cx="210" cy="168" rx="4" ry="2.5" fill="#4a5058" opacity="0.5" transform="rotate(10 210 168)" />

        {/* ========== WHITE BEAK LINE - the razorbill's signature ========== */}
        {/* Horizontal white line across upper beak - very prominent in the photo */}
        <path
          d="M178 162 Q185 159 200 157 Q215 159 222 162"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        {/* Second subtle white line near beak tip */}
        <path
          d="M188 178 Q194 176 200 175 Q206 176 212 178"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
          strokeLinecap="round"
        />

        {/* Beak edge highlights */}
        <path
          d="M180 170 Q178 195 182 220"
          stroke="#7a8088"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M220 170 Q222 195 218 220"
          stroke="#7a8088"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />

        {/* Beak tip - slightly darker */}
        <path
          d="M192 230 Q200 240 208 230 Q205 235 200 238 Q195 235 192 230 Z"
          fill="#3a4048"
        />

        {/* ========== FACE FEATHER DETAILS ========== */}
        {/* Cheek feathering lines - subtle texture around beak */}
        <path d="M170 150 Q175 155 180 158" stroke="#2e2822" strokeWidth="0.8" fill="none" opacity="0.3" />
        <path d="M230 150 Q225 155 220 158" stroke="#2e2822" strokeWidth="0.8" fill="none" opacity="0.3" />

        {/* Under-beak shadow */}
        <ellipse cx="200" cy="242" rx="15" ry="5" fill="#1a1612" opacity="0.3" filter="url(#softBlur)" />

        {/* Chin / throat feathers below beak */}
        <path
          d="M185 240 Q190 250 200 255 Q210 250 215 240"
          stroke="#2a2420"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />

        {/* ========== BODY FEATHER TEXTURE ========== */}
        {/* Dark body feather lines */}
        <path d="M100 340 Q120 335 140 340" stroke="#24201a" strokeWidth="0.8" fill="none" opacity="0.3" />
        <path d="M90 370 Q115 365 135 370" stroke="#24201a" strokeWidth="0.8" fill="none" opacity="0.3" />
        <path d="M260 340 Q280 335 300 340" stroke="#24201a" strokeWidth="0.8" fill="none" opacity="0.3" />
        <path d="M265 370 Q285 365 310 370" stroke="#24201a" strokeWidth="0.8" fill="none" opacity="0.3" />

        {/* White breast feather texture */}
        <path d="M170 400 Q200 395 230 400" stroke="#e0d8d0" strokeWidth="0.6" fill="none" opacity="0.3" />
        <path d="M165 430 Q200 425 235 430" stroke="#e0d8d0" strokeWidth="0.6" fill="none" opacity="0.3" />
        <path d="M170 460 Q200 455 230 460" stroke="#e0d8d0" strokeWidth="0.6" fill="none" opacity="0.3" />

        {/* Boundary between dark and white - soft edge */}
        <path
          d="M130 340 Q145 355 160 350 Q180 342 200 338 Q220 342 240 350 Q255 355 270 340"
          stroke="#2a2420"
          strokeWidth="2"
          fill="none"
          opacity="0.2"
          filter="url(#softBlur)"
        />
      </g>
    </motion.svg>
  )
}
