"use client"

import { useEffect, useState } from "react"
import { BookOpen, Clock, Heart, MessageCircle } from "lucide-react"

interface ReadingStats {
  totalReadings: number
  totalMinutes: number
  favoriteCount: number
  commentsCount: number
}

function CountUp({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = target / (duration / 16) // ~60fps
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])

  return <>{count.toLocaleString()}</>
}

export function ReadingStatsDashboard() {
  const [stats, setStats] = useState<ReadingStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reading-stats`, {
          cache: "no-store",
        })
        if (!res.ok) throw new Error("Failed to fetch stats")
        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.error("Failed to fetch reading stats:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading)
    return <p className="text-center py-10 text-muted-foreground animate-pulse">Loading stats...</p>

  if (!stats)
    return <p className="text-center py-10 text-muted-foreground">No data available.</p>

  const statItems = [
    {
      icon: BookOpen,
      label: "Readings",
      value: stats.totalReadings,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: Clock,
      label: "Minutes Read",
      value: stats.totalMinutes,
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      icon: Heart,
      label: "Favorites",
      value: stats.favoriteCount,
      color: "text-rose-500",
      bgColor: "bg-rose-50 dark:bg-rose-900/20",
    },
    {
      icon: MessageCircle,
      label: "Comments",
      value: stats.commentsCount,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((item, idx) => {
        const Icon = item.icon
        return (
          <div
            key={idx}
            className={`${item.bgColor} rounded-xl p-4 text-center hover:scale-105 transition-transform duration-300 animate-fade-in-up`}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <Icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
            <p className="text-2xl font-bold text-foreground">
              <CountUp target={item.value} />
            </p>
            <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
          </div>
        )
      })}
    </div>
  )
}
