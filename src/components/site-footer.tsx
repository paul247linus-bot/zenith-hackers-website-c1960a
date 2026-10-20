import { Link } from '@tanstack/react-router'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from '@/components/logo'
import { services, site } from '@/lib/site'

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 font-display text-lg font-semibold uppercase tracking-wider text-foreground">{children}</h2>
}

const footLink = 'text-sm text-muted-foreground transition-colors hover:text-primary motion-reduce:transition-none'

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-card/50">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Private investigations and ethical hacking services. Discreet, lawful and evidence-led — from London to every major offshore centre.
          </p>
        </div>
        <div>
          <Heading>Quick link</Heading>
          <ul className="space-y-2">
            <li><Link to="/" className={footLink}>Home</Link></li>
            <li><Link to="/about" className={footLink}>About us</Link></li>
            <li><Link to="/services" className={footLink}>Services</Link></li>
            <li><Link to="/news" className={footLink}>News</Link></li>
          </ul>
        </div>
        <div>
          <Heading>Services</Heading>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className={footLink}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Heading>Support</Heading>
          <ul className="space-y-2">
            <li><Link to="/support" className={footLink}>Help/Support</Link></li>
            <li><Link to="/terms" className={footLink}>Term&apos;s &amp; condition</Link></li>
            <li><Link to="/privacy" className={footLink}>Privacy policy</Link></li>
            <li><Link to="/contact" className={footLink}>Contact us</Link></li>
          </ul>
        </div>
        <div>
          <Heading>Contact</Heading>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <a href={site.phoneHref} className="flex items-start gap-3 hover:text-primary">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-start gap-3 break-all hover:text-primary">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {site.email}
              </a>
            </li>
            <li>
              <a href={site.mapUrl} target="_blank" rel="noreferrer" className="flex items-start gap-3 hover:text-primary">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {site.address}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-content px-4 py-6 text-center font-mono text-xs text-muted-foreground sm:px-6">{site.copyright}</p>
      </div>
    </footer>
  )
}
