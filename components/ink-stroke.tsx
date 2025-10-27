"use client"

import { useEffect, useRef } from "react"

interface InkStrokeProps {
  className?: string
}

export function InkStroke({ className = "" }: InkStrokeProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const paths = svg.querySelectorAll("path")
    paths.forEach((path) => {
      const length = path.getTotalLength()
      path.style.strokeDasharray = length.toString()
      path.style.strokeDashoffset = length.toString()
      path.style.animation = `drawStroke 2s ease-in-out forwards`
    })
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 100"
      className={`w-full h-auto ${className}`}
      style={{
        filter: "drop-shadow(0 2px 4px rgba(212, 165, 165, 0.2))",
      }}
    >
      <path
        d="M 10 50 Q 50 20, 100 50 T 190 50"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}
