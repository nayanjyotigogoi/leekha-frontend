"use client"

import Link from "next/link"
import { useState } from "react"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { Writing } from "./writings-grid"

interface WritingCardProps {
  writing: Writing
}

export function WritingCard({ writing }: WritingCardProps) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(writing.likes)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  return (
    <Link href={`/writings/${writing.id}`}>
      <article className="card-paper p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
        <div className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium mb-4">
          {writing.category}
        </div>

        <h3 className="font-serif text-2xl text-primary mb-3 group-hover:text-accent transition-colors">
          {writing.title}
        </h3>

        <p className="text-foreground/70 leading-relaxed mb-6 line-clamp-3">{writing.preview}</p>

        <p className="text-sm text-muted-foreground mb-6">{writing.date}</p>

        <div className="flex items-center gap-6 pt-6 border-t border-border/30">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors group/btn"
          >
            <Heart
              size={20}
              className={`transition-all ${liked ? "fill-secondary text-secondary animate-heart-glow" : ""}`}
            />
            <span className="text-sm">{likes}</span>
          </button>

          <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <MessageCircle size={20} />
            <span className="text-sm">Comment</span>
          </button>

          <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors ml-auto">
            <Share2 size={20} />
          </button>
        </div>
      </article>
    </Link>
  )
}
