"use client"

import { useEffect } from "react"

interface AdSlotProps {
  slotId: string
  format?: "auto" | "rectangle" | "horizontal" | "vertical"
  responsive?: boolean
  style?: React.CSSProperties
}

export function AdSlot({
  slotId,
  format = "auto",
  responsive = true,
  style = { display: "block" },
}: AdSlotProps) {
  useEffect(() => {
    try {
      // Trigger AdSense to fill the slot
      if (typeof window !== "undefined" && (window as any).adsbygoogle) {
        ;(window as any).adsbygoogle.push({})
      }
    } catch (err) {
      console.error("AdSense error:", err)
    }
  }, [slotId])

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-6758982566193800" // Replace with your AdSense Publisher ID
      data-ad-slot={slotId}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
    ></ins>
  )
}
