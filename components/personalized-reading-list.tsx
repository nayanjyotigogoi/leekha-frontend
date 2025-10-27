"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Bookmark, BookMarked as BookmarkOff, Clock, Eye, BookOpen } from "lucide-react"

interface Author {
  id: number
  name: string
  profile_image?: string
}

interface Writing {
  id: number
  title: string
  category: string
  reading_time: number
  preview?: string
  progress?: number
  is_saved?: boolean
  author: Author
}

export function PersonalizedReadingList() {
  const [continueReading, setContinueReading] = useState<Writing | null>(null)
  const [savedReadings, setSavedReadings] = useState<Writing[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/personalized-readings`)
        if (!res.ok) throw new Error("Failed to fetch readings")
        const data = await res.json()

        setContinueReading(data.continue_reading || null)
        setSavedReadings(data.latest_writings || [])
      } catch (error) {
        console.error("Error fetching personalized readings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const toggleSave = (id: number) => {
    setSavedReadings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_saved: !item.is_saved } : item
      )
    )
  }

  // 👇 Navigate to your actual writing route
  const handleRead = (id: number) => {
    router.push(`/writings/${id}`)
  }

  if (loading) {
    return (
      <div className="text-center text-muted-foreground py-10">
        Loading personalized readings...
      </div>
    )
  }

  if (!continueReading && savedReadings.length === 0) {
    return (
      <div className="text-center py-12">
        <Eye className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
        <p className="text-muted-foreground">
          No saved readings yet. Start exploring and save your favorites!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Continue Reading */}
      {continueReading && (
        <div>
          <h3 className="font-serif text-2xl text-foreground mb-6">
            Continue Reading
          </h3>
          <div
            className="bg-card rounded-lg p-4 border border-border/50 hover:shadow-md transition-shadow animate-fade-in-up cursor-pointer"
            onClick={() => handleRead(continueReading.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-serif text-lg text-foreground">
                  {continueReading.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {continueReading.author?.name}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleSave(continueReading.id)
                }}
                className="p-2 hover:bg-secondary/20 rounded-lg transition-colors"
              >
                {continueReading.is_saved ? (
                  <Bookmark className="w-5 h-5 text-secondary fill-secondary" />
                ) : (
                  <BookmarkOff className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-border rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                style={{ width: `${continueReading.progress || 35}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                {continueReading.progress || 35}% complete
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleRead(continueReading.id)
                }}
                className="text-primary text-sm font-medium flex items-center gap-1 hover:underline"
              >
                <BookOpen className="w-4 h-4" /> Read Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Readings */}
      {savedReadings.length > 0 && (
        <div>
          <h3 className="font-serif text-2xl text-foreground mb-6">
            Stories You’ll Enjoy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedReadings.map((item, idx) => (
              <div
                key={item.id}
                className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg p-5 border border-border/50 hover:shadow-md transition-all hover:scale-105 animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${idx * 50}ms` }}
                onClick={() => handleRead(item.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-serif text-lg text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {item.author?.name}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSave(item.id)
                    }}
                    className="p-2 hover:bg-secondary/20 rounded-lg transition-colors"
                  >
                    {item.is_saved ? (
                      <Bookmark className="w-5 h-5 text-secondary fill-secondary" />
                    ) : (
                      <BookmarkOff className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{item.reading_time} min</span>
                  </div>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {item.category}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRead(item.id)
                  }}
                  className="mt-4 text-primary text-sm font-medium flex items-center gap-1 hover:underline"
                >
                  {/* <BookOpen className="w-4 h-4" /> Read Now */}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
