"use client"

import { useState, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"

interface AmbientSoundToggleProps {
  soundType?: "rain" | "night" | "soft-music"
}

export function AmbientSoundToggle({ soundType = "rain" }: AmbientSoundToggleProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const soundUrls = {
    rain: "https://assets.mixkit.co/active_storage/sfx/2401/2401-preview.mp3",
    night: "https://assets.mixkit.co/active_storage/sfx/2402/2402-preview.mp3",
    "soft-music": "https://assets.mixkit.co/active_storage/sfx/2403/2403-preview.mp3",
  }

  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(() => {
          // Fallback if audio fails to play
          console.log("[v0] Audio playback failed")
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleSound}
        className="p-2 rounded-full hover:bg-secondary/20 transition-colors text-muted-foreground hover:text-secondary"
        aria-label={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
        title={`${soundType.replace("-", " ")} - ${isPlaying ? "Playing" : "Paused"}`}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
      <audio ref={audioRef} src={soundUrls[soundType]} loop className="hidden" />
    </div>
  )
}
