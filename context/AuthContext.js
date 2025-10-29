// context/AuthContext.js
"use client"
import { createContext, useContext, useState, useEffect } from "react"

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    setShowLoginModal(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const openLoginModal = () => setShowLoginModal(true)
  const closeLoginModal = () => setShowLoginModal(false)

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        showLoginModal,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
