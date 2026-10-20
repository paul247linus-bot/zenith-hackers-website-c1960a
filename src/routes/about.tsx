import { createFileRoute } from '@tanstack/react-router'
import { Award, Eye, Lock, Scale } from 'lucide-react'
import { CtaBand, Eyebrow, PageHero } from '@/components/page-parts'
import { img, site } from '@/lib/site'

export const Route = createFileRoute('/about')({
  head: () => ({ meta: [{ title: `About Us | ${site.name}` }] }),
  component: About,
})

const values = [
  { icon: Scale, title: 'Integrity', text: 'We only use lawful, authorised methods — and we tell clients honestly what can and cannot be achieved.' },
  { icon: Lock, title: 'Discretion', text: 'Cases are handled on a strict need-to-know basis with encrypted communications throughout.' },
  { icon: Eye, title: 'Precision', text: 'Every finding is corroborated, graded for confidence and documented to an evidential standard.' },
  { icon: Award, title: 'Expertise', text: 'Our people come from law enforcement, intelligence, forensic accounting and offensive security.' },
]

const team = [
  { name: 'Marcus Okafor', role: 'Director of Investigations', bio: 'Former Metropolitan Police detective with two decades of fraud and financial crime casework.' },
  { name: 'Daniel Hart', role: 'Head of Cyber Intelligence', bio: 'OSCP- and CREST-certified ethical hacker leading penetration testing and incident response.' },
  { name: 'Priya Nair', role: 'Senior Crypto Investigator', bio: 'Blockchain analyst who has traced digital assets across more than thirty networks.' },
  { name: 'Amelia Shaw', role: 'Senior Asset Investigator', bio: 'Forensic accountant specialising in corporate structures and cross-border asset searches.' },
  { name: 'Eleanor Whitcombe', role: 'Fraud Prevention Advisor', bio: 'Helps businesses and individuals spot, prevent and respond to fraud and social engineering.' },
  { name: 'James Ellery', role: 'Offshore Legal Liaison', bio: 'Coordinates our network of solicitors and counsel across offshore financial centres.' },
]

function About() {
  return (
    <main>
      <PageHero
        eyebrow="About us"
        title="Discreet investigators for a digital world"
        intro={`${site.name} brings together seasoned investigators, intelligence analysts and ethical hackers under one roof in London's Docklands.`}
        image="about.png"
      />
      <section className="mx-auto grid max-w-content gap-12 px-4 pt-20 sm:px-6 lg:grid-cols-2">
        <div>
          <Eyebrow>Our story</Eyebrow>
          <h2 className="mt-4 text-5xl font-bold uppercase">Built for cases that cross borders and blockchains</h2>
        </div>
        <div className="space-y-4 text-muted-foreground">
          <p>
            We started Zenith because victims of modern fraud kept falling through the cracks. Traditional investigators
            couldn't follow money onto the blockchain, and technical specialists couldn't turn data into evidence a court
            would accept.
          </p>
          <p>
            Today our team supports private clients, law firms, family offices and businesses with cyber intelligence,
            crypto investigations, asset tracing and offshore legal coordination. We operate from our office at {site.address},
            with trusted partners in more than forty jurisdictions.
          </p>
          <p>
            Our “hacking” is always ethical: authorised security testing for organisations that want to find their
            weaknesses before criminals do. We never access accounts, devices or systems without the owner's consent.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 pt-20 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-lg border border-border bg-card p-6">
              <v.icon className="size-7 text-primary" aria-hidden />
              <h3 className="mt-4 text-2xl font-semibold uppercase">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 pt-20 sm:px-6">
        <Eyebrow>Leadership</Eyebrow>
        <h2 className="mt-4 text-5xl font-bold uppercase">The team behind your case</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <div key={m.name} className="flex gap-4 rounded-lg border border-border bg-card p-6">
              <span className="grid size-14 shrink-0 place-items-center rounded-md bg-secondary font-display text-2xl font-bold text-primary">
                {m.name.split(' ').map((n) => n[0]).join('')}
              </span>
              <div>
                <h3 className="text-2xl font-semibold">{m.name}</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">{m.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 pt-20 sm:px-6">
        <img
          src={img('support.png', 1400)}
          alt="Confidential client consultation"
          loading="lazy"
          width={1400}
          height={600}
          className="aspect-[21/9] w-full rounded-lg border border-border object-cover"
        />
      </section>
      <CtaBand />
    </main>
  )
}
