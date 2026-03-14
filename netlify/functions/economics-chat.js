const DEFAULT_MODEL = process.env.GOOGLE_AI_MODEL || 'gemini-2.0-flash'

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  if (!process.env.GOOGLE_AI_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server AI key is not configured.' }),
    }
  }

  try {
    const parsed = JSON.parse(event.body || '{}')
    const messages = Array.isArray(parsed.messages) ? parsed.messages : []

    if (messages.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing chat messages.' }),
      }
    }

    // Extract system messages and conversation messages
    const systemParts = messages
      .filter((m) => m.role === 'system')
      .map((m) => ({ text: m.content }))

    const contents = messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }))

    const requestBody = {
      contents,
      generationConfig: { temperature: 0.4 },
    }

    if (systemParts.length > 0) {
      requestBody.system_instruction = { parts: systemParts }
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${DEFAULT_MODEL}:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data?.error?.message || 'Upstream AI request failed.' }),
      }
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!reply) {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'AI returned an empty response.' }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unexpected server error while handling chat.' }),
    }
  }
}
