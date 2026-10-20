import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, CheckCircle2, FileLock2, Fingerprint, Globe2, Quote, Scale, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CtaBand, Eyebrow, PostCard } from '@/components/page-parts'
import { editorialPosts } from '@/data/posts'
import { img, services, site } from '@/lib/site'

export const Route = createFileRoute('/')({
  component: Home,
})

const stats = [
  { value: '1,200+', label: 'Cases investigated' },
  { value: '40+', label: 'Jurisdictions covered' },
  { value: '24/7', label: 'Incident response' },
  { value: '100%', label: 'Confidential' },
]

const reasons = [
  { icon: ShieldCheck, title: 'Lawful & authorised', text: 'Every engagement runs under a signed scope and UK law. Evidence we gather stands up to scrutiny.' },
  { icon: Fingerprint, title: 'Investigators & ethical hackers', text: 'Former police, intelligence analysts and certified penetration testers working as one team.' },
  { icon: Globe2, title: 'Global reach', text: 'Field agents and legal partners across Europe, the Middle East, Asia, the Americas and offshore centres.' },
  { icon: FileLock2, title: 'Absolute discretion', text: 'Encrypted communication, need-to-know case handling and strict data retention policies.' },
]

const steps = [
  { n: '01', title: 'Confidential consultation', text: 'Tell us what happened. We listen, assess and explain your options — free of charge.' },
  { n: '02', title: 'Scoped proposal', text: 'A clear plan, timeline and fixed quote, with lawful methods agreed up front.' },
  { n: '03', title: 'Investigation', text: 'Our analysts, investigators and ethical hackers gather and verify evidence.' },
  { n: '04', title: 'Report & action', text: 'A court-ready report and a briefing with next steps, including legal referrals.' },
]

const testimonials = [
  {
    quote: 'Their crypto tracing report gave our solicitors exactly what they needed to approach the exchange. Professional, fast and honest about what was achievable.',
    name: 'R. Patel',
    role: 'Private client, Manchester',
  },
  {
    quote: 'The penetration test uncovered issues three previous audits missed. The remediation briefing was clear enough for our board.',
    name: 'S. Lindqvist',
    role: 'CTO, fintech scale-up',
  },
  {
    quote: 'Zenith traced assets through two BVI companies and a Dubai property holding. Our client’s judgment is finally being enforced.',
    name: 'A. Morgan',
    role: 'Partner, litigation firm',
  },
]

function Home() {
  const latest = editorialPosts.slice(0, 3)
  return (
    <main>
      <section className="relative isolate overflow-hidden border-b border-border">
        <img
          src={img('hero.png', 1920)}
          srcSet={`${img('hero.png', 960)} 960w, ${img('hero.png', 1920)} 1920w`}
          sizes="100vw"
          alt="Investigator overlooking the London skyline at night"
          className="absolute inset-0 -z-20 size-full object-cover"
          width={1920}
          height={1072}
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/80 to-background/10" aria-hidden />
        <div className="mx-auto max-w-content px-4 pt-24 pb-28 sm:px-6 md:pt-36 md:pb-40">
          <Eyebrow>London · Private Investigations</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-6xl font-bold uppercase leading-[0.9] md:text-8xl">
            Intelligence that <span className="text-primary">uncovers</span> the truth.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            {site.name} is a private investigations and ethical hacking service. We trace stolen crypto, locate hidden
            assets, and defend organisations with authorised cyber intelligence.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/contact">
                Start a confidential case <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-background/40 backdrop-blur">
              <Link to="/services">Explore services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section aria-label="Key figures" className="border-b border-border bg-card/60">
        <dl className="mx-auto grid max-w-content grid-cols-2 px-4 sm:px-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-border px-4 py-8 not-first:border-l max-md:[&:nth-child(3)]:border-l-0">
              <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{s.label}</dt>
              <dd className="mt-2 font-display text-5xl font-bold text-primary">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-content px-4 pt-24 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2 className="mt-4 text-5xl font-bold uppercase md:text-6xl">Our services</h2>
          </div>
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
            View all services <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group relative isolate flex min-h-80 flex-col justify-end overflow-hidden rounded-lg border border-border p-7 transition-colors hover:border-primary/60 motion-reduce:transition-none"
            >
              <img
                src={img(s.image, 900)}
                alt=""
                loading="lazy"
                width={900}
                height={500}
                className="absolute inset-0 -z-20 size-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-transparent" aria-hidden />
              <s.icon className="size-9 text-primary" aria-hidden />
              <h3 className="mt-4 text-3xl font-bold uppercase">{s.name}</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">{s.summary}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-content items-center gap-12 px-4 pt-24 sm:px-6 lg:grid-cols-2">
        <div className="relative">
          <img
            src={img('about.png', 900)}
            alt="Zenith intelligence team reviewing case data"
            loading="lazy"
            width={900}
            height={500}
            className="aspect-[4/3] w-full rounded-lg border border-border object-cover"
          />
          <div className="absolute -bottom-6 -right-2 rounded-lg border border-primary/40 bg-card p-5 shadow-xl sm:-right-6">
            <p className="font-display text-4xl font-bold text-primary">15+</p>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Years of experience</p>
          </div>
        </div>
        <div>
          <Eyebrow>Why Zenith</Eyebrow>
          <h2 className="mt-4 text-5xl font-bold uppercase">Investigators. Analysts. Ethical hackers.</h2>
          <p className="mt-4 text-muted-foreground">
            Modern wrongdoing leaves both a physical and a digital trail. We combine traditional investigative craft with
            technical intelligence to follow both — lawfully, discreetly and to an evidential standard.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.title}>
                <r.icon className="size-6 text-accent" aria-hidden />
                <h3 className="mt-3 text-xl font-semibold uppercase">{r.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 pt-24 sm:px-6">
        <Eyebrow>How it works</Eyebrow>
        <h2 className="mt-4 text-5xl font-bold uppercase">From first call to final report</h2>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="bg-card p-6">
              <span className="font-mono text-sm text-primary">{s.n}</span>
              <h3 className="mt-3 text-2xl font-semibold uppercase">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-content px-4 pt-24 sm:px-6">
        <Eyebrow>Client voices</Eyebrow>
        <h2 className="mt-4 text-5xl font-bold uppercase">Trusted when it matters</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-lg border border-border bg-card p-6">
              <Quote className="size-7 text-primary" aria-hidden />
              <blockquote className="mt-4 text-sm leading-relaxed">{t.quote}</blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 pt-24 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Insights</Eyebrow>
            <h2 className="mt-4 text-5xl font-bold uppercase">Latest news</h2>
          </div>
          <Link to="/news" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
            All articles <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {latest.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 pt-24 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4 rounded-lg border border-border bg-card/60 px-6 py-5 text-sm text-muted-foreground">
          <span className="flex items-center gap-2"><Scale className="size-4 text-primary" aria-hidden /> Lawful methods only</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" aria-hidden /> Free initial consultation</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" aria-hidden /> Transparent fixed quotes</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" aria-hidden /> Court-ready reporting</span>
        </div>
      </section>

      <CtaBand />
    </main>
  )
}
