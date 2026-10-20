import { Link } from '@tanstack/react-router'

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Zenith Hackers Intelligence home">
      <span className="relative grid size-10 place-items-center rounded-md border border-primary/50 bg-primary/10">
        <svg viewBox="0 0 32 32" className="size-6 text-primary" aria-hidden="true">
          <path d="M7 8h18L9 24h16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
          <circle cx="16" cy="16" r="2" className="fill-accent" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-display text-xl font-bold uppercase tracking-wide">Zenith Hackers</span>
        <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Intelligence</span>
      </span>
    </Link>
  )
}
