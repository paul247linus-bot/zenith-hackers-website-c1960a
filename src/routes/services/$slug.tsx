import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CtaBand, Eyebrow, PageHero, PostCard } from '@/components/page-parts'
import { editorialPosts, type PostCategory } from '@/data/posts'
import { services, site } from '@/lib/site'

const relatedCategory: Record<string, PostCategory> = {
  'cyber-intelligence': 'Cyber Intelligence',
  'crypto-investigations': 'Crypto Investigations',
  'asset-tracing': 'Asset Tracing',
  'offshore-legal-experts': 'Offshore Legal',
}

export const Route = createFileRoute('/services/$slug')({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug)
    if (!service) throw notFound()
    return { slug: service.slug }
  },
  head: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug)
    return {
      meta: service
        ? [
            { title: `${service.name} | ${site.name}` },
            { name: 'description', content: service.summary },
          ]
        : [],
    }
  },
  component: ServicePage,
})

function ServicePage() {
  const { slug } = Route.useLoaderData()
  const service = services.find((s) => s.slug === slug)!
  const related = editorialPosts.filter((p) => p.category === relatedCategory[slug]).slice(0, 3)
  const others = services.filter((s) => s.slug !== slug)

  return (
    <main>
      <PageHero eyebrow="Services" title={service.name} intro={service.summary} image={service.image} />
      <section className="mx-auto grid max-w-content gap-12 px-4 pt-20 sm:px-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <p className="text-lg leading-relaxed text-muted-foreground">{service.intro}</p>
          <h2 className="mt-12 text-4xl font-bold uppercase">What we deliver</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {service.capabilities.map((c) => (
              <div key={c.title} className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-xl font-semibold uppercase text-primary">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
          <h2 className="mt-12 text-4xl font-bold uppercase">Our process</h2>
          <ol className="mt-6 space-y-3">
            {service.process.map((step, i) => (
              <li key={step} className="flex items-center gap-4 rounded-lg border border-border bg-card/60 p-4">
                <span className="font-mono text-sm text-primary">{String(i + 1).padStart(2, '0')}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <aside className="space-y-5 lg:sticky lg:top-36 lg:self-start">
          <div className="rounded-lg border border-primary/40 bg-card p-6">
            <h2 className="text-2xl font-bold uppercase">Discuss your case</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Free, confidential and without obligation. We respond to every enquiry within one business day.
            </p>
            <Button asChild className="mt-5 w-full">
              <Link to="/contact">Book a consultation</Link>
            </Button>
            <Button asChild variant="outline" className="mt-2 w-full">
              <a href={site.phoneHref}>{site.phone}</a>
            </Button>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Other services</h2>
            <ul className="mt-3 space-y-1">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="flex items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                  >
                    <span className="flex items-center gap-2">
                      <s.icon className="size-4 text-primary" aria-hidden /> {s.name}
                    </span>
                    <ArrowRight className="size-4 text-muted-foreground" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
      {related.length > 0 && (
        <section className="mx-auto max-w-content px-4 pt-20 sm:px-6">
          <Eyebrow>Related reading</Eyebrow>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
      <CtaBand />
    </main>
  )
}
