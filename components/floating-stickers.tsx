"use client"

import { useEffect, useState } from "react"

interface FloatingSticker {
  id: number
  emoji: string
  left: number
  top: number
  delay: number
  duration: number
}

export function FloatingStickers() {
  const [stickers, setStickers] = useState<FloatingSticker[]>([])

  useEffect(() => {
    const stickerEmojis = ["✨", "🌙", "⭐", "🪶", "☕", "🌹", "💫", "🎀", "📝", "🖋️"]
    const newStickers: FloatingSticker[] = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      emoji: stickerEmojis[Math.floor(Math.random() * stickerEmojis.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 4 + Math.random() * 2,
    }))
    setStickers(newStickers)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {stickers.map((sticker) => (
        <div
          key={sticker.id}
          className="absolute text-2xl animate-float opacity-20 hover:opacity-40 transition-opacity"
          style={{
            left: `${sticker.left}%`,
            top: `${sticker.top}%`,
            animationDelay: `${sticker.delay}s`,
            animationDuration: `${sticker.duration}s`,
          }}
        >
          {sticker.emoji}
        </div>
      ))}
    </div>
  )
}
