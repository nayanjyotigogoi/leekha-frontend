"use client"

export function PageCornerFold() {
  return (
    <div className="fixed top-0 right-0 w-16 h-16 pointer-events-none">
      <div className="absolute top-0 right-0 w-0 h-0 border-l-16 border-b-16 border-l-transparent border-b-secondary/30" />
      <div className="absolute top-1 right-1 text-xs text-secondary/40 font-script">✨</div>
    </div>
  )
}
