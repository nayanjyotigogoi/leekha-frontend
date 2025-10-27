"use client"

import { Plus } from "lucide-react"
import { useState } from "react"

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    { icon: "✍️", label: "Write", href: "#" },
    { icon: "❤️", label: "Favorites", href: "#" },
    { icon: "🔖", label: "Bookmarks", href: "#" },
  ]

  return (
    <div className="fixed bottom-8 left-8 z-40">
      {/* Action buttons */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 space-y-3 animate-fade-in-up">
          {actions.map((action, idx) => (
            <a
              key={idx}
              href={action.href}
              className="flex items-center gap-3 p-3 bg-card rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-110 animate-scale-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <span className="text-xl">{action.icon}</span>
              <span className="text-sm font-medium text-foreground">{action.label}</span>
            </a>
          ))}
        </div>
      )}

      {/* Main button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95"
      >
        <Plus className={`w-6 h-6 transition-transform ${isOpen ? "rotate-45" : ""}`} />
      </button>
    </div>
  )
}
