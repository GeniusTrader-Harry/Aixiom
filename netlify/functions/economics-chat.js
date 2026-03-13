const DEFAULT_MODEL = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini'
const OPENROUTER_URL = process.env.OPENROUTER_API_URL || 'https://openrouter.ai/api/v1/chat/completions'

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  if (!process.env.OPENROUTER_API_KEY) {
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

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.PUBLIC_SITE_URL || 'https://aixiom.education',
        'X-Title': 'AiXiom Economics Chat',
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages,
        temperature: 0.4,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data?.error?.message || 'Upstream AI request failed.' }),
      }
    }

    const reply = data?.choices?.[0]?.message?.content
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
