"use client"

import { useState } from "react"
import { Heart, Reply } from "lucide-react"

interface Comment {
  id: string
  author: string
  avatar: string
  date: string
  text: string
  likes: number
  replies: Comment[]
}

interface CommentsSectionProps {
  writingId: string
}

export function CommentsSection({ writingId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Sarah",
      avatar: "S",
      date: "2 days ago",
      text: "This piece resonated deeply with me. The way you capture the intimacy of the night is truly beautiful. Thank you for sharing this.",
      likes: 24,
      replies: [
        {
          id: "1-1",
          author: "Leekha",
          avatar: "L",
          date: "1 day ago",
          text: "Thank you, Sarah. Your words mean everything to me. The night speaks to those who listen.",
          likes: 8,
          replies: [],
        },
      ],
    },
    {
      id: "2",
      author: "Marcus",
      avatar: "M",
      date: "1 day ago",
      text: "I found myself lost in every word. The poetry here is not just beautiful—it's healing.",
      likes: 18,
      replies: [],
    },
    {
      id: "3",
      author: "Elena",
      avatar: "E",
      date: "12 hours ago",
      text: "The stars have always been my companions too. This felt like reading my own heart.",
      likes: 31,
      replies: [],
    },
  ])

  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set())

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: "You",
        avatar: "Y",
        date: "now",
        text: newComment,
        likes: 0,
        replies: [],
      }
      setComments([comment, ...comments])
      setNewComment("")
    }
  }

  const handleAddReply = (commentId: string) => {
    if (replyText.trim()) {
      setComments(
        comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: `${commentId}-${Date.now()}`,
                  author: "You",
                  avatar: "Y",
                  date: "now",
                  text: replyText,
                  likes: 0,
                  replies: [],
                },
              ],
            }
          }
          return comment
        }),
      )
      setReplyText("")
      setReplyingTo(null)
    }
  }

  const toggleLike = (commentId: string) => {
    const newLiked = new Set(likedComments)
    if (newLiked.has(commentId)) {
      newLiked.delete(commentId)
    } else {
      newLiked.add(commentId)
    }
    setLikedComments(newLiked)
  }

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div key={comment.id} className={`${isReply ? "ml-8 mt-4" : "mb-6"}`}>
      <div className="card-paper p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex-shrink-0 flex items-center justify-center text-sm font-medium text-foreground">
            {comment.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-medium text-foreground">{comment.author}</p>
              <p className="text-xs text-muted-foreground">{comment.date}</p>
            </div>
          </div>
        </div>

        <p className="text-foreground/80 leading-relaxed mb-4">{comment.text}</p>

        <div className="flex items-center gap-6">
          <button
            onClick={() => toggleLike(comment.id)}
            className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors"
          >
            <Heart
              size={16}
              className={`transition-all ${likedComments.has(comment.id) ? "fill-secondary text-secondary" : ""}`}
            />
            <span className="text-sm">{comment.likes}</span>
          </button>

          <button
            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Reply size={16} />
            <span className="text-sm">Reply</span>
          </button>
        </div>

        {/* Reply input */}
        {replyingTo === comment.id && (
          <div className="mt-6 pt-6 border-t border-border/30">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="w-full h-16 bg-transparent text-foreground placeholder-muted-foreground resize-none focus:outline-none border-b border-border/30 pb-3 mb-3"
            />
            <div className="flex gap-3">
              <button
                onClick={() => handleAddReply(comment.id)}
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:shadow-lg transition-all"
              >
                Reply
              </button>
              <button
                onClick={() => setReplyingTo(null)}
                className="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium hover:bg-muted/80 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Nested replies */}
      {comment.replies.map((reply) => (
        <CommentItem key={reply.id} comment={reply} isReply={true} />
      ))}
    </div>
  )

  return (
    <section className="py-12">
      <h3 className="font-serif text-3xl text-primary mb-8">Reflections & Responses</h3>

      {/* Comment input */}
      <div className="card-paper p-8 mb-12">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your reflection on this piece..."
          className="w-full h-24 bg-transparent text-foreground placeholder-muted-foreground resize-none focus:outline-none border-b border-border/30 pb-4 mb-4"
        />
        <button
          onClick={handleAddComment}
          className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-lg transition-all"
        >
          Post Reflection
        </button>
      </div>

      {/* Comments list */}
      <div>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  )
}
