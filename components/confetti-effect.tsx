"use client"

import { useEffect, useState } from "react"

interface ConfettiPiece {
  id: number
  left: number
  delay: number
  duration: number
  color: string
}

export function ConfettiEffect({ trigger }: { trigger: boolean }) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (!trigger) return

    const colors = ["#d4a5a5", "#2c3e50", "#d4af37", "#f0d9d9", "#e8f0f5"]
    const pieces = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.2,
      duration: 2 + Math.random() * 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    setConfetti(pieces)

    const timer = setTimeout(() => setConfetti([]), 3000)
    return () => clearTimeout(timer)
  }, [trigger])

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 rounded-full animate-fall"
          style={{
            left: `${piece.left}%`,
            top: "-10px",
            backgroundColor: piece.color,
            animation: `fall ${piece.duration}s linear ${piece.delay}s forwards`,
          }}
        />
      ))}
    </div>
  )
}
