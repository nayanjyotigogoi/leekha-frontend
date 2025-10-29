import type React from "react"
import type { Metadata } from "next"
import { Geist, Playfair_Display, Caveat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { UserMenu } from "@/components/UserMenu"
import { AnimatedBackground } from "@/components/animated-background"
import { PageCornerFold } from "@/components/page-corner-fold"
import { ReadingProgressBar } from "@/components/reading-progress-bar"
import { FloatingActionButton } from "@/components/floating-action-button"
import { AuthProvider } from "@/context/AuthContext"
import ClientModals from "@/components/ClientModals" // ✅ new client wrapper

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700"],
})
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "Leekha - Creative Writings & Poetry",
  description:
    "A digital space for creative writings, poetry, and heartfelt notes. An intimate diary brought to life.",
  generator: "Anvaya Solution",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${playfair.variable} ${caveat.variable}`}
    >
      <body className="font-sans antialiased">
        <AuthProvider>
          {/* Persistent background UI */}
          <AnimatedBackground />
          <PageCornerFold />
          <ReadingProgressBar />
          <FloatingActionButton />
          {/* <UserMenu />  👈 Add here */}
          {children}

          {/* ✅ Client-only modals wrapper */}
          <ClientModals />

          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
