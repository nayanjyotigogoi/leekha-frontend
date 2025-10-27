"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchFilterProps {
  onSearch?: (query: string) => void
  onFilterChange?: (filters: string[]) => void
}

const categories = ["Poetry", "Reflections", "Stories", "Letters", "Thoughts", "Dreams"]
const moods = ["Reflective", "Melancholic", "Hopeful", "Passionate", "Peaceful", "Nostalgic"]

export function SearchFilter({ onSearch, onFilterChange }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedMoods, setSelectedMoods] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch?.(value)
  }

  const toggleCategory = (cat: string) => {
    const updated = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat]
    setSelectedCategories(updated)
    onFilterChange?.([...updated, ...selectedMoods])
  }

  const toggleMood = (mood: string) => {
    const updated = selectedMoods.includes(mood) ? selectedMoods.filter((m) => m !== mood) : [...selectedMoods, mood]
    setSelectedMoods(updated)
    onFilterChange?.([...selectedCategories, ...updated])
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedMoods([])
    onSearch?.("")
    onFilterChange?.([])
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search writings..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Filter Toggle */}
      <button onClick={() => setShowFilters(!showFilters)} className="text-sm font-medium text-primary hover:underline">
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Filters */}
      {showFilters && (
        <div className="space-y-4 p-4 bg-secondary/5 rounded-lg border border-border/50">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm transition-all",
                    selectedCategories.includes(cat)
                      ? "bg-primary text-primary-foreground"
                      : "bg-border text-foreground hover:bg-border/80",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Moods */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Moods</h3>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => toggleMood(mood)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm transition-all",
                    selectedMoods.includes(mood)
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-border text-foreground hover:bg-border/80",
                  )}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Button */}
          {(selectedCategories.length > 0 || selectedMoods.length > 0 || searchQuery) && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}
