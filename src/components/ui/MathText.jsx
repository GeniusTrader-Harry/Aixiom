import { useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

/**
 * Component that renders text with LaTeX math equations.
 * Supports inline math ($...$) and display math ($$...$$).
 */
export default function MathText({ children }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || typeof children !== 'string') return

    const text = children
    const parts = []
    let lastIndex = 0

    // RegExp to find $...$ (inline) or $$...$$ (display)
    const mathRegex = /(\$\$[^\$]+\$\$|\$[^\$]+\$)/g
    let match

    while ((match = mathRegex.exec(text)) !== null) {
      const isDisplay = match[0].startsWith('$$')
      const mathContent = isDisplay ? match[0].slice(2, -2) : match[0].slice(1, -1)

      // Add text before math
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, match.index),
        })
      }

      // Add math
      parts.push({
        type: 'math',
        content: mathContent,
        display: isDisplay,
      })

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex),
      })
    }

    // Render parts
    containerRef.current.innerHTML = ''
    parts.forEach((part) => {
      if (part.type === 'text') {
        const span = document.createElement('span')
        span.textContent = part.content
        containerRef.current.appendChild(span)
      } else {
        const div = document.createElement('div')
        if (part.display) {
          div.style.margin = '0.5em 0'
          div.style.textAlign = 'center'
        }
        try {
          const html = katex.renderToString(part.content, {
            throwOnError: false,
            displayMode: part.display,
          })
          div.innerHTML = html
        } catch (error) {
          div.textContent = part.content
        }
        containerRef.current.appendChild(div)
      }
    })
  }, [children])

  return <div ref={containerRef} className="whitespace-pre-wrap" />
}
