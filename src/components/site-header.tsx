import { Link } from '@tanstack/react-router'
import { ChevronDown, Mail, MapPin, Menu, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Logo } from '@/components/logo'
import { services, site } from '@/lib/site'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/news', label: 'News' },
  { to: '/support', label: 'Support' },
  { to: '/contact', label: 'Contact' },
] as const

const linkClass =
  'rounded-sm px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground motion-reduce:transition-none data-[status=active]:text-primary'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="hidden border-b border-border/60 bg-card/60 md:block">
        <div className="mx-auto flex max-w-content items-center justify-between px-4 py-2 font-mono text-xs text-muted-foreground sm:px-6">
          <span className="flex items-center gap-2">
            <MapPin className="size-3.5 text-primary" aria-hidden /> {site.address}
          </span>
          <span className="flex items-center gap-6">
            <a href={site.phoneHref} className="flex items-center gap-2 hover:text-foreground">
              <Phone className="size-3.5 text-primary" aria-hidden /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-foreground">
              <Mail className="size-3.5 text-primary" aria-hidden /> {site.email}
            </a>
          </span>
        </div>
      </div>
      <div className="mx-auto flex h-18 max-w-content items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <Link to="/" className={linkClass} activeOptions={{ exact: true }}>
            Home
          </Link>
          <Link to="/about" className={linkClass}>
            About Us
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className={`${linkClass} flex items-center gap-1`}>
              Services <ChevronDown className="size-4" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-60">
              <DropdownMenuItem asChild>
                <Link to="/services">All services</Link>
              </DropdownMenuItem>
              {services.map((s) => (
                <DropdownMenuItem key={s.slug} asChild>
                  <Link to="/services/$slug" params={{ slug: s.slug }}>
                    <s.icon className="size-4 text-primary" aria-hidden /> {s.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {nav.slice(2).map((n) => (
            <Link key={n.to} to={n.to} className={linkClass}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/contact">Free consultation</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-6">
              <SheetTitle className="font-display text-2xl uppercase">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              <nav aria-label="Mobile" className="mt-4 flex flex-col gap-1">
                {[...nav.slice(0, 2), { to: '/services', label: 'Services' } as const, ...nav.slice(2)].map((n) => (
                  <SheetClose asChild key={n.to}>
                    <Link to={n.to} className="rounded-md px-3 py-2.5 text-base hover:bg-muted data-[status=active]:text-primary" activeOptions={{ exact: n.to === '/' }}>
                      {n.label}
                    </Link>
                  </SheetClose>
                ))}
                <p className="mt-4 px-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">Services</p>
                {services.map((s) => (
                  <SheetClose asChild key={s.slug}>
                    <Link to="/services/$slug" params={{ slug: s.slug }} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                      <s.icon className="size-4 text-primary" aria-hidden /> {s.name}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-6 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
                <a href={site.phoneHref} className="block">{site.phone}</a>
                <a href={`mailto:${site.email}`} className="block">{site.email}</a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
