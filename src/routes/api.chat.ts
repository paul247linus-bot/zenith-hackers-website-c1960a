import { createFileRoute } from '@tanstack/react-router'
import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import { services, site } from '@/lib/site'

const input = z.object({
  messages: z
    .array(z.object({ role: z.enum(['user', 'assistant']), content: z.string().trim().min(1).max(2000) }))
    .min(1)
    .max(20),
})

const system = `You are "Zara", the virtual assistant for ${site.name} — a London private investigations and ethical hacking firm.
Office: ${site.address}. Phone: ${site.phone}. Email: ${site.email}. WhatsApp is available via the green button on the site.
Services: ${services.map((s) => `${s.name} — ${s.summary}`).join(' | ')}.
Guidelines:
- Be warm, concise (2–4 short paragraphs max) and professional. Use British English.
- Help visitors understand services, what information to prepare (e.g. wallet addresses, transaction IDs, timelines, screenshots), and how to book a confidential consultation via the Contact page, phone, email or WhatsApp.
- The firm only performs lawful, authorised work. Politely decline requests to hack into someone else's accounts, phones, email or devices, spy on partners, change grades, or anything illegal; suggest lawful alternatives.
- Never guarantee recovery of funds or outcomes. For fraud victims, recommend also reporting to Action Fraud (UK) or local police, and warn about "recovery scams" that demand upfront fees.
- Do not give definitive legal advice; explain that the firm works with qualified solicitors and counsel.
- Never invent prices; say quotes are provided after a free consultation.`

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown
        try {
          body = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }
        const parsed = input.safeParse(body)
        if (!parsed.success) return Response.json({ error: 'Invalid message' }, { status: 400 })

        const messages = parsed.data.messages
        // The API requires the conversation to start with a user turn.
        while (messages.length && messages[0].role !== 'user') messages.shift()

        try {
          const anthropic = new Anthropic()
          const stream = anthropic.messages.stream({
            model: 'claude-haiku-5-5',
            max_tokens: 700,
            system,
            messages,
          })
          const encoder = new TextEncoder()
          const readable = new ReadableStream({
            async start(controller) {
              try {
                for await (const event of stream) {
                  if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
                    controller.enqueue(encoder.encode(event.delta.text))
                  }
                }
              } catch {
                controller.enqueue(encoder.encode('\n\nSorry — I lost the connection. Please try again or contact us directly.'))
              }
              controller.close()
            },
          })
          return new Response(readable, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
          })
        } catch {
          return Response.json({ error: 'The assistant is unavailable right now.' }, { status: 502 })
        }
      },
    },
  },
})
