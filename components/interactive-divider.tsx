"use client"

import { useState } from "react"

interface InteractiveDividerProps {
  style?: "dots" | "dashes" | "waves" | "flowers"
}

export function InteractiveDivider({ style = "dots" }: InteractiveDividerProps) {
  const [isHovered, setIsHovered] = useState(false)

  const renderDivider = () => {
    switch (style) {
      case "dots":
        return (
          <div className="flex justify-center items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full bg-secondary/40 transition-all duration-300 ${
                  isHovered ? "scale-150 bg-secondary" : ""
                }`}
                style={{ transitionDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        )
      case "dashes":
        return (
          <div className="flex justify-center items-center gap-1">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`h-1 bg-secondary/40 transition-all duration-300 ${isHovered ? "bg-secondary" : ""}`}
                style={{
                  width: isHovered ? "12px" : "8px",
                  transitionDelay: `${i * 30}ms`,
                }}
              />
            ))}
          </div>
        )
      case "waves":
        return (
          <svg className="w-full h-8" viewBox="0 0 200 20" preserveAspectRatio="none">
            <path
              d="M0,10 Q50,0 100,10 T200,10"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              className={`text-secondary/40 transition-colors ${isHovered ? "text-secondary" : ""}`}
            />
          </svg>
        )
      case "flowers":
        return (
          <div className="flex justify-center items-center gap-3">
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className={`text-xl transition-transform duration-300 ${isHovered ? "scale-125 rotate-12" : ""}`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                🌸
              </span>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div
      className="py-6 cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {renderDivider()}
    </div>
  )
}
