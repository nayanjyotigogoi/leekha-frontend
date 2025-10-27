"use client"

import { ReadingPage } from "./reading-page"

interface ClientReadingPageProps {
    writingId: string
}

export function ClientReadingPage({ writingId }: ClientReadingPageProps) {
    return <ReadingPage writingId={writingId} />
}
