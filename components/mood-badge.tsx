"use client"

import { cn } from "@/lib/utils"

interface MoodBadgeProps {
  mood: string
  color?: string
  size?: "sm" | "md" | "lg"
}

const moodColors: Record<string, { bg: string; text: string; icon: string }> = {
  reflective: { bg: "bg-blue-100 dark:bg-blue-900", text: "text-blue-700 dark:text-blue-300", icon: "🤔" },
  melancholic: { bg: "bg-purple-100 dark:bg-purple-900", text: "text-purple-700 dark:text-purple-300", icon: "💜" },
  hopeful: { bg: "bg-yellow-100 dark:bg-yellow-900", text: "text-yellow-700 dark:text-yellow-300", icon: "✨" },
  passionate: { bg: "bg-rose-100 dark:bg-rose-900", text: "text-rose-700 dark:text-rose-300", icon: "🔥" },
  peaceful: { bg: "bg-green-100 dark:bg-green-900", text: "text-green-700 dark:text-green-300", icon: "🌿" },
  nostalgic: { bg: "bg-amber-100 dark:bg-amber-900", text: "text-amber-700 dark:text-amber-300", icon: "📸" },
  whimsical: { bg: "bg-pink-100 dark:bg-pink-900", text: "text-pink-700 dark:text-pink-300", icon: "🎀" },
  introspective: { bg: "bg-indigo-100 dark:bg-indigo-900", text: "text-indigo-700 dark:text-indigo-300", icon: "🌙" },
}

export function MoodBadge({ mood, size = "md" }: MoodBadgeProps) {
  const moodData = moodColors[mood.toLowerCase()] || moodColors.reflective
  const sizeClass = size === "sm" ? "px-2 py-1 text-xs" : size === "lg" ? "px-4 py-2 text-base" : "px-3 py-1.5 text-sm"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium transition-all hover:scale-105",
        moodData.bg,
        moodData.text,
        sizeClass,
      )}
    >
      <span>{moodData.icon}</span>
      <span className="capitalize">{mood}</span>
    </span>
  )
}
