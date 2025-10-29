"use client"

import { useState, useContext } from "react"
import { Plus, LogOut } from "lucide-react"
import { AuthContext } from "@/context/AuthContext"

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout, openLoginModal } = useContext(AuthContext)

  // 🧠 Smart handling for different user structures
  const displayName = user?.name || user?.user?.name || "User"
  const displayEmail = user?.email || user?.user?.email || ""

  return (
    <div className="fixed bottom-8 left-8 z-40">
      {/* Action menu */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 space-y-3 animate-fade-in-up min-w-[200px]">
          {user ? (
            <>
              <div className="flex items-center gap-3 p-3 bg-card rounded-lg shadow-lg border border-border animate-scale-in">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold text-lg">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">{displayEmail}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
                className="flex items-center gap-3 p-3 w-full bg-card rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all text-red-500 animate-scale-in"
              >
                <LogOut size={16} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                openLoginModal()
                setIsOpen(false)
              }}
              className="flex items-center gap-3 p-3 w-full bg-card rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all animate-scale-in"
            >
              <span className="text-lg">🔐</span>
              <span className="text-sm font-medium text-foreground">Login</span>
            </button>
          )}
        </div>
      )}

      {/* Main floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95"
      >
        <Plus className={`w-6 h-6 transition-transform ${isOpen ? "rotate-45" : ""}`} />
      </button>
    </div>
  )
}
