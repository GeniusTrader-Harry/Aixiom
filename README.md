# Aixiom Education
This is for Aixiom Education

## AI Chatbox Setup (A Level Economics CIE)

The website includes a dedicated AI chat page at `/ai-chat`.

### For Students

Students should not add any API key. They just click the top-right `AI Chat` button and start asking questions.

### For Site Owner (recommended)

Set server-side environment variables in your deployment platform (for example Netlify):

```bash
OPENROUTER_API_KEY=your_key_here
OPENROUTER_MODEL=openai/gpt-4o-mini
OPENROUTER_API_URL=https://openrouter.ai/api/v1/chat/completions
PUBLIC_SITE_URL=https://your-domain.com
```

The frontend sends requests to `/api/economics-chat`, which is handled by the Netlify function at `netlify/functions/economics-chat.js`.

### Local Development

1. Copy `.env.example` to `.env`.
2. Optionally add `VITE_OPENROUTER_API_KEY` only for local fallback testing.

```bash
VITE_OPENROUTER_API_KEY=your_key_here
```

3. Start the app:

```bash
npm install
npm run dev
```

Users can open the AI chat from the top-right `AI Chat` button in the header.

### Built-in Chat Features

- Exam Mode toggle for mark-scheme style answers.
- Persistent chat history in browser local storage.
- Export chat to `.txt` revision notes.
