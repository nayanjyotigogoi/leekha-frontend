"use client"

import { useEffect, useState } from "react"

export function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(212, 165, 165, 0.3) 0%, transparent 50%)`,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-3"
        style={{
          backgroundImage: `radial-gradient(circle at 80% 80%, rgba(44, 62, 80, 0.2) 0%, transparent 50%)`,
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-4"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 20%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)`,
          transform: `translateY(${scrollY * 0.7}px)`,
        }}
      />
    </div>
  )
}
