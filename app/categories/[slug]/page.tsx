"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"

interface Writing {
    id: number
    title: string
    excerpt: string
}

interface Category {
    id: number
    name: string
    writings: Writing[]
}

export default function CategoryDetailPage() {
    const { slug } = useParams()
    const [category, setCategory] = useState<Category | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchCategory() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${slug}`)
                const data = await res.json()
                setCategory(data)
            } catch (err) {
                console.error("Failed to load category:", err)
            } finally {
                setLoading(false)
            }
        }
        if (slug) fetchCategory()
    }, [slug])

    if (loading) return <p className="text-center mt-20 text-muted-foreground">Loading category...</p>
    if (!category) return <p className="text-center mt-20 text-muted-foreground">Category not found.</p>

    return (
        <section className="min-h-screen bg-background text-foreground py-24 px-6">
            <div className="max-w-5xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-serif text-4xl text-primary mb-8 text-center"
                >
                    {category.name}
                </motion.h1>

                {category.writings.length === 0 ? (
                    <p className="text-center text-muted-foreground">No writings in this category yet.</p>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {category.writings.map((writing, i) => (
                            <motion.div
                                key={writing.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="p-6 border border-border/30 rounded-2xl hover:border-primary/40 transition-all"
                            >
                                <h3 className="font-serif text-xl text-primary mb-2">{writing.title}</h3>
                                <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{writing.excerpt}</p>
                                <Link
                                    href={`/writings/${writing.id}`}
                                    className="text-primary hover:underline text-sm font-medium"
                                >
                                    Read More →
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
