"use client"

import { motion } from "framer-motion"

export default function AboutPage() {
    return (
        <section className="min-h-screen bg-background text-foreground py-24 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-serif text-4xl md:text-5xl text-primary mb-8"
                >
                    About Leekha
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-muted-foreground text-lg leading-relaxed mb-10"
                >
                    Leekha is more than just a collection of words — it’s a quiet space where emotions find
                    language. Built with love for writing, art, and the small moments that make us human.
                    Every story here is original, heartfelt, and written to resonate.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm text-muted-foreground italic"
                >
                    “In every word, a world. In every silence, a story.”
                </motion.div>
            </div>
        </section>
    )
}
