"use client"

interface AnimatedDividerProps {
  style?: "dots" | "dashes" | "flowers" | "waves"
  className?: string
}

export function AnimatedDividerEnhanced({ style = "dots", className = "" }: AnimatedDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-2 my-8 ${className}`}>
      {style === "dots" && (
        <>
          <div className="h-1 w-1 rounded-full bg-secondary/40 animate-pulse" />
          <div className="h-1 w-1 rounded-full bg-secondary/60 animate-pulse" style={{ animationDelay: "0.2s" }} />
          <div className="h-1 w-1 rounded-full bg-secondary/40 animate-pulse" style={{ animationDelay: "0.4s" }} />
        </>
      )}
      {style === "dashes" && (
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />
      )}
      {style === "flowers" && <div className="text-secondary/40 text-xl">✿ ✿ ✿</div>}
      {style === "waves" && (
        <svg className="w-24 h-6" viewBox="0 0 100 20" preserveAspectRatio="none">
          <path
            d="M0,10 Q5,5 10,10 T20,10 T30,10 T40,10 T50,10 T60,10 T70,10 T80,10 T90,10 T100,10"
            stroke="currentColor"
            fill="none"
            className="text-secondary/40"
            strokeWidth="1"
          />
        </svg>
      )}
    </div>
  )
}
