"use client"

interface ReadingStatsProps {
  readTime: string
  wordCount?: number
  category?: string
}

export function ReadingStats({ readTime, wordCount, category }: ReadingStatsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
      {category && (
        <div className="flex items-center gap-2">
          <span className="text-accent">📚</span>
          <span>{category}</span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <span className="text-secondary">⏱️</span>
        <span>{readTime}</span>
      </div>
      {wordCount && (
        <div className="flex items-center gap-2">
          <span className="text-primary">✍️</span>
          <span>{wordCount.toLocaleString()} words</span>
        </div>
      )}
    </div>
  )
}
