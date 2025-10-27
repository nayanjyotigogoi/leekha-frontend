"use client"

import { DecorativeDivider } from "./decorative-divider"

export function AuthorProfile() {
  return (
    <section className="py-20 px-6 bg-card/50 border-y border-border/30 relative overflow-hidden">
      <div className="absolute top-10 right-10 text-4xl opacity-15 animate-float">🌙</div>
      <div className="absolute bottom-10 left-10 text-3xl opacity-15 animate-float" style={{ animationDelay: "1.5s" }}>
        ☕
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Author image */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-secondary to-accent shadow-lg overflow-hidden border-4 border-accent/30 hover:shadow-xl transition-shadow">
              <img src="/author-portrait-artistic.jpg" alt="Author" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Author info */}
          <div className="flex-1">
            <h2 className="font-serif text-4xl text-primary mb-2">Leekha</h2>
            <p className="font-script text-xl text-secondary mb-6">Creative Writer & Poet</p>

            <p className="text-foreground/80 leading-relaxed mb-8">
              Welcome to my sanctuary of words. Here, I share fragments of my soul through poetry, prose, and heartfelt
              reflections. Each piece is a moment captured, a feeling preserved, a story waiting to resonate with yours.
            </p>

            <div className="flex gap-8 mb-8">
              <div className="text-center">
                <div className="font-serif text-3xl text-accent">17</div>
                <p className="text-sm text-muted-foreground">Writings</p>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl text-accent">1.3K</div>
                <p className="text-sm text-muted-foreground">Readers</p>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl text-accent">2.8K</div>
                <p className="text-sm text-muted-foreground">Hearts</p>
              </div>
            </div>

            {/* <DecorativeDivider variant="dots" className="mb-6" />

            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Twitter
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Instagram
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Email
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
