import { useEffect, useState, type FormEvent } from 'react'
import { Loader2, MessageSquare, Reply } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { addComment } from '@/lib/blog.functions'

export interface CommentItem {
  id: number
  postSlug: string
  authorName: string
  body: string
  parentId: number | null
  createdAt: string
}

const NAME_KEY = 'zenith-commenter-name'

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} h ago`
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function CommentForm({
  postSlug,
  parentId,
  onPosted,
  onCancel,
  compact,
}: {
  postSlug: string
  parentId?: number
  onPosted: (c: CommentItem) => void
  onCancel?: () => void
  compact?: boolean
}) {
  const [name, setName] = useState('')
  const [body, setBody] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setName(localStorage.getItem(NAME_KEY) ?? '')
  }, [])

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (pending) return
    const website = String(new FormData(e.currentTarget).get('website') ?? '')
    setPending(true)
    setError(null)
    try {
      const comment = await addComment({ data: { postSlug, authorName: name, body, parentId: parentId ?? null, website } })
      localStorage.setItem(NAME_KEY, name.trim())
      setBody('')
      onPosted(comment)
      toast.success('Comment posted')
    } catch (err) {
      setError(err instanceof Error && err.message.length < 120 ? err.message : 'Your comment could not be posted. Please try again.')
    } finally {
      setPending(false)
    }
  }

  const idp = `c-${parentId ?? 'root'}`
  return (
    <form onSubmit={submit} className="space-y-3">
      <p hidden>
        <label>
          Leave empty <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className={compact ? '' : 'grid gap-3 sm:grid-cols-2'}>
        <div className="space-y-1.5">
          <Label htmlFor={`${idp}-name`}>Your name</Label>
          <Input id={`${idp}-name`} value={name} onChange={(e) => setName(e.target.value)} required minLength={2} maxLength={60} autoComplete="name" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`${idp}-body`}>{parentId ? 'Reply' : 'Comment'}</Label>
        <Textarea
          id={`${idp}-body`}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          minLength={2}
          maxLength={3000}
          rows={compact ? 3 : 4}
          placeholder="Share your thoughts or experience…"
        />
      </div>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <div className="flex gap-2">
        <Button type="submit" disabled={pending}>
          {pending && <Loader2 className="animate-spin" />} {parentId ? 'Post reply' : 'Post comment'}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}

function CommentBubble({ c }: { c: CommentItem }) {
  return (
    <div className="flex gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary font-display text-lg font-bold text-primary uppercase">
        {c.authorName.trim()[0]}
      </span>
      <div className="min-w-0">
        <p className="text-sm">
          <span className="font-semibold">{c.authorName}</span>{' '}
          <span className="font-mono text-xs text-muted-foreground">· {timeAgo(c.createdAt)}</span>
        </p>
        <p className="mt-1 text-sm whitespace-pre-wrap break-words text-muted-foreground">{c.body}</p>
      </div>
    </div>
  )
}

export function Comments({ postSlug, initial, unavailable }: { postSlug: string; initial: CommentItem[]; unavailable?: boolean }) {
  const [items, setItems] = useState(initial)
  const [replyTo, setReplyTo] = useState<number | null>(null)
  const roots = items.filter((c) => !c.parentId)
  const replies = (id: number) => items.filter((c) => c.parentId === id)

  return (
    <section aria-labelledby="comments-heading" className="mt-16 border-t border-border pt-12">
      <h2 id="comments-heading" className="flex items-center gap-3 text-3xl font-bold uppercase">
        <MessageSquare className="size-6 text-primary" aria-hidden /> Comments ({items.length})
      </h2>
      {unavailable && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          Comments couldn't be loaded right now. You can still leave one below.
        </p>
      )}
      <div className="mt-6 rounded-lg border border-border bg-card p-5">
        <CommentForm postSlug={postSlug} onPosted={(c) => setItems((x) => [...x, c])} />
      </div>
      {roots.length === 0 && !unavailable ? (
        <p className="mt-8 text-sm text-muted-foreground">No comments yet — be the first to start the conversation.</p>
      ) : (
        <ul className="mt-8 space-y-6">
          {roots.map((c) => (
            <li key={c.id} className="rounded-lg border border-border bg-card/50 p-5">
              <CommentBubble c={c} />
              <div className="mt-3 pl-12">
                {replyTo === c.id ? (
                  <CommentForm
                    compact
                    postSlug={postSlug}
                    parentId={c.id}
                    onCancel={() => setReplyTo(null)}
                    onPosted={(r) => {
                      setItems((x) => [...x, r])
                      setReplyTo(null)
                    }}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setReplyTo(c.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    <Reply className="size-3.5" aria-hidden /> Reply
                  </button>
                )}
                {replies(c.id).length > 0 && (
                  <ul className="mt-4 space-y-4 border-l border-border pl-4">
                    {replies(c.id).map((r) => (
                      <li key={r.id}>
                        <CommentBubble c={r} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
