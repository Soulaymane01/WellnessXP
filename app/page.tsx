"use client"

import { useState } from "react"
import Dashboard from "@/components/dashboard"
import Stories from "@/components/stories"
import Quiz from "@/components/quiz"
import HealthMap from "@/components/health-map"
import Profile from "@/components/profile"
import Reels from "@/components/reels"
import Analytics from "@/components/analytics"
import Navigation from "@/components/navigation"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onNavigate={setCurrentPage} />
      case "stories":
        return <Stories />
      case "quiz":
        return <Quiz />
      case "map":
        return <HealthMap />
      case "reels":
        return <Reels />
      case "profile":
        return <Profile />
      case "analytics":
        return <Analytics />
      default:
        return <Dashboard onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20 md:pb-0">{renderPage()}</main>
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  )
}
