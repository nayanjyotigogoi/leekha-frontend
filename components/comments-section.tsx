"use client"

import { useEffect, useState, useContext } from "react"
import { Heart, Reply } from "lucide-react"
import { AuthContext } from "@/context/AuthContext"

interface Comment {
  id: number
  author_name: string
  author_email?: string
  content: string
  likes_count?: number
  replies?: Comment[]
  created_at?: string
}

interface CommentsSectionProps {
  writingId: number | string
}

export function CommentsSection({ writingId }: CommentsSectionProps) {
  const { user, openLoginModal } = useContext(AuthContext)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set())

  // ✅ Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${writingId}`, {
          method: "GET",
          headers: { Accept: "application/json" },
          credentials: "include",
        })
        if (!res.ok) throw new Error("Failed to fetch comments")
        const data = await res.json()
        setComments(data)
      } catch (err) {
        console.error("Error fetching comments:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [writingId])

  // ✅ Post new comment
  const handleAddComment = async () => {
  if (!user) {
    openLoginModal(); // open your login popup if user not logged in
    return;
  }

  if (!newComment.trim()) return;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        writing_id: writingId,
        parent_id: null,
        author_name: user.name, //  directly from AuthContext
        author_email: user.email,
        content: newComment,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Failed to post comment:", err);
      throw new Error(err.message || "Failed to post comment");
    }

    const created = await res.json();
    setComments([created, ...comments]);
    setNewComment("");
  } catch (err) {
    console.error("Error posting comment:", err);
  }
};



  // ✅ Post reply
  const handleAddReply = async (commentId: number) => {
    if (!user) return openLoginModal()
    if (!replyText.trim()) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          writing_id: writingId,
          parent_id: commentId,
          author_name: user.name,
          author_email: user.email,
          content: replyText,
        }),
      })

      if (!res.ok) throw new Error("Failed to post reply")

      const created = await res.json()
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...(comment.replies || []), created] }
            : comment
        )
      )
      setReplyText("")
      setReplyingTo(null)
    } catch (err) {
      console.error("Error posting reply:", err)
    }
  }

  // ✅ Like toggle (client-side visual only)
  const toggleLike = (commentId: number) => {
    const updatedLikes = new Set(likedComments)
    if (updatedLikes.has(commentId)) updatedLikes.delete(commentId)
    else updatedLikes.add(commentId)
    setLikedComments(updatedLikes)
  }

  // ✅ Render comment (recursive)
  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div key={comment.id} className={`${isReply ? "ml-8 mt-4" : "mb-6"}`}>
      <div className="card-paper p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex-shrink-0 flex items-center justify-center text-sm font-medium text-foreground">
            {comment.author_name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-medium text-foreground">{comment.author_name}</p>
              <p className="text-xs text-muted-foreground">
                {comment.created_at ? new Date(comment.created_at).toLocaleDateString() : "now"}
              </p>
            </div>
          </div>
        </div>

        <p className="text-foreground/80 leading-relaxed mb-4">{comment.content}</p>

        <div className="flex items-center gap-6">
          <button
            onClick={() => toggleLike(comment.id)}
            className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors"
          >
            <Heart
              size={16}
              className={`transition-all ${likedComments.has(comment.id) ? "fill-secondary text-secondary" : ""}`}
            />
            <span className="text-sm">{comment.likes_count || 0}</span>
          </button>

          <button
            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Reply size={16} />
            <span className="text-sm">Reply</span>
          </button>
        </div>

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

      {comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} isReply />
      ))}
    </div>
  )

  // ✅ Render section
  return (
    <section className="py-12">
      <h3 className="font-serif text-3xl text-primary mb-8">Reflections & Responses</h3>

      <div className="card-paper p-8 mb-12">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={
            user
              ? "Share your reflection on this piece..."
              : "Please log in to share your reflection..."
          }
          disabled={!user}
          className="w-full h-24 bg-transparent text-foreground placeholder-muted-foreground resize-none focus:outline-none border-b border-border/30 pb-4 mb-4"
        />
        <button
          onClick={handleAddComment}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            user
              ? "bg-primary text-primary-foreground hover:shadow-lg"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {user ? "Post Reflection" : "Log in to Comment"}
        </button>
      </div>

      {loading ? (
        <p className="text-muted-foreground text-center">Loading reflections...</p>
      ) : comments.length === 0 ? (
        <p className="text-muted-foreground text-center">
          No reflections yet. Be the first to share one.
        </p>
      ) : (
        <div>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </section>
  )
}
