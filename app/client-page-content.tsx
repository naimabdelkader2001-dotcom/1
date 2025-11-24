"use client"

import { Suspense } from "react"
import SplashScreen from "@/components/splash-screen"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Portfolio from "@/components/portfolio"
import Team from "@/components/team"
import Contact from "@/components/contact"
import WhatsAppButton from "@/components/whatsapp-button"
import Location from "@/components/location"
import Footer from "@/components/footer"
import ChatBot from "@/components/chat-bot"
import { useState, useEffect } from "react"

function PageContent() {
  const [showSplash, setShowSplash] = useState(true)

  const handleAccessSite = () => {
    setShowSplash(false)
  }

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false)
    }, 4000)

    return () => clearTimeout(splashTimer)
  }, [])

  if (showSplash) {
    return <SplashScreen onAccess={handleAccessSite} />
  }

  return (
    <main className="w-full">
      <Navigation />
      <Hero />
      <Suspense fallback={<div className="h-screen" />}>
        <Services />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <Portfolio />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <Team />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <Location />
      </Suspense>
      <Footer />
      <WhatsAppButton />
      <ChatBot />
    </main>
  )
}

export default PageContent
