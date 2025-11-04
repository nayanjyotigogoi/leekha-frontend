"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState, useContext } from "react"
import { Heart, MessageCircle, Share2, ArrowLeft, Copy, Mail } from "lucide-react"
import { CommentsSection } from "./comments-section"
import { AmbientSoundToggle } from "./ambient-sound-toggle"
import { BorderStickers } from "./border-stickers"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"


interface ReadingPageProps {
  writingId: string
  onBack?: () => void
}

interface Writing {
  id: number
  title: string
  category: string
  content: string
  preview?: string
  reading_time?: number
  likes_count?: number
  created_at: string
  author?: {
    id: number
    name: string
    profile_image?: string
    bio?: string
  }
  comments?: {
    id: number
    author_name: string
    content: string
  }[]
}

export function ReadingPage({ writingId, onBack }: ReadingPageProps) {
  const router = useRouter()
  const { user, openLoginModal } = useAuth()

  // const { user, openLoginModal } = useContext(AuthContext) 
  const [writing, setWriting] = useState<Writing | null>(null)
  const [relatedWritings, setRelatedWritings] = useState<Writing[]>([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(0)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function fetchWritingAndRelated() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
        const res = await fetch(`${apiUrl}/writings/${writingId}`)
        if (!res.ok) throw new Error("Failed to fetch writing")
        const data = await res.json()
        setWriting(data)
        setLikes(data.likes_count || 0)

        const resAll = await fetch(`${apiUrl}/writings`)
        if (resAll.ok) {
          const allWritings: Writing[] = await resAll.json()
          const related = allWritings
            .filter((w) => w.author?.id === data.author?.id && w.id !== data.id)
            .slice(0, 3)
          setRelatedWritings(related)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchWritingAndRelated()
  }, [writingId])

  const handleLike = () => {
    if (!user) {
      openLoginModal() // 👈 if not logged in → ask login
      return
    }

    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)

    // optional — sync like to backend later
    // await fetch(`${apiUrl}/writings/${writingId}/like`, { method: "POST", headers: { Authorization: `Bearer ${user.token}` } })
  }

  const handleCommentClick = () => {
    if (!user) {
      openLoginModal()
      return
    }
    // scroll to comment section or open comment input
    const commentSection = document.getElementById("comments")
    if (commentSection) commentSection.scrollIntoView({ behavior: "smooth" })
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform: string) => {
    if (!writing) return
    const text = `Check out "${writing.title}" on Leekha`
    const url = window.location.href
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(writing.title)}&body=${encodeURIComponent(text + "\n" + url)}`,
    }
    if (platform === "twitter" || platform === "email") {
      window.open(shareUrls[platform as keyof typeof shareUrls], "_blank")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading writing...
      </div>
    )
  }

  if (!writing) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Writing not found.
      </div>
    )
  }

  return (
    <article className="min-h-screen bg-background relative">
      <BorderStickers position="left" />
      <BorderStickers position="right" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border/30">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => (onBack ? onBack() : router.back())}
            className="p-2 hover:bg-secondary/20 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="text-primary" />
          </button>
          <div className="flex-1">
            <h1 className="font-serif text-xl text-primary truncate">{writing.title}</h1>
          </div>
          <AmbientSoundToggle soundType="rain" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-16 relative z-10">
        {/* Title & Meta */}
        <div className="mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium mb-6 animate-fade-in-up">
            {writing.category}
          </div>

          <h1 className="font-serif text-5xl md:text-6xl text-primary mb-6 leading-tight animate-fade-in-up">
            {writing.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border/30 pb-8 animate-fade-in-up">
            <div className="flex items-center gap-2">
              {writing.author?.profile_image ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/${writing.author.profile_image}`}
                  alt={writing.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent" />
              )}
              <div>
                <p className="font-medium text-foreground">{writing.author?.name}</p>
                <p className="text-xs">{new Date(writing.created_at).toLocaleDateString("en-US")}</p>
              </div>
            </div>
            <span>•</span>
            <span>{writing.reading_time || "5"} min read</span>
          </div>
        </div>

        {/* Content */}
        {/* Content */}
        <article
          className="prose prose-invert max-w-none leading-relaxed mb-16 animate-fade-in-up"
          dangerouslySetInnerHTML={{ __html: writing?.content || "" }}
        />

        {/* <div className="prose prose-invert max-w-none mb-16">
          {writing.content
            ?.split("\n")
            .filter((p) => p.trim().length > 0)
            .map((paragraph, index) => (
              <p
                key={index}
                className="font-serif text-lg leading-relaxed text-foreground/90 mb-8 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {paragraph}
              </p>
            ))}
        </div> */}

        {/* Like / Share */}
        <div className="border-t border-b border-border/30 py-8 mb-12">
          <div className="flex items-center gap-8 mb-8">
            <button
              onClick={handleLike}
              className="flex items-center gap-3 text-muted-foreground hover:text-secondary transition-colors group"
            >
              <Heart
                size={24}
                className={`transition-all ${liked ? "fill-secondary text-secondary animate-heart-glow" : ""}`}
              />
              <span className="font-medium">{likes}</span>
            </button>

            <button
              onClick={handleCommentClick}
              className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageCircle size={24} />
              <span className="font-medium">Comments</span>
            </button>

            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors ml-auto"
            >
              <Share2 size={24} />
              <span className="font-medium">Share</span>
            </button>
          </div>

          {showShareOptions && (
            <div className="flex flex-wrap gap-3 animate-fade-in-up">
              <button
                onClick={() => handleShare("twitter")}
                className="px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm hover:bg-secondary/30 transition-colors"
              >
                Twitter
              </button>
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-full bg-primary/20 text-primary text-sm hover:bg-primary/30 transition-colors flex items-center gap-2"
              >
                <Copy size={16} />
                {copied ? "Copied!" : "Copy Link"}
              </button>
              <button
                onClick={() => handleShare("email")}
                className="px-4 py-2 rounded-full bg-accent/20 text-accent text-sm hover:bg-accent/30 transition-colors flex items-center gap-2"
              >
                <Mail size={16} />
                Email
              </button>
            </div>
          )}
        </div>

        {/* Comments */}
        <div id="comments">
          <CommentsSection writingId={writingId} />
        </div>

        {/* Related writings */}
        {relatedWritings.length > 0 && (
          <div className="mt-16 pt-12 border-t border-border/30">
            <h3 className="font-serif text-2xl text-primary mb-8 animate-fade-in-up">
              More from {writing.author?.name || "this author"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedWritings.map((related, i) => (
                <Link
                  key={related.id}
                  href={`/writings/${related.id}`}
                  className="card-paper p-6 hover:shadow-lg transition-all cursor-pointer group animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <h4 className="font-serif text-lg text-primary group-hover:text-accent transition-colors mb-2">
                    {related.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(related.created_at).toLocaleDateString("en-US")}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </article>
  )
}
