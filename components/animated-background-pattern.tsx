"use client"

export function AnimatedBackgroundPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1200 800">
        <defs>
          <style>{`
            @keyframes drawStroke {
              0% { stroke-dashoffset: 1000; }
              100% { stroke-dashoffset: 0; }
            }
            .ink-stroke {
              stroke: url(#gradient);
              stroke-width: 2;
              fill: none;
              stroke-dasharray: 1000;
              animation: drawStroke 8s ease-in-out infinite;
            }
          `}</style>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4a5a5" />
            <stop offset="100%" stopColor="#2c3e50" />
          </linearGradient>
        </defs>
        <path className="ink-stroke" d="M 100 100 Q 300 200 500 100 T 900 100" />
        <path className="ink-stroke" d="M 50 400 Q 200 300 400 450 T 1000 400" style={{ animationDelay: "2s" }} />
        <path className="ink-stroke" d="M 200 700 Q 400 600 600 700 T 1100 700" style={{ animationDelay: "4s" }} />
      </svg>
    </div>
  )
}
