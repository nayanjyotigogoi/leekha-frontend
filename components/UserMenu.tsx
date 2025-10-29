"use client"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { User, LogOut } from "lucide-react"

export const UserMenu = () => {
  const { user, logout, openLoginModal } = useAuth()
  const [open, setOpen] = useState(false)

  if (!user) {
    return (
      <button
        onClick={openLoginModal}
        className="fixed top-6 right-6 z-50 px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-all shadow-lg text-sm"
      >
        Login
      </button>
    )
  }

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-all shadow-lg"
        >
          <User className="w-4 h-4" />
          <span>{user.name?.split(" ")[0] || "Profile"}</span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-in fade-in duration-200">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-800">
                {user.name || "Unknown User"}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>

            <button
              onClick={() => {
                logout()
                setOpen(false)
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
