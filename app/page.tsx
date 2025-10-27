"use client"
import { HeroSection } from "@/components/hero-section"
import { AuthorProfile } from "@/components/author-profile"
import { WritingsGrid } from "@/components/writings-grid"
import { ReadersWall } from "@/components/readers-wall"
import { Footer } from "@/components/footer"
import { FeaturedCarousel } from "@/components/featured-carousel"
import { ReadingStatsDashboard } from "@/components/reading-stats-dashboard"
import { SearchFilter } from "@/components/search-filter"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthorTimeline } from "@/components/author-timeline"
import { PersonalizedReadingList } from "@/components/personalized-reading-list"
import { ScrollToTop } from "@/components/scroll-to-top"
import { WhispersOfTheDay } from "@/components/reading-streak"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function Home() {
  const [featuredWritings, setFeaturedWritings] = useState<any[]>([])
  const [allWritings, setAllWritings] = useState<any[]>([])
  const [readerNotes, setReaderNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/writings`)
        const data = await res.json()
        // Take first 3 as featured, or customize your own filter logic
        setFeaturedWritings(data.slice(0, 3))
      } catch (error) {
        console.error("Error fetching writings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])


  const stats = {
    totalReadings: 1240,
    totalMinutes: 3850,
    favoriteCount: 342,
    commentsCount: 567,
  }

  const timelineEvents = [
    {
      date: "January 2023",
      title: "First Words",
      description: "Started my journey of writing and sharing thoughts with the world.",
      type: "milestone" as const,
    },
    {
      date: "June 2023",
      title: "100 Readers Milestone",
      description: "Reached 100 readers and felt the warmth of a growing community.",
      type: "achievement" as const,
    },
    {
      date: "December 2023",
      title: "Poetry Collection Published",
      description: "Released my first collection of poems, a dream come true.",
      type: "publication" as const,
    },
    {
      date: "March 2024",
      title: "1000 Hearts",
      description: "Celebrated 1000 likes from readers around the world.",
      type: "achievement" as const,
    },
  ]

  const readingListItems = [
    {
      id: "1",
      title: "Whispers of the Night",
      author: "Leekha",
      category: "Poetry",
      readingTime: 5,
      progress: 65,
      isSaved: false,
      mood: "reflective",
    },
    {
      id: "2",
      title: "Golden Memories",
      author: "Leekha",
      category: "Reflections",
      readingTime: 7,
      progress: 0,
      isSaved: true,
      mood: "nostalgic",
    },
    {
      id: "3",
      title: "Dreams and Reality",
      author: "Leekha",
      category: "Stories",
      readingTime: 12,
      progress: 0,
      isSaved: true,
      mood: "hopeful",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <HeroSection />
      <AuthorProfile />

      {/* Featured Carousel Section */}
      <section className="px-4 md:px-8 py-16 max-w-6xl mx-auto">
        <FeaturedCarousel writings={featuredWritings} />
      </section>

      {/* Reading Stats Section */}
      <section className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
        <ReadingStatsDashboard />
      </section>


      {/* Whispers of the Day Section */}
      <section className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
        <WhispersOfTheDay />
      </section>


      {/* Personalized Reading List */}
      <section className="px-4 md:px-8 py-16 max-w-6xl mx-auto">
        <PersonalizedReadingList items={readingListItems} />
      </section>

      {/* Author's Journey Timeline */}
      <section className="px-4 md:px-8 py-16 max-w-6xl mx-auto">
        <AuthorTimeline events={timelineEvents} />
      </section>

      {/* Search and Filter Section */}
      <section className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
        <SearchFilter />
      </section>

      <section id="writings-section">
        <WritingsGrid writings={allWritings} />
      </section>

      {/* Dynamic Writings Grid */}
      {/* <WritingsGrid writings={allWritings} /> */}

      {/* Dynamic Readers Wall */}
      <ReadersWall notes={readerNotes} />

      {/* <WritingsGrid />
      <ReadersWall /> */}
      <Footer />

      <ScrollToTop />
    </main>
  )
}
