"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { ReadingPage } from "./reading-page"

interface ReadingModalProps {
  writingId: string
  isOpen: boolean
  onClose: () => void
}

export function ReadingModal({ writingId, isOpen, onClose }: ReadingModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in-up">
      <div className="relative w-full h-full overflow-y-auto">
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-50 p-2 rounded-full bg-card hover:bg-secondary/20 transition-colors"
          aria-label="Close reading"
        >
          <X size={24} className="text-primary" />
        </button>
        <ReadingPage writingId={writingId} onBack={onClose} />
      </div>
    </div>
  )
}
