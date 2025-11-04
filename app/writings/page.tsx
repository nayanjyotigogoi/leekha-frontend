"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";

interface Writing {
    id: string;
    title: string;
    content: string;
    category: string;
    likes_count: number;
}

interface Comment {
    id: number;
    author_name?: string;
    content: string;
    created_at: string;
}

export default function WritingDetailPage() {
    const { id } = useParams();
    const [writing, setWriting] = useState<Writing | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [commentText, setCommentText] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch writing + comments
    useEffect(() => {
        if (!id) return;
        async function fetchData() {
            try {
                const [writingRes, commentsRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/writings/${id}`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`),
                ]);

                const writingData = await writingRes.json();
                const commentData = await commentsRes.json();

                setWriting(writingData);
                setComments(commentData);
                setLikesCount(writingData.likes_count || 0);
            } catch (err) {
                console.error("Failed to load writing:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    // Like handler (guest-friendly)
    const handleLike = async () => {
        setLiked((prev) => !prev);
        setLikesCount((prev) => (liked ? prev - 1 : prev + 1));

        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/likes`, {
                method: liked ? "DELETE" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    target_type: "App\\Models\\Writing",
                    target_id: id,
                }),
            });
        } catch (err) {
            console.error("Failed to toggle like:", err);
        }
    };

    // Post comment
    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        const payload = {
            writing_id: id,
            author_name: "Guest",
            content: commentText,
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const newComment = await res.json();
            setComments((prev) => [newComment, ...prev]);
            setCommentText("");
        } catch (err) {
            console.error("Failed to post comment:", err);
        }
    };

    if (loading) return <p className="text-center py-20 text-muted-foreground">Loading...</p>;
    if (!writing) return <p className="text-center py-20 text-muted-foreground">Writing not found.</p>;

    return (
        <section className="min-h-screen bg-background text-foreground py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-serif text-4xl md:text-5xl text-primary mb-4"
                >
                    {writing.title}
                </motion.h1>

                <p className="text-muted-foreground mb-6 text-sm">
                    Category: <span className="text-primary">{writing.category}</span>
                </p>

                <article
  className="prose prose-invert max-w-none leading-relaxed mb-12"
  dangerouslySetInnerHTML={{ __html: writing?.content || "" }}
/>


                {/* Like button */}
                <div className="flex items-center gap-3 mb-12">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-full transition ${liked ? "text-red-500 border-red-400" : "text-muted-foreground hover:text-primary"
                            }`}
                    >
                        <Heart size={20} className={liked ? "fill-red-500" : ""} />
                        {likesCount} Likes
                    </button>

                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MessageCircle size={20} />
                        <span>{comments.length} Comments</span>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="border-t border-border/30 pt-8">
                    <h2 className="text-xl font-semibold text-primary mb-4">Comments</h2>

                    {/* Comment Form */}
                    <form onSubmit={handleCommentSubmit} className="mb-6">
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write your thoughts..."
                            className="w-full p-3 border border-border/40 rounded-lg bg-background focus:ring-2 focus:ring-primary/50"
                            rows={3}
                        />
                        <button
                            type="submit"
                            className="mt-3 px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                        >
                            Post Comment
                        </button>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-6 text-left">
                        {comments.length === 0 ? (
                            <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
                        ) : (
                            comments.map((c) => (
                                <div key={c.id} className="p-4 border border-border/20 rounded-lg">
                                    <p className="font-medium text-primary">{c.author_name || "Guest"}</p>
                                    <p className="text-sm text-muted-foreground mt-1">{c.content}</p>
                                    <p className="text-xs text-muted-foreground mt-2">{new Date(c.created_at).toLocaleString()}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
