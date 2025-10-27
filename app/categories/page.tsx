"use client"

import { useEffect, useState } from "react"
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
    slug: string
    writings: Writing[]
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
                const data = await res.json()
                setCategories(data)
            } catch (err) {
                console.error("Failed to load categories:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchCategories()
    }, [])

    if (loading) return <p className="text-center mt-20 text-muted-foreground">Loading categories...</p>

    return (
        <section className="min-h-screen bg-background text-foreground py-24 px-6">
            <div className="max-w-5xl mx-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-serif text-4xl md:text-5xl text-primary mb-8"
                >
                    Categories
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-muted-foreground mb-12"
                >
                    Explore writings by theme — find the emotion that speaks to you most.
                </motion.p>

                <div className="flex flex-wrap justify-center gap-6">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="px-8 py-4 border border-border/40 rounded-full text-primary hover:bg-primary/10 transition-all cursor-pointer"
                        >
                            <Link href={`/categories/${cat.slug}`}>{cat.name}</Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
