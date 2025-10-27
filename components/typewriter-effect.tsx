"use client"

import { useEffect, useState } from "react"

interface TypewriterEffectProps {
  text: string
  speed?: number
  className?: string
}

export function TypewriterEffect({ text, speed = 50, className = "" }: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index])
        setIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    }
  }, [index, text, speed])

  return (
    <span className={className}>
      {displayedText}
      {index < text.length && <span className="animate-pulse">|</span>}
    </span>
  )
}
