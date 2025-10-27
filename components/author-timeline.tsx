"use client"

import { useRouter } from "next/navigation"
import { Calendar, BookOpen, Award } from "lucide-react"
import type React from "react"

interface TimelineEvent {
  id?: string              // 🔹 Add optional id to link it with writings
  date: string
  title: string
  description: string
  type: "milestone" | "publication" | "achievement"
  icon?: React.ReactNode
}

interface AuthorTimelineProps {
  events: TimelineEvent[]
}

export function AuthorTimeline({ events }: AuthorTimelineProps) {
  const router = useRouter()

  const getIcon = (type: string) => {
    switch (type) {
      case "publication":
        return <BookOpen className="w-5 h-5" />
      case "achievement":
        return <Award className="w-5 h-5" />
      default:
        return <Calendar className="w-5 h-5" />
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case "publication":
        return "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
      case "achievement":
        return "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300"
      default:
        return "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
    }
  }

  const handleClick = (id?: string) => {
    if (!id) return
    // 🔹 Navigate to that writing page
    router.push(`/writings/${id}`)
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl text-foreground mb-2">My Journey</h2>
        <p className="text-muted-foreground">A timeline of moments that shaped my writing</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/20 to-secondary/20" />

        {/* Timeline events */}
        <div className="space-y-12">
          {events.map((event, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(event.id)}
              className={`flex ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"} gap-8 items-center animate-fade-in-up cursor-pointer`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Content */}
              <div className="flex-1">
                <div className="bg-card rounded-lg p-6 border border-border/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-muted-foreground">{event.date}</span>
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-2">{event.title}</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </div>

              {/* Timeline dot */}
              <div className="flex-shrink-0 flex justify-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${getColor(event.type)} border-4 border-background shadow-lg`}
                >
                  {getIcon(event.type)}
                </div>
              </div>

              <div className="flex-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
