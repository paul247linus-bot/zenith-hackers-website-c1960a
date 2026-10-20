import { Eyebrow } from '@/components/page-parts'

export function LegalPage({ eyebrow, title, updated, sections }: { eyebrow: string; title: string; updated: string; sections: { h: string; p: string[] }[] }) {
  return (
    <main className="mx-auto max-w-reading px-4 py-16 sm:px-6">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-4 text-5xl font-bold uppercase md:text-6xl">{title}</h1>
      <p className="mt-3 font-mono text-xs text-muted-foreground">Last updated: {updated}</p>
      <div className="prose-article mt-10">
        {sections.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            {s.p.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        ))}
      </div>
    </main>
  )
}
