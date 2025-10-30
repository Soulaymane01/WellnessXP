"use client"

import { Home, BookOpen, Film, MapPin, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { id: "Accueil", label: "Accueil", icon: Home, href: "/dashboard" },
  { id: "stories", label: "stories", icon: BookOpen, href: "/stories" },
  { id: "courses", label: "courses", icon: Film, href: "/courses" },
  { id: "centers", label: "centers", icon: MapPin, href: "/centers" },
  { id: "profile", label: "Profil", icon: User, href: "/profile" },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 safe-area-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors ${
                isActive ? "text-primary border-t-2 border-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export function DesktopNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:block fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border z-40">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/" className="block">
            <h1 className="text-2xl font-bold text-sidebar-primary">WellnessXP</h1>
            <p className="text-xs text-sidebar-foreground/60 mt-1">Santé Sexuelle</p>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/10"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-sidebar-foreground/60 space-y-2">
            <p>Version 1.0</p>
            <p>© 2025 WellnessXP</p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export function NavOffset({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="md:pl-64 pb-20 md:pb-0 min-h-screen">
        {children}
      </div>
    </>
  )
}