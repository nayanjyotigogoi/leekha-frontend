"use client"

import type React from "react"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

export function GradientText({ children, className = "" }: GradientTextProps) {
  return (
    <span
      className={`bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  )
}
