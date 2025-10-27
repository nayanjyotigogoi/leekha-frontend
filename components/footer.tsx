"use client"

import Link from "next/link"
import { DecorativeDivider } from "./decorative-divider"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/30 py-16 px-6 relative overflow-hidden">
      <div className="absolute top-10 left-10 text-3xl opacity-10 animate-float">✨</div>
      <div
        className="absolute bottom-10 right-10 text-4xl opacity-10 animate-float"
        style={{ animationDelay: "2s" }}
      >
        🪶
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl text-primary mb-2">Leekha</h3>
            <p className="text-sm text-muted-foreground">
              A sanctuary for creative writings, poetry, and heartfelt notes.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/writings" className="hover:text-primary transition-colors">
                  All Writings
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/leekha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com/leekha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Instagram
              </a>
              <a
                href="mailto:hello@leekha.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 text-center">
          <DecorativeDivider variant="stars" className="mb-6" />
          <p className="font-script text-lg text-secondary mb-4">
            "In every word, a world. In every silence, a story."
          </p>
          <p className="text-xs text-muted-foreground">
            © 2025 Leekha. Crafted with love and ink. All writings are original and heartfelt.
          </p>
        </div>
      </div>
    </footer>
  )
}
