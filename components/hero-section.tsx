"use client"

import { useEffect, useState } from "react"

export function HeroSection() {
  const [displayedText, setDisplayedText] = useState("")
  const fullText = "Every word carries a piece of the soul."
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1))
      }, 50)
      return () => clearTimeout(timer)
    } else {
      setIsComplete(true)
    }
  }, [displayedText])

  const handleScrollToWritings = () => {
    const writingsSection = document.getElementById("writings-section")
    if (writingsSection) {
      writingsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-secondary/5">
      {/* Floating stickers background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-4xl opacity-20 animate-float">✨</div>
        <div
          className="absolute top-32 right-20 text-5xl opacity-15 animate-float"
          style={{ animationDelay: "1s" }}
        >
          🌙
        </div>
        <div
          className="absolute bottom-32 left-1/4 text-4xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        >
          🪶
        </div>
        <div
          className="absolute bottom-20 right-1/3 text-5xl opacity-15 animate-float"
          style={{ animationDelay: "1.5s" }}
        >
          ☕
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="font-serif text-5xl md:text-7xl text-primary mb-8 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
            Leekha
          </span>
        </h1>

        {/* Typewriter quote */}
        <div className="mb-12 min-h-24 flex items-center justify-center">
          <p className="font-serif text-2xl md:text-3xl text-foreground/80 italic leading-relaxed">
            "{displayedText}"{!isComplete && <span className="animate-pulse">|</span>}
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
          A digital sanctuary for creative writings, poetry, and heartfelt notes. Where every word finds its home.
        </p>

        {/* CTA Button */}
        <button
          onClick={handleScrollToWritings}
          className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          Explore Writings
        </button>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
    </section>
  )
}
