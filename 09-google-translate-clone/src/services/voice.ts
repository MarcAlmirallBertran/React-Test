import { OpenAI } from 'openai'

const apiKey = import.meta.env.VITE_OPENAI_API_KEY
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true })

export async function textToSpeech(text: string) {
  const response = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'nova',
    input: text,
  })

  return response.arrayBuffer()
}
