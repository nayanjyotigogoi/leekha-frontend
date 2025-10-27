"use client"

import { useEffect, useState } from "react"

export function AnimatedPageTransition() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent animate-fade-out" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-secondary border-t-accent rounded-full animate-spin" />
      </div>
    </div>
  )
}
