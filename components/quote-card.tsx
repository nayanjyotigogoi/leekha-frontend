"use client"

interface QuoteCardProps {
  quote: string
  author?: string
  className?: string
}

export function QuoteCard({ quote, author, className = "" }: QuoteCardProps) {
  return (
    <div className={`card-paper p-8 border-l-4 border-secondary ${className}`}>
      <p className="font-serif text-lg italic text-foreground/80 mb-4">"{quote}"</p>
      {author && <p className="font-script text-primary text-right">— {author}</p>}
    </div>
  )
}
