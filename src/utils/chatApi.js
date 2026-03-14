const SYSTEM_PROMPT = `You are an expert A Level Economics tutor for Cambridge International (CIE) high school students.

Rules:
- Teach clearly and at a high-school level.
- Focus on CIE A Level Economics concepts, diagram logic, exam technique, and evaluation.
- When useful, structure answers as: definition, explanation, diagram guidance, example, and exam tip.
- If the student asks for essay help, provide a concise paragraph plan with evaluation points.
- If the student asks for calculation help, show steps.
- Keep responses accurate, practical, and concise.`

const EXAM_MODE_PROMPT = `Exam mode is enabled.
- Prioritize concise, mark-scheme style responses.
- For long-answer questions, include a short structure: K (knowledge), A (analysis), E (evaluation).
- Add one clear exam tip at the end.`

function getApiConfig() {
  return {
    secureApiUrl: '/api/economics-chat',
    apiUrl: import.meta.env.VITE_OPENROUTER_API_URL || 'https://openrouter.ai/api/v1/chat/completions',
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
    model: import.meta.env.VITE_OPENROUTER_MODEL || 'openai/gpt-4o-mini',
  }
}

function buildMessages(chatHistory, examMode) {
  return [
    { role: 'system', content: SYSTEM_PROMPT },
    ...(examMode ? [{ role: 'system', content: EXAM_MODE_PROMPT }] : []),
    ...chatHistory
      .filter((item) => item.role === 'user' || item.role === 'assistant')
      .map((item) => ({
        role: item.role,
        content: item.content,
        ...(item.imageData ? { imageData: item.imageData } : {}),
      })),
  ]
}

async function requestViaSecureEndpoint(messages) {
  const { secureApiUrl } = getApiConfig()

  const response = await fetch(secureApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  })

  const data = await response.json()

  if (!response.ok) {
    const errorMessage = data?.error || 'AI request failed. Please try again.'
    throw new Error(errorMessage)
  }

  const assistantText = data?.reply
  if (!assistantText) {
    throw new Error('AI returned an empty response. Please try again.')
  }

  return assistantText.trim()
}

async function requestDirectOpenRouter(messages) {
  const { apiUrl, apiKey, model } = getApiConfig()

  if (!apiKey) {
    throw new Error('Chatbot is not configured. The site owner must add a server API key.')
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://aixiom.education',
      'X-Title': 'AiXiom Economics Chat',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.4,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    const errorMessage = data?.error?.message || 'AI request failed. Please try again.'
    throw new Error(errorMessage)
  }

  const assistantText = data?.choices?.[0]?.message?.content
  if (!assistantText) {
    throw new Error('AI returned an empty response. Please try again.')
  }

  return assistantText.trim()
}

export async function sendEconomicsChatMessage(chatHistory, options = {}) {
  const examMode = Boolean(options.examMode)
  const messages = buildMessages(chatHistory, examMode)

  try {
    return await requestViaSecureEndpoint(messages)
  } catch (secureError) {
    // Fallback to direct mode for local development when secure endpoint is unavailable.
    if (import.meta.env.DEV) {
      return requestDirectOpenRouter(messages)
    }

    throw secureError
  }
}