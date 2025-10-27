"use client"

export function InkStrokeAnimation() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
    >
      <defs>
        <style>{`
          @keyframes drawInk {
            0% { stroke-dashoffset: 500; opacity: 0; }
            50% { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 0; }
          }
          .ink-line {
            stroke: #d4a5a5;
            stroke-width: 2;
            fill: none;
            stroke-dasharray: 500;
            animation: drawInk 4s ease-in-out infinite;
          }
        `}</style>
      </defs>
      <path className="ink-line" d="M 100 200 L 300 150 L 500 200 L 700 100" />
      <path className="ink-line" d="M 50 500 Q 200 400 400 500 T 800 500" style={{ animationDelay: "1s" }} />
      <path className="ink-line" d="M 200 700 L 400 650 L 600 700 L 800 650" style={{ animationDelay: "2s" }} />
    </svg>
  )
}
