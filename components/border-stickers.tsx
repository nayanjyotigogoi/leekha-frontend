"use client"

interface BorderStickersProps {
  position: "left" | "right"
}

export function BorderStickers({ position }: BorderStickersProps) {
  const stickers = ["✨", "🪶", "⭐", "🌙", "☕", "🌹", "💫"]

  return (
    <div
      className={`absolute top-0 bottom-0 w-16 pointer-events-none flex flex-col justify-around items-center ${
        position === "left" ? "left-4" : "right-4"
      }`}
    >
      {stickers.map((sticker, i) => (
        <div
          key={i}
          className="text-2xl opacity-30 hover:opacity-50 transition-opacity animate-float"
          style={{
            animationDelay: `${i * 0.3}s`,
          }}
        >
          {sticker}
        </div>
      ))}
    </div>
  )
}
