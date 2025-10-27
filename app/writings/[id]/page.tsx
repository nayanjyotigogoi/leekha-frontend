import { notFound } from "next/navigation"
import { ReadingPage } from "@/components/reading-page"

export default async function WritingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
  const res = await fetch(`${apiUrl}/writings/${id}`, {
    next: { revalidate: 0 },
  })

  if (!res.ok) {
    console.error("Failed to fetch writing:", res.status)
    notFound()
  }

  return (
    <ReadingPage writingId={id} />
  )
}
