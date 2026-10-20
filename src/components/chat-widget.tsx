import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Bot, Loader2, Send, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const greeting: Message = {
  role: 'assistant',
  content: `Hello, I'm Zara, the ${site.name} assistant. How can I help with your case today? Everything you share here is treated confidentially.`,
}

const suggestions = ['I lost crypto to a scam', 'Do you do penetration testing?', 'How do I book a consultation?']

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([greeting])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight })
  }, [messages, open])

  async function send(text: string) {
    const content = text.trim()
    if (!content || pending) return
    const history = [...messages, { role: 'user' as const, content }]
    setMessages([...history, { role: 'assistant', content: '' }])
    setInput('')
    setPending(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.slice(-20) }),
      })
      if (!res.ok || !res.body) throw new Error('Request failed')
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let reply = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        reply += decoder.decode(value, { stream: true })
        setMessages([...history, { role: 'assistant', content: reply }])
      }
      if (!reply) throw new Error('Empty reply')
    } catch {
      setMessages([
        ...history,
        {
          role: 'assistant',
          content: `Sorry, I couldn't respond just now. You can reach our team on ${site.phone}, by email at ${site.email}, or via WhatsApp.`,
        },
      ])
    } finally {
      setPending(false)
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    void send(input)
  }

  return (
    <>
      {open && (
        <section
          aria-label="AI assistant chat"
          className="fixed bottom-24 left-4 z-50 flex h-[min(560px,calc(100svh-8rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/50 animate-in fade-in slide-in-from-bottom-4 motion-reduce:animate-none"
        >
          <header className="flex items-center justify-between border-b border-border bg-secondary px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
                <Bot className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-lg leading-none font-semibold uppercase tracking-wide">Zara · AI Assistant</p>
                <p className="mt-1 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden /> Online 24/7
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close chat">
              <X />
            </Button>
          </header>
          <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  'max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap',
                  m.role === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted text-foreground',
                )}
              >
                {m.content || <Loader2 className="size-4 animate-spin text-muted-foreground" aria-label="Typing" />}
              </div>
            ))}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
          <form onSubmit={onSubmit} className="flex gap-2 border-t border-border p-3">
            <label htmlFor="chat-input" className="sr-only">Message</label>
            <input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              maxLength={2000}
              autoComplete="off"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button type="submit" size="icon" disabled={pending || !input.trim()} aria-label="Send message">
              <Send />
            </Button>
          </form>
        </section>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        className="fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full bg-primary p-3.5 text-primary-foreground shadow-lg shadow-black/40 transition-transform hover:scale-105 motion-reduce:transition-none"
      >
        {open ? <X className="size-7" aria-hidden /> : <Bot className="size-7" aria-hidden />}
        <span className="hidden pr-1 text-sm font-semibold sm:inline">{open ? 'Close' : 'Ask Zara'}</span>
      </button>
    </>
  )
}
