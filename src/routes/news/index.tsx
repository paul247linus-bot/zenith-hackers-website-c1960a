import { useMemo, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { PenLine, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHero, PostCard } from '@/components/page-parts'
import { POST_CATEGORIES } from '@/data/posts'
import { listPosts } from '@/lib/blog.functions'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/news/')({
  loader: () => listPosts(),
  head: () => ({ meta: [{ title: `News & Insights | ${site.name}` }] }),
  pendingComponent: NewsSkeleton,
  component: News,
})

const PAGE = 12

function News() {
  const posts = Route.useLoaderData()
  const [category, setCategory] = useState<string>('All')
  const [query, setQuery] = useState('')
  const [shown, setShown] = useState(PAGE)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter(
      (p) =>
        (category === 'All' || (category === 'Community' ? p.community : p.category === category)) &&
        (!q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)),
    )
  }, [posts, category, query])

  const tabs = ['All', ...POST_CATEGORIES, 'Community']

  return (
    <main>
      <PageHero
        eyebrow="News"
        title="Insights from the investigation room"
        intro="Practical guidance on fraud, crypto, cyber security and asset recovery — plus articles shared by our community of readers."
        image="news.png"
      />
      <div className="mx-auto max-w-content px-4 pt-12 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative md:w-80">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <label htmlFor="news-search" className="sr-only">Search articles</label>
            <Input
              id="news-search"
              placeholder="Search articles…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setShown(PAGE)
              }}
              className="pl-9"
            />
          </div>
          <Button asChild>
            <Link to="/news/new">
              <PenLine /> Write an article
            </Link>
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={category === t}
              onClick={() => {
                setCategory(t)
                setShown(PAGE)
              }}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm transition-colors motion-reduce:transition-none',
                category === t
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/60 hover:text-foreground',
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="mt-6 font-mono text-xs text-muted-foreground" role="status">
          {filtered.length} article{filtered.length === 1 ? '' : 's'}
        </p>
        {filtered.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed border-border p-12 text-center">
            <p className="text-lg">No articles match your search.</p>
            <p className="mt-2 text-sm text-muted-foreground">Try another keyword or category — or share your own story.</p>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/news/new">Write an article</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, shown).map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
        {shown < filtered.length && (
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" onClick={() => setShown((s) => s + PAGE)}>
              Load more articles
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}

function NewsSkeleton() {
  return (
    <main className="mx-auto max-w-content px-4 py-16 sm:px-6" aria-busy="true">
      <Skeleton className="h-14 w-2/3" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg border border-border">
            <Skeleton className="aspect-[16/9] rounded-none" />
            <div className="space-y-3 p-5">
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
