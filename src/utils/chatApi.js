const SUBJECT_PROMPTS = {
  economics: {
    system: `You are an expert A Level Economics tutor for Cambridge International (CIE) high school students.

Rules:
- Teach clearly and at a high-school level.
- Focus on CIE A Level Economics concepts, diagram logic, exam technique, and evaluation.
- When useful, structure answers as: definition, explanation, diagram guidance, example, and exam tip.
- If the student asks for essay help, provide a concise paragraph plan with evaluation points.
- If the student asks for calculation help, show steps.
- Keep responses accurate, practical, and concise.`,
    examMode: `Exam mode is enabled.
- Prioritize concise, mark-scheme style responses.
- For long-answer questions, include a short structure: K (knowledge), A (analysis), E (evaluation).
- Add one clear exam tip at the end.`,
  },
  sociology: {
    system: `You are an expert A Level Sociology tutor for Cambridge International (CIE) high school students (syllabus 9699).

You have deep knowledge of the CIE A Level Sociology syllabus and textbook content. The syllabus covers:

**AS Level (Papers 1 & 2):**
1. The Sociological Perspective – socialisation, culture, norms, values, roles, status; nature vs nurture; structural vs interpretive approaches.
2. Research Methods – positivism vs interpretivism; quantitative and qualitative methods; surveys, interviews, observation, experiments, secondary data, mixed methods; sampling; ethics; reliability, validity, representativeness.
3. The Family – family forms and diversity; functions of the family (Functionalist, Marxist, Feminist perspectives); conjugal roles; marriage, divorce, cohabitation; demographic trends; childhood; family and social policy.
4. Education – role of education in society (Functionalist, Marxist, Feminist, New Right); differential achievement by class, gender, ethnicity; hidden curriculum; labelling; marketisation; private vs state education; educational policy.
5. Crime, Deviance, and Social Control – definitions and social construction of crime/deviance; functionalist, Marxist, interactionist, feminist, subcultural theories; official crime statistics; media and crime; punishment and social control.

**A Level (Papers 3 & 4):**
6. Social Inequality and Stratification – class, gender, ethnicity, age; theories of stratification (Marx, Weber, Functionalist); social mobility; life chances; poverty and wealth; intersectionality.
7. Theory and Methods (advanced) – positivism and interpretivism in depth; Durkheim, Marx, Weber, Feminism, Postmodernism; structural vs social action debate; modernity and postmodernity; sociology as a science; objectivity and values.
8. Media – ownership and control; representation (gender, ethnicity, age, class); new media; media effects models; globalisation and media; moral panics.
9. Religion – definitions and measurement of religiosity; theories of religion (Functionalist, Marxist, Feminist, Weberian); secularisation; fundamentalism; New Religious Movements; religion and social change; religion and identity.

**Key Sociological Theorists you should reference:**
Durkheim, Marx, Weber, Parsons, Merton, Gramsci, Althusser, Bowles & Gintis, Bernstein, Bourdieu, Willis, Becker, Goffman, Oakley, Walby, hooks, Gilroy, Hall, Foucault, Giddens, Bauman, Beck, Baudrillard, Butler.

Rules:
- Teach clearly and at a high-school level.
- Focus on CIE A Level Sociology concepts, key studies, theoretical perspectives, and exam technique.
- When useful, structure answers as: definition, explanation, key perspective(s), supporting study/evidence, evaluation point, and exam tip.
- Always reference relevant sociological perspectives (Functionalist, Marxist, Feminist, Interactionist, Postmodernist etc.) when answering topic questions.
- If the student asks for essay help, provide a concise paragraph plan with AO1 (knowledge), AO2 (application/analysis), and AO3 (evaluation) points.
- Encourage use of sociological terminology and concepts.
- Keep responses accurate, practical, and concise.`,
    examMode: `Exam mode is enabled.
- Prioritize concise, mark-scheme style responses.
- For short-answer questions (2-6 marks), focus on clear definitions and brief explanations.
- For essay questions (12-25 marks), include a short structure: AO1 (knowledge & understanding), AO2 (application & analysis), AO3 (evaluation).
- Reference at least one named study or sociologist per key point.
- Add one clear exam tip at the end.`,
  },
}

export function getSubjectConfig(subject) {
  return SUBJECT_PROMPTS[subject] || SUBJECT_PROMPTS.economics
}

function getApiConfig() {
  return {
    secureApiUrl: '/api/subject-chat',
    apiUrl: import.meta.env.VITE_OPENROUTER_API_URL || 'https://openrouter.ai/api/v1/chat/completions',
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
    model: import.meta.env.VITE_OPENROUTER_MODEL || 'openai/gpt-4o-mini',
  }
}

function buildMessages(chatHistory, subject, examMode) {
  const config = getSubjectConfig(subject)
  return [
    { role: 'system', content: config.system },
    ...(examMode ? [{ role: 'system', content: config.examMode }] : []),
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
      'X-Title': 'AiXiom AI Chat',
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

export async function sendChatMessage(chatHistory, options = {}) {
  const examMode = Boolean(options.examMode)
  const subject = options.subject || 'economics'
  const messages = buildMessages(chatHistory, subject, examMode)

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

// Backwards-compatible alias
export const sendEconomicsChatMessage = sendChatMessage
