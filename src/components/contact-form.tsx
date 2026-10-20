import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { services } from '@/lib/site'

type State = 'idle' | 'pending' | 'success' | 'error'

export function ContactForm() {
  const [state, setState] = useState<State>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const body = new URLSearchParams()
    new FormData(event.currentTarget).forEach((value, key) => body.append(key, String(value)))
    setState('pending')
    try {
      const response = await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('Submission failed')
      const isUnprocessedRegistration = /\bdata-netlify\s*=/i.test(await response.text())
      if (isUnprocessedRegistration) throw new Error('Form handling is unavailable')
      setState('success')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div role="status" className="rounded-lg border border-primary/40 bg-card p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-primary" aria-hidden />
        <h2 className="mt-4 text-3xl font-bold uppercase">Message received</h2>
        <p className="mt-2 text-muted-foreground">
          Thank you. An investigator will contact you within one business day. For urgent matters, call or WhatsApp us.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setState('idle')}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form
      name="contact"
      method="POST"
      action="/contact-form.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      onChange={() => {
        if (state === 'error') setState('idle')
      }}
      className="rounded-lg border border-border bg-card p-6 md:p-8"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>
          Leave empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <fieldset disabled={state === 'pending'} className="space-y-5">
        <legend className="mb-2 font-display text-3xl font-bold uppercase">Request a confidential consultation</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="cf-name">Full name</Label>
            <Input id="cf-name" name="name" autoComplete="name" required maxLength={100} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cf-email">Email</Label>
            <Input id="cf-email" name="email" type="email" autoComplete="email" required maxLength={254} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cf-phone">Phone / WhatsApp (optional)</Label>
            <Input id="cf-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cf-service">Service</Label>
            <select
              id="cf-service"
              name="service"
              defaultValue="General enquiry"
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option>General enquiry</option>
              {services.map((s) => (
                <option key={s.slug}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cf-message">How can we help?</Label>
          <Textarea
            id="cf-message"
            name="message"
            required
            maxLength={4000}
            rows={6}
            placeholder="Briefly describe your situation. Please don't send passwords or private keys."
          />
        </div>
        {state === 'error' && (
          <p role="alert" className="text-sm text-destructive">
            Nothing was confirmed as sent. Your details are still here — please try again, or email us directly.
          </p>
        )}
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          {state === 'pending' && <Loader2 className="animate-spin" />} {state === 'pending' ? 'Sending…' : 'Send message'}
        </Button>
      </fieldset>
    </form>
  )
}
