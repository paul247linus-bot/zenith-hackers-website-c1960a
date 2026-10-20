import { useState, type FormEvent } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Eyebrow } from '@/components/page-parts'
import { POST_CATEGORIES } from '@/data/posts'
import { createPost } from '@/lib/blog.functions'
import { postInput } from '@/lib/blog.schemas'
import { site } from '@/lib/site'

export const Route = createFileRoute('/news/new')({
  head: () => ({ meta: [{ title: `Write an article | ${site.name}` }] }),
  component: NewPost,
})

type Errors = Partial<Record<'title' | 'category' | 'authorName' | 'body', string>>

function NewPost() {
  const navigate = useNavigate()
  const [pending, setPending] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [bodyLength, setBodyLength] = useState(0)

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (pending) return
    const fd = new FormData(e.currentTarget)
    const values = {
      title: String(fd.get('title') ?? ''),
      category: String(fd.get('category') ?? ''),
      authorName: String(fd.get('authorName') ?? ''),
      body: String(fd.get('body') ?? ''),
      website: String(fd.get('website') ?? ''),
    }
    const parsed = postInput.safeParse(values)
    if (!parsed.success) {
      const next: Errors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors
        if (key && !next[key]) next[key] = issue.message
      }
      setErrors(next)
      return
    }
    setErrors({})
    setFormError(null)
    setPending(true)
    try {
      const { slug } = await createPost({ data: parsed.data })
      toast.success('Your article has been published')
      await navigate({ to: '/news/$slug', params: { slug } })
    } catch {
      setFormError('Your article could not be published. Your text is still here — please try again.')
      setPending(false)
    }
  }

  return (
    <main className="mx-auto max-w-reading px-4 py-16 sm:px-6">
      <Eyebrow>Community</Eyebrow>
      <h1 className="mt-4 text-5xl font-bold uppercase md:text-6xl">Write an article</h1>
      <p className="mt-4 text-muted-foreground">
        Share an experience, warn others about a scam you've encountered, or offer your own insight. Articles are
        published immediately on our News page and open for comments.
      </p>
      <form onSubmit={submit} noValidate className="mt-10 space-y-6 rounded-lg border border-border bg-card p-6 md:p-8">
        <p hidden>
          <label>
            Leave empty <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </p>
        <fieldset disabled={pending} className="space-y-6">
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" maxLength={140} aria-invalid={!!errors.title} aria-describedby="title-err" />
            {errors.title && <p id="title-err" className="text-sm text-destructive">{errors.title}</p>}
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="authorName">Your name</Label>
              <Input id="authorName" name="authorName" maxLength={60} autoComplete="name" aria-invalid={!!errors.authorName} aria-describedby="name-err" />
              {errors.authorName && <p id="name-err" className="text-sm text-destructive">{errors.authorName}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                defaultValue="Fraud Prevention"
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {POST_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="body">Article</Label>
            <Textarea
              id="body"
              name="body"
              rows={14}
              maxLength={20000}
              onChange={(e) => setBodyLength(e.target.value.trim().length)}
              placeholder="Write your article here. Leave a blank line between paragraphs."
              aria-invalid={!!errors.body}
              aria-describedby="body-help"
            />
            <p id="body-help" className={errors.body ? 'text-sm text-destructive' : 'font-mono text-xs text-muted-foreground'}>
              {errors.body ?? `${bodyLength} characters · minimum 200`}
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Please don't include personal data about other people, wallet private keys or passwords. By publishing you agree
            to our{' '}
            <Link to="/terms" className="text-primary underline">terms</Link>. We may remove content that is unlawful,
            abusive or promotional.
          </p>
          {formError && <p role="alert" className="text-sm text-destructive">{formError}</p>}
          <div className="flex gap-3">
            <Button type="submit" size="lg">
              {pending && <Loader2 className="animate-spin" />} Publish article
            </Button>
            <Button asChild type="button" variant="ghost" size="lg">
              <Link to="/news">Cancel</Link>
            </Button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}
