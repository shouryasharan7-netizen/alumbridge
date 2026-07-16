// Gemini 2.5 Flash API integration for AlumBridge AI chatbot
// Falls back to rule-based chatEngine if API key is missing or call fails
// Rate limits (free tier): ~10-15 RPM, 1500 RPD

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`

/**
 * Ask Gemini API a question in the context of an alumni persona
 * @param {string} question - The student's question
 * @param {object|null} alumniContext - Optional alumni data for persona
 * @returns {Promise<string|null>} - Response text or null if failed
 */
export async function askGemini(question, alumniContext = null) {
  if (!GEMINI_API_KEY) {
    console.info('[Gemini] No API key configured (VITE_GEMINI_API_KEY). Using fallback.')
    return null
  }

  let systemPrompt = `You are AlumBridge AI, a helpful assistant for students exploring undergraduate programs worldwide. You have access to data from verified alumni across multiple universities and countries. Be concise, factual, and encouraging. Use specific data points when possible. Keep responses under 200 words unless asked for detail.`

  if (alumniContext) {
    const { name, currentRole, company, university, expertise, graduationYear } = alumniContext
    systemPrompt = `You are ${name}, a ${currentRole} at ${company}. You graduated from ${university} in ${graduationYear || 'recent years'}. Your expertise: ${expertise?.join(', ') || 'general guidance'}. Answer as this person using their perspective and expertise. Be authentic, specific, and helpful. Keep responses under 200 words.`
  }

  try {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: question }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 512,
        },
      }),
    })

    if (!response.ok) {
      console.warn(`[Gemini] API error: ${response.status} ${response.statusText}`)
      return null
    }

    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      console.warn('[Gemini] No text in response')
      return null
    }

    return text
  } catch (err) {
    console.warn('[Gemini] Fetch failed:', err.message)
    return null
  }
}

/**
 * Check if Gemini API is available (has a key configured)
 */
export function isGeminiAvailable() {
  return !!GEMINI_API_KEY
}
