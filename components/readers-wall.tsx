"use client"

import { useEffect, useState } from "react"

interface Note {
  id: string
  text: string
  color: string
  rotation: number
}

const pastelColors = ["#FFE1E6", "#DDEBFF", "#FFF4D0", "#DFF8E1"]

const colorClasses: Record<string, string> = {
  "#FFE1E6": "bg-[#FFE1E6] text-foreground",
  "#DDEBFF": "bg-[#DDEBFF] text-foreground",
  "#FFF4D0": "bg-[#FFF4D0] text-foreground",
  "#DFF8E1": "bg-[#DFF8E1] text-foreground",
}

export function ReadersWall() {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Fetch notes from backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/readers-wall`, {
          cache: "no-store",
        })
        const data = await res.json()

        const mapped: Note[] = data.map((n: any) => ({
          id: n.id.toString(),
          text: n.text,
          color: n.color || pastelColors[Math.floor(Math.random() * pastelColors.length)],
          rotation: Math.random() * 4 - 2,
        }))
        setNotes(mapped)
      } catch (err) {
        console.error("Failed to fetch notes:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  // Add new note
  const handleAddNote = async () => {
    if (!newNote.trim() || submitting) return
    setSubmitting(true)

    const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)]

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/readers-wall`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newNote.trim(), color: randomColor }),
      })

      if (!res.ok) throw new Error("Failed to save note")
      const savedNote = await res.json()

      setNotes((prev) => [
        {
          id: savedNote.id.toString(),
          text: savedNote.text,
          color: savedNote.color || randomColor,
          rotation: Math.random() * 4 - 2,
        },
        ...prev,
      ])
      setNewNote("")
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p className="text-center py-10">Loading notes...</p>

  return (
    <section className="py-20 px-6 bg-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">Readers' Wall</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Anonymous notes from hearts touched by these words. Leave your own reflection.
          </p>
        </div>

        {/* Input area */}
        <div className="max-w-2xl mx-auto mb-16 card-paper p-8">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Share your thoughts, feelings, or reflections... (anonymous)"
            className="w-full h-24 bg-transparent text-foreground placeholder-muted-foreground resize-none focus:outline-none border-b border-border/30 pb-4 mb-4"
          />
          <button
            onClick={handleAddNote}
            disabled={submitting}
            className="px-6 py-2 rounded-full bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors disabled:opacity-60"
          >
            {submitting ? "Posting..." : "Leave a Note"}
          </button>
        </div>

        {/* Notes wall */}
        {notes.length > 0 ? (
          <div className="relative h-96 md:h-[500px] bg-gradient-to-b from-background to-secondary/10 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex flex-wrap content-start gap-4 p-8 overflow-y-auto">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className={`w-48 h-40 p-4 rounded-sm shadow-md relative animate-sticky-shift ${colorClasses[note.color] || "bg-secondary/20"
                    }`}
                  style={{
                    transform: `rotate(${note.rotation}deg)`,
                    animationDelay: `${Math.random() * 0.5}s`,
                  }}
                >
                  <p className="text-sm leading-relaxed">{note.text}</p>
                  <div className="absolute bottom-2 right-2 text-2xl opacity-30">✨</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No notes yet. Be the first to share!</p>
        )}
      </div>
    </section>
  )
}
