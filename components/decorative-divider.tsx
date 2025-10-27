"use client"

interface DecorativeDividerProps {
  variant?: "dots" | "dashes" | "flowers" | "stars"
  className?: string
}

export function DecorativeDivider({ variant = "dots", className = "" }: DecorativeDividerProps) {
  const patterns = {
    dots: "· · · · · · ·",
    dashes: "— — — — — —",
    flowers: "✿ ✿ ✿ ✿ ✿",
    stars: "✦ ✦ ✦ ✦ ✦",
  }

  return (
    <div className={`text-center text-muted-foreground text-sm tracking-widest ${className}`}>{patterns[variant]}</div>
  )
}
