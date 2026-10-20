import { Link } from '@tanstack/react-router'
import { ArrowRight, MessageSquare, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { categoryImage, type PostCategory } from '@/data/posts'
import { img, site } from '@/lib/site'

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
      <span className="h-px w-8 bg-primary" aria-hidden /> {children}
    </p>
  )
}

export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: string; intro?: string; image: string }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <img
        src={img(image, 1600)}
        alt=""
        className="absolute inset-0 -z-20 size-full object-cover opacity-40"
        width={1600}
        height={900}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-background/30" aria-hidden />
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 md:py-28">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-5xl font-bold uppercase leading-[0.95] md:text-7xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
      </div>
    </section>
  )
}

export function CtaBand() {
  return (
    <section className="mx-auto mt-24 max-w-content px-4 sm:px-6">
      <div className="grid-bg relative overflow-hidden rounded-xl border border-primary/30 bg-card p-8 md:p-12">
        <div className="absolute -top-24 -right-24 size-72 rounded-full bg-primary/15 blur-3xl" aria-hidden />
        <div className="relative grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="text-4xl font-bold uppercase md:text-5xl">Need answers? Speak to an investigator today.</h2>
            <p className="mt-4 text-muted-foreground">
              Every enquiry is handled in strict confidence. Your first consultation is free and carries no obligation.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Button asChild size="lg">
              <Link to="/contact">
                <MessageSquare /> Book a free consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={site.phoneHref}>
                <Phone /> {site.phone}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export interface PostSummary {
  slug: string
  title: string
  excerpt: string
  category: PostCategory
  author: string
  date: string
  readMinutes: number
  community?: boolean
  comments?: number
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/50 motion-reduce:transition-none">
      <Link to="/news/$slug" params={{ slug: post.slug }} className="relative block aspect-[16/9] overflow-hidden" tabIndex={-1} aria-hidden>
        <img
          src={img(categoryImage[post.category], 640)}
          alt=""
          loading="lazy"
          width={640}
          height={360}
          className="size-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
        <span className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-background/80 text-foreground backdrop-blur">{post.category}</Badge>
          {post.community && <Badge className="bg-accent text-accent-foreground">Community</Badge>}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-xs text-muted-foreground">
          {formatDate(post.date)} · {post.readMinutes} min read
          {typeof post.comments === 'number' && post.comments > 0 && ` · ${post.comments} comment${post.comments === 1 ? '' : 's'}`}
        </p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight">
          <Link to="/news/$slug" params={{ slug: post.slug }} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
        <Link
          to="/news/$slug"
          params={{ slug: post.slug }}
          className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-primary"
          aria-label={`Read ${post.title}`}
        >
          Read article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
        </Link>
      </div>
    </article>
  )
}
