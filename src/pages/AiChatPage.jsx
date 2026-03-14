import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { sendEconomicsChatMessage } from '../utils/chatApi'

const CHAT_STORAGE_KEY = 'aixiom_cie_econ_chat_v1'
const CHAT_SETTINGS_KEY = 'aixiom_cie_econ_chat_settings_v1'

const STARTER_PROMPTS = [
  'Explain price elasticity of demand with a real example.',
  'How do I evaluate a maximum price policy in a 12-mark question?',
  'Give me a short plan for an essay on inflation causes and consequences.',
]

const INITIAL_MESSAGE = {
  id: 'assistant-welcome',
  role: 'assistant',
  content:
    'Hi, I am your CIE A Level Economics AI tutor. Ask me about theory, diagrams, essays, calculations, or exam technique. You can also upload an image of a question or diagram.',
}

function createMessage(role, content, imageData = null) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    ...(imageData ? { imageData } : {}),
  }
}

export default function AiChatPage() {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY)
      if (!saved) return [INITIAL_MESSAGE]
      const parsed = JSON.parse(saved)
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : [INITIAL_MESSAGE]
    } catch {
      return [INITIAL_MESSAGE]
    }
  })
  const [examMode, setExamMode] = useState(() => {
    try {
      const saved = localStorage.getItem(CHAT_SETTINGS_KEY)
      if (!saved) return false
      const parsed = JSON.parse(saved)
      return Boolean(parsed?.examMode)
    } catch {
      return false
    }
  })
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const fileInputRef = useRef(null)

  const canSend = useMemo(
    () => (inputValue.trim().length > 0 || selectedImage !== null) && !isLoading,
    [inputValue, selectedImage, isLoading],
  )

  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    localStorage.setItem(CHAT_SETTINGS_KEY, JSON.stringify({ examMode }))
  }, [examMode])

  const exportChatAsNotes = () => {
    const stamp = new Date().toISOString().slice(0, 10)
    const header = `AiXiom CIE Economics Chat Notes (${stamp})\n\n`
    const body = messages
      .map((message) => `${message.role === 'user' ? 'Student' : 'Tutor'}: ${message.content}`)
      .join('\n\n')

    const blob = new Blob([header + body], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `aixiom-cie-econ-notes-${stamp}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE])
    setError('')
    setSelectedImage(null)
  }

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target.result
      const base64 = dataUrl.split(',')[1]
      setSelectedImage({ base64, mimeType: file.type, previewUrl: dataUrl })
    }
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const sendMessage = async (rawText, image = selectedImage) => {
    const text = rawText.trim()
    if ((!text && !image) || isLoading) return

    setError('')
    const userMessage = createMessage('user', text, image)
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInputValue('')
    setSelectedImage(null)
    setIsLoading(true)

    try {
      const aiReply = await sendEconomicsChatMessage(nextMessages, { examMode })
      setMessages((prev) => [...prev, createMessage('assistant', aiReply)])
    } catch (err) {
      const fallbackError = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(fallbackError)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage(inputValue)
  }

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">A Level Economics CIE AI Chat</h1>
              <p className="text-gray-400 mt-2">Built for high school students: clear explanations, diagram support, and exam-focused answers.</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <label className="inline-flex items-center gap-2 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={examMode}
                    onChange={(event) => setExamMode(event.target.checked)}
                    className="h-4 w-4 rounded border-gray-700 bg-black text-white"
                  />
                  Exam Mode (mark-scheme style)
                </label>
                <button
                  type="button"
                  onClick={exportChatAsNotes}
                  className="px-3 py-1.5 text-sm rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500"
                >
                  Export Notes
                </button>
                <button
                  type="button"
                  onClick={clearChat}
                  className="px-3 py-1.5 text-sm rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500"
                >
                  Clear Chat
                </button>
              </div>
            </div>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
            >
              Back Home
            </Link>
          </div>

          <div className="bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
            <div className="p-4 md:p-6 border-b border-gray-800 bg-gray-900/60">
              <p className="text-sm text-gray-300">Try a prompt:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt, null)}
                    disabled={isLoading}
                    className="px-3 py-2 text-sm rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[55vh] overflow-y-auto p-4 md:p-6 space-y-4 bg-gradient-to-b from-black to-gray-950">
              {messages.map((message) => {
                const isUser = message.role === 'user'
                return (
                  <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? 'bg-white text-black'
                          : 'bg-gray-900 border border-gray-800 text-gray-100'
                      }`}
                    >
                      {message.imageData && (
                        <img
                          src={`data:${message.imageData.mimeType};base64,${message.imageData.base64}`}
                          alt="Uploaded"
                          className="max-w-full rounded-lg mb-2 max-h-64 object-contain"
                        />
                      )}
                      {message.content}
                    </div>
                  </div>
                )
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl px-4 py-3 text-sm md:text-base bg-gray-900 border border-gray-800 text-gray-300">
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-4 md:p-6 border-t border-gray-800 bg-gray-900/60">
              <label htmlFor="economics-chat-input" className="sr-only">
                Ask your economics question
              </label>

              {selectedImage && (
                <div className="mb-3 relative inline-block">
                  <img
                    src={selectedImage.previewUrl}
                    alt="Selected"
                    className="max-h-32 rounded-lg border border-gray-700 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-2 -right-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex flex-col gap-2">
                  <textarea
                    id="economics-chat-input"
                    rows={3}
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    placeholder="Ask anything about CIE A Level Economics..."
                    className="w-full resize-none rounded-xl bg-black border border-gray-700 focus:border-white focus:outline-none text-gray-100 px-4 py-3"
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault()
                        if (canSend) {
                          sendMessage(inputValue)
                        }
                      }
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isLoading}
                      className="px-3 py-1.5 text-sm rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      + Image
                    </button>
                    <span className="text-xs text-gray-600">Upload a question or diagram</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!canSend}
                  className="sm:self-start sm:mt-0 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
              {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
              <p className="mt-3 text-xs text-gray-500">
                Students do not need an API key. The site owner should configure a secure server key.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
