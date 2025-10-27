"use client"

import { Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

const whispers = [
  "The quietest words often echo the loudest within.",
  "You don’t find peace in silence — you create it.",
  "Some hearts speak only when written.",
  "Every line you read changes a small part of you.",
  "Even pauses between words carry meaning.",
  "Your story begins where certainty ends.",
  "In every reflection lies a hidden truth.",
  "The page listens, even when no one else does.",
]

export function WhispersOfTheDay() {
  const [quote, setQuote] = useState("")

  useEffect(() => {
    // pick a stable quote for the day (changes daily)
    const today = new Date().toISOString().split("T")[0]
    const hash = today.split("-").reduce((acc, v) => acc + parseInt(v), 0)
    const quoteOfTheDay = whispers[hash % whispers.length]
    setQuote(quoteOfTheDay)
  }, [])

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
          <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400" />
        </div>

        <div className="flex-1">
          <h3 className="font-serif text-lg text-foreground mb-1">Whispers of the Day</h3>
          <p className="text-sm text-muted-foreground">A line to linger with you today</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-amber-200 dark:border-amber-800">
        <p className="font-serif text-base italic text-foreground leading-relaxed text-center">
          “{quote}”
        </p>
      </div>
    </div>
  )
}
