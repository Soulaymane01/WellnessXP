"use client"

import { Home, BookOpen, Film, MapPin, User, Trophy } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@/lib/user-context" // ✅ import user context

// Navigation items (base, untranslated)
const navItems = [
  { id: "dashboard", icon: Home, href: "/dashboard" },
  { id: "stories", icon: BookOpen, href: "/stories" },
  { id: "courses", icon: Film, href: "/courses" },
  { id: "centers", icon: MapPin, href: "/centers" },
  { id: "rewards", icon: Trophy, href: "/rewards" },
  { id: "profile", icon: User, href: "/profile" },
]

// ✅ Helper function for translation
function getLabel(id: string, lang: string): string {
  const translations: Record<string, Record<string, string>> = {
    dashboard: { fr: "Accueil", ar: "الرئيسية", en: "Home" },
    stories: { fr: "Histoires", ar: "القصص", en: "Stories" },
    courses: { fr: "Cours", ar: "الدورات", en: "Courses" },
    centers: { fr: "Centres", ar: "المراكز", en: "Centers" },
    rewards: { fr: "Récompenses", ar: "المكافآت", en: "Rewards" },
    profile: { fr: "Profil", ar: "الملف الشخصي", en: "Profile" },
  }
  return translations[id]?.[lang] || id
}

export function MobileNav() {
  const pathname = usePathname()
  const { settings } = useUser()
  const lang = settings.language

  // ✅ Direction for Arabic
  const isRTL = lang === "ar"

  return (
    <nav
      className={`md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 safe-area-bottom ${
        isRTL ? "direction-rtl" : ""
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors ${
                isActive
                  ? "text-primary border-t-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">
                {getLabel(item.id, lang)}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export function DesktopNav() {
  const pathname = usePathname()
  const { settings } = useUser()
  const lang = settings.language
  const isRTL = lang === "ar"

  return (
    <nav
      className={`hidden md:block fixed top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border z-40 ${
        isRTL ? "right-0 border-l border-r-0" : "left-0"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border text-center">
          <Link href="/" className="block">
            <h1 className="text-2xl font-bold text-sidebar-primary">WellnessXP</h1>
            <p className="text-xs text-sidebar-foreground/60 mt-1">
              {lang === "ar"
                ? "الصحة الجنسية"
                : lang === "en"
                ? "Sexual Health"
                : "Santé Sexuelle"}
            </p>
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
                <span className="font-medium">{getLabel(item.id, lang)}</span>
              </Link>
            )
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border text-center text-xs text-sidebar-foreground/60 space-y-2">
          <p>Version 1.0</p>
          <p>© 2025 WellnessXP</p>
        </div>
      </div>
    </nav>
  )
}

export function NavOffset({ children }: { children: React.ReactNode }) {
  const { settings } = useUser()
  const isRTL = settings.language === "ar"

  return (
    <div
      className={`min-h-screen pb-20 md:pb-0 ${
        isRTL ? "md:pr-64" : "md:pl-64"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {children}
    </div>
  )
}
