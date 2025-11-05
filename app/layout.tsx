import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"                    // ✅ for AdSense
import { Geist, Playfair_Display, Caveat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { UserMenu } from "@/components/UserMenu"
import { AnimatedBackground } from "@/components/animated-background"
import { PageCornerFold } from "@/components/page-corner-fold"
import { ReadingProgressBar } from "@/components/reading-progress-bar"
import { FloatingActionButton } from "@/components/floating-action-button"
import { AuthProvider } from "@/context/AuthContext"
import ClientModals from "@/components/ClientModals"

// ✅ import reusable AdSlot
import { AdSlot } from "@/components/AdSlot"

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
      <head>
        {/* ✅ Google AdSense global script */}
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6758982566193800"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

      </head>

      <body className="font-sans antialiased">
        <AuthProvider>
          {/* Persistent background UI */}
          <AnimatedBackground />
          <PageCornerFold />
          <ReadingProgressBar />
          <FloatingActionButton />

          {/* ✅ Header ad slot (top banner) */}
          <div className="py-3 flex justify-center">
            <AdSlot slotId="1234567890" format="horizontal" />
          </div>

          {/* <UserMenu /> 👈 Add here */}
          {children}

          {/* ✅ Inline ad slot (below main content) */}
          <div className="my-8 flex justify-center">
            <AdSlot slotId="9876543210" format="rectangle" />
          </div>

          {/* ✅ Footer ad slot */}
          <footer className="py-4 border-t flex justify-center">
            <AdSlot slotId="4567890123" format="horizontal" />
          </footer>

          {/* ✅ Client-only modals wrapper */}
          <ClientModals />

          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
