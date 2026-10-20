import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Check } from 'lucide-react'
import { CtaBand, PageHero } from '@/components/page-parts'
import { img, services, site } from '@/lib/site'

export const Route = createFileRoute('/services/')({
  head: () => ({ meta: [{ title: `Services | ${site.name}` }] }),
  component: Services,
})

function Services() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title="Specialist investigation & cyber intelligence"
        intro="Four disciplines, one team. We combine them as each case demands — from a single wallet trace to a multi-jurisdiction asset recovery strategy."
        image="cyber.png"
      />
      <div className="mx-auto max-w-content space-y-16 px-4 pt-20 sm:px-6">
        {services.map((s, i) => (
          <section key={s.slug} className="grid items-center gap-10 lg:grid-cols-2">
            <img
              src={img(s.image, 900)}
              alt=""
              loading="lazy"
              width={900}
              height={500}
              className={`aspect-[16/10] w-full rounded-lg border border-border object-cover ${i % 2 ? 'lg:order-2' : ''}`}
            />
            <div>
              <s.icon className="size-9 text-primary" aria-hidden />
              <h2 className="mt-4 text-5xl font-bold uppercase">{s.name}</h2>
              <p className="mt-4 text-muted-foreground">{s.summary}</p>
              <ul className="mt-6 space-y-2">
                {s.capabilities.map((c) => (
                  <li key={c.title} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden /> {c.title}
                  </li>
                ))}
              </ul>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="mt-8 inline-flex items-center gap-2 font-medium text-primary"
              >
                Explore {s.name} <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </section>
        ))}
      </div>
      <CtaBand />
    </main>
  )
}
