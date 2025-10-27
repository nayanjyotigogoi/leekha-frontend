"use client"

import { useEffect, useState } from "react"
import { WritingCard } from "./writing-card"
import { DecorativeDivider } from "./decorative-divider"

export interface Writing {
  id: number
  title: string
  preview: string
  date: string
  category: string
  likes: number
  content: string
}

export function WritingsGrid() {
  const [writings, setWritings] = useState<Writing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWritings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/writings`)
        if (!res.ok) throw new Error(`Failed to fetch writings: ${res.status}`)
        const data = await res.json()

        const mapped: Writing[] = data.map((w: any) => ({
          id: w.id,
          title: w.title,
          preview:
            w.preview || (w.content ? w.content.replace(/<[^>]+>/g, "").substring(0, 100) + "..." : ""),
          date: new Date(w.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          category: w.category || "Uncategorized",
          likes: w.likes_count || 0,
          content: w.content || "",
        }))

        setWritings(mapped)
      } catch (err: any) {
        console.error("Error fetching writings:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWritings()
  }, [])

  if (loading) return <p className="text-center py-20">Loading writings...</p>
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>
  if (!writings.length) return <p className="text-center py-20">No writings found.</p>

  return (
    <section className="py-20 px-6 bg-background relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">Recent Writings</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
            Explore the latest thoughts, stories, and reflections.
          </p>
          <DecorativeDivider variant="flowers" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {writings.map((writing) => (
            <WritingCard key={writing.id} writing={writing} />
          ))}
        </div>
      </div>
    </section>
  )
}
