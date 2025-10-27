"use client"

import { useEffect, useState } from "react"

export function InteractiveCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <>
      {isVisible && (
        <div
          className="fixed pointer-events-none z-50 mix-blend-screen"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-8 h-8 rounded-full border-2 border-secondary/40 animate-pulse" />
          <div className="absolute inset-0 w-8 h-8 rounded-full bg-secondary/10 blur-md" />
        </div>
      )}
    </>
  )
}
