"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeaturedWriting {
  id: number
  title: string
  excerpt?: string
  mood?: string
  reading_time?: number
  likes_count?: number
  image?: string
}

export function FeaturedCarousel() {
  const [writings, setWritings] = useState<FeaturedWriting[]>([])
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [loading, setLoading] = useState(true)

  // local fallback images
  const fallbackImages = ["/image_1.jpg", "/image-2.jpg", "/image-3.jpg"]

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/writings/top-liked`)
        if (!res.ok) throw new Error("Failed to fetch featured writings")

        const data = await res.json()

        // ✅ Assign fallback images sequentially
        const updated = data.map((item: FeaturedWriting, index: number) => ({
          ...item,
          image: fallbackImages[index % fallbackImages.length],
        }))

        setWritings(updated)
      } catch (err) {
        console.error("Error loading featured writings:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeatured()
  }, [])

  useEffect(() => {
    if (!autoPlay || writings.length === 0) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % writings.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoPlay, writings.length])

  const next = () => {
    setCurrent((prev) => (prev + 1) % writings.length)
    setAutoPlay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + writings.length) % writings.length)
    setAutoPlay(false)
  }

  if (loading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-muted-foreground">
        Loading featured stories...
      </div>
    )
  }

  if (!writings.length) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-muted-foreground">
        No featured writings found.
      </div>
    )
  }

  const featured = writings[current]

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/20 p-8 md:p-12">
      <div className="grid gap-8 md:grid-cols-2 items-center">
        {/* Left side - Content */}
        <div className="space-y-6 animate-fade-in-up">
          <div className="space-y-3">
            <p className="text-sm font-medium text-accent uppercase tracking-widest">
              Featured Writing
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
              {featured.title}
            </h2>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {featured.excerpt || "No excerpt available for this story."}
          </p>

          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                {featured.mood === "reflective" ? "🤔" : "✨"}
              </span>
              <span className="text-sm font-medium capitalize">
                {featured.mood || "Creative"}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {featured.reading_time || 5} min read
            </span>
            <span className="text-sm text-muted-foreground">
              ❤️ {featured.likes_count || 0} likes
            </span>
          </div>

          <a
            href={`/writings/${featured.id}`}
            className="mt-6 inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Read Now
          </a>
        </div>

        {/* Right side - Image */}
        <div className="relative h-80 rounded-xl overflow-hidden">
          <img
            src={featured.image}
            alt={featured.title}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <div className="flex gap-2">
          {writings.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrent(idx)
                setAutoPlay(false)
              }}
              className={cn(
                "h-2 rounded-full transition-all",
                idx === current ? "w-8 bg-primary" : "w-2 bg-border"
              )}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={prev}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
