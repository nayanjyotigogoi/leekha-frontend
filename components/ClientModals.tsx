"use client"

import { useEffect, useState } from "react"
import LoginModal from "@/components/LoginModal"
import RegisterModal from "@/components/RegisterModal"

export default function ClientModals() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)

  useEffect(() => {
    const openLogin = () => setLoginOpen(true)
    const closeLogin = () => setLoginOpen(false)
    const openRegister = () => setRegisterOpen(true)
    const closeRegister = () => setRegisterOpen(false)

    document.addEventListener("open-login", openLogin)
    document.addEventListener("close-login", closeLogin)
    document.addEventListener("open-register", openRegister)
    document.addEventListener("close-register", closeRegister)

    return () => {
      document.removeEventListener("open-login", openLogin)
      document.removeEventListener("close-login", closeLogin)
      document.removeEventListener("open-register", openRegister)
      document.removeEventListener("close-register", closeRegister)
    }
  }, [])

  return (
    <>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <RegisterModal open={registerOpen} onClose={() => setRegisterOpen(false)} />
    </>
  )
}
