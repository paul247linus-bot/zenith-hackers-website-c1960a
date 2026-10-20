import { createFileRoute, Link } from '@tanstack/react-router'
import { AlertTriangle, Bot, LifeBuoy, MessageCircle } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { CtaBand, PageHero } from '@/components/page-parts'
import { site } from '@/lib/site'

export const Route = createFileRoute('/support')({
  head: () => ({ meta: [{ title: `Help & Support | ${site.name}` }] }),
  component: Support,
})

const faqs = [
  {
    q: 'Is my enquiry confidential?',
    a: 'Yes. Every enquiry is handled on a strict need-to-know basis. We do not share your information with anyone without your consent, except where the law requires it.',
  },
  {
    q: 'Can you guarantee I will get my crypto back?',
    a: 'No honest investigator can guarantee recovery. What we can do is trace where funds went, identify the platforms involved and prepare evidence that supports freezing requests, police reports and legal action. Be wary of anyone who promises guaranteed recovery for an upfront fee — that is a common “recovery scam”.',
  },
  {
    q: 'What information should I prepare?',
    a: 'A timeline of events, wallet addresses and transaction IDs (hashes), screenshots of conversations and websites, bank or card statements, and any names, emails or phone numbers used by the other party.',
  },
  {
    q: 'Do you hack into other people’s accounts or phones?',
    a: 'No. Our hacking services are ethical and authorised — penetration testing and security assessments carried out with the system owner’s written permission. Accessing someone else’s accounts or devices without consent is a criminal offence, and we never do it.',
  },
  {
    q: 'Should I also report to the police?',
    a: 'Yes. In the UK, report fraud and cybercrime to Action Fraud (0300 123 2040 or actionfraud.police.uk). Our reports can complement a police investigation and are often shared with law enforcement with your consent.',
  },
  {
    q: 'How much does an investigation cost?',
    a: 'Every case is different. After a free consultation we provide a written proposal with a clear scope and fixed or capped fees, so there are no surprises.',
  },
  {
    q: 'How quickly can you start?',
    a: 'For urgent matters such as an active breach or recent crypto theft, we can usually begin within 24 hours. Speed matters — the earlier we start, the more options remain open.',
  },
  {
    q: 'Do you work outside the UK?',
    a: 'Yes. We support clients worldwide and work with field agents and legal partners in more than forty jurisdictions, including major offshore financial centres.',
  },
]

function Support() {
  return (
    <main>
      <PageHero
        eyebrow="Help / Support"
        title="How can we help?"
        intro="Answers to common questions, practical first steps and every way to reach our team."
        image="support.png"
      />
      <section className="mx-auto grid max-w-content gap-5 px-4 pt-16 sm:px-6 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6">
          <Bot className="size-7 text-primary" aria-hidden />
          <h2 className="mt-4 text-2xl font-semibold uppercase">Ask Zara, our AI assistant</h2>
          <p className="mt-2 text-sm text-muted-foreground">Instant answers 24/7. Use the gold button at the bottom-left of any page.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <MessageCircle className="size-7 text-primary" aria-hidden />
          <h2 className="mt-4 text-2xl font-semibold uppercase">WhatsApp an investigator</h2>
          <p className="mt-2 text-sm text-muted-foreground">Prefer to message? Reach us directly from the green button on the right.</p>
          <Button asChild variant="outline" size="sm" className="mt-4">
            <a href={site.whatsapp} target="_blank" rel="noreferrer">Open WhatsApp</a>
          </Button>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <LifeBuoy className="size-7 text-primary" aria-hidden />
          <h2 className="mt-4 text-2xl font-semibold uppercase">Book a consultation</h2>
          <p className="mt-2 text-sm text-muted-foreground">Free, confidential and without obligation.</p>
          <Button asChild size="sm" className="mt-4">
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 pt-12 sm:px-6">
        <div className="flex gap-4 rounded-lg border border-destructive/50 bg-destructive/10 p-5">
          <AlertTriangle className="size-6 shrink-0 text-destructive" aria-hidden />
          <div>
            <h2 className="text-xl font-semibold uppercase">Just been scammed? Act now</h2>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
              <li>Stop all further payments and contact with the other party.</li>
              <li>Call your bank or card provider immediately.</li>
              <li>Save every screenshot, message, wallet address and transaction ID.</li>
              <li>Report to Action Fraud (UK) or your local police.</li>
              <li>Contact us for a free assessment of your case.</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-reading px-4 pt-16 sm:px-6">
        <h2 className="text-4xl font-bold uppercase">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="mt-6">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <CtaBand />
    </main>
  )
}
