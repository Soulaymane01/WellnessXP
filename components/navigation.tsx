"use client"

import { useState } from "react"
import { Home, MessageCircle, BookOpen, Zap, MapPin, User, Film, Menu, X } from "lucide-react"

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(true)

  const navItems = [
    { id: "dashboard", label: "Accueil", icon: Home },
    { id: "chat", label: "Dr. Amina", icon: MessageCircle },
    { id: "stories", label: "Histoires", icon: BookOpen },
    { id: "reels", label: "Reels", icon: Film },
    { id: "quiz", label: "Quiz", icon: Zap },
    { id: "map", label: "Ressources", icon: MapPin },
    { id: "profile", label: "Profil", icon: User },
  ]

  const handleNavClick = (pageId: string) => {
    onPageChange(pageId)
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors ${
                  isActive ? "text-primary border-t-2 border-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Desktop Navigation */}
<nav
  className={`hidden md:block fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40 ${
    desktopMenuOpen ? "w-64" : "w-20"
  }`}
>        <div className="flex flex-col h-full">
          {/* Logo */}
         <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
  <div
    className={`transition-opacity duration-300 ${desktopMenuOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}
  >
    <h1 className="text-2xl font-bold text-sidebar-primary whitespace-nowrap">WellnessXP</h1>
    <p className="text-xs text-sidebar-foreground/60 mt-1 whitespace-nowrap">Santé Sexuelle</p>
  </div>
  <button
    onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
    className="p-2 hover:bg-sidebar-accent/10 rounded-lg transition-colors flex-shrink-0"
    aria-label={desktopMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
  >
    {desktopMenuOpen ? (
      <X className="w-5 h-5 text-sidebar-foreground" />
    ) : (
      <Menu className="w-5 h-5 text-sidebar-foreground" />
    )}
  </button>
</div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <button
  key={item.id}
  onClick={() => handleNavClick(item.id)}
  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
    isActive
      ? "bg-sidebar-primary text-sidebar-primary-foreground"
      : "text-sidebar-foreground hover:bg-sidebar-accent/10"
  } ${!desktopMenuOpen && "justify-center"}`}
  title={!desktopMenuOpen ? item.label : undefined}
>
  <Icon className="w-5 h-5 flex-shrink-0" />
  <span
    className={`font-medium transition-opacity duration-300 whitespace-nowrap ${
      desktopMenuOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
    }`}
  >
    {item.label}
  </span>
</button>
              )
            })}
          </div>

          {/* Footer */}
         <div
  className={`p-4 border-t border-sidebar-border transition-opacity duration-300 ${
    desktopMenuOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden p-0"
  }`}
>
  <div className="text-xs text-sidebar-foreground/60 space-y-2">
    <p>Version 1.0</p>
    <p>© 2025 WellnessXP</p>
  </div>
</div>
        </div>
      </nav>

      {/* Main Content Offset for Desktop */}
      <style jsx>{`
        @media (min-width: 768px) {
          main {
            margin-left: 16rem;
          }
        }
      `}</style>
    </>
  )
}
