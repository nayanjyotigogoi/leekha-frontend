"use client"

interface QuoteHighlightProps {
  text: string
  author?: string
}

export function QuoteHighlight({ text, author }: QuoteHighlightProps) {
  return (
    <div className="relative py-8 px-6 bg-gradient-to-r from-secondary/10 via-accent/10 to-secondary/10 rounded-lg border-l-4 border-secondary overflow-hidden group">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full" />

      <blockquote className="relative z-10">
        <p className="font-serif text-xl text-foreground italic mb-3">{text}</p>
        {author && <p className="font-script text-lg text-secondary">— {author}</p>}
      </blockquote>
    </div>
  )
}
