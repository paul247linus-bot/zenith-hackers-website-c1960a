import { createFileRoute } from '@tanstack/react-router'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import { PageHero } from '@/components/page-parts'
import { site } from '@/lib/site'

export const Route = createFileRoute('/contact')({
  head: () => ({ meta: [{ title: `Contact Us | ${site.name}` }] }),
  component: Contact,
})

const channels = [
  { icon: Phone, label: 'Phone', value: site.phone, href: site.phoneHref },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Message us on WhatsApp', href: site.whatsapp },
  { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: 'Office', value: site.address, href: site.mapUrl },
]

function Contact() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Talk to an investigator"
        intro="Tell us what's happened. Your first consultation is free and completely confidential."
        image="support.png"
      />
      <section className="mx-auto grid max-w-content gap-10 px-4 pt-16 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
        <div className="space-y-4">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="flex items-start gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50 motion-reduce:transition-none"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                <c.icon className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">{c.label}</span>
                <span className="mt-1 block break-all">{c.value}</span>
              </span>
            </a>
          ))}
          <div className="flex items-start gap-4 rounded-lg border border-border bg-card/50 p-5">
            <Clock className="mt-0.5 size-5 text-accent" aria-hidden />
            <p className="text-sm text-muted-foreground">
              Office hours: Monday–Friday, 9:00–18:00 (UK). Our AI assistant and WhatsApp line are available 24/7.
            </p>
          </div>
        </div>
        <ContactForm />
      </section>
      <section className="mx-auto max-w-content px-4 pt-16 sm:px-6">
        <iframe
          title="Map of our London office"
          src="https://www.google.com/maps?q=100+Prestons+Rd,+London+E14+9RL&output=embed"
          className="h-80 w-full rounded-lg border border-border grayscale invert-[0.9] hue-rotate-180"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </main>
  )
}
