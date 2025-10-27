"use client"

import { useEffect, useState } from "react"

const quotes = [
  "Every word carries a piece of the soul.",
  "In silence, the heart speaks loudest.",
  "Poetry is the language of the heart.",
  "Words are the paint of the mind.",
  "Emotions find their home in writing.",
]

export function AnimatedQuoteCarousel() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length)
        setIsVisible(true)
      }, 500)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center py-12">
      <div
        className={`font-serif text-2xl md:text-3xl text-secondary italic transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        "{quotes[currentQuote]}"
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {quotes.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentQuote ? "w-8 bg-secondary" : "w-2 bg-secondary/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
