import { createFileRoute } from '@tanstack/react-router'
import { desc } from 'drizzle-orm'
import { db } from '../../db/index'
import { communityPosts } from '../../db/schema'
import { editorialPosts } from '@/data/posts'
import { services } from '@/lib/site'

const pages = ['/', '/about', '/services', '/news', '/support', '/contact', '/terms', '/privacy']

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin
        const entries: { loc: string; lastmod?: string }[] = [
          ...pages.map((p) => ({ loc: p })),
          ...services.map((s) => ({ loc: `/services/${s.slug}` })),
          ...editorialPosts.map((p) => ({ loc: `/news/${p.slug}`, lastmod: p.date })),
        ]
        try {
          const rows = await db
            .select({ slug: communityPosts.slug, createdAt: communityPosts.createdAt })
            .from(communityPosts)
            .orderBy(desc(communityPosts.createdAt))
            .limit(1000)
          entries.push(...rows.map((r) => ({ loc: `/news/${r.slug}`, lastmod: r.createdAt.toISOString().slice(0, 10) })))
        } catch {
          // Serve the static entries if the database is unavailable.
        }
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map((e) => `  <url><loc>${origin}${encodeURI(e.loc)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`)
  .join('\n')}
</urlset>`
        return new Response(xml, {
          headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
        })
      },
    },
  },
})
