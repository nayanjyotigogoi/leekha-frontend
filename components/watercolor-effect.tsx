"use client"

export function WatercolorEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute w-full h-full opacity-10" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
          <linearGradient id="waterGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4a5a5" />
            <stop offset="100%" stopColor="#f0d9d9" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="150" r="150" fill="url(#waterGradient1)" filter="url(#blur)" opacity="0.6" />
        <circle cx="1000" cy="600" r="200" fill="#2c3e50" filter="url(#blur)" opacity="0.4" />
        <circle cx="600" cy="400" r="180" fill="#d4af37" filter="url(#blur)" opacity="0.3" />
      </svg>
    </div>
  )
}
