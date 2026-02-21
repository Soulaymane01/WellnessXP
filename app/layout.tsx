import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import { getUserProgress } from '@/lib/firebase-service'
import { UserProvider } from '@/lib/user-context'
import { cookies } from 'next/headers'
import { MobileNav, DesktopNav, NavOffset } from '@/components/navigation'

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: '%s | WellnessXP',
    default: 'WellnessXP - Santé Sexuelle et Reproductive',
  },
  description: "Plateforme interactive d'éducation en santé sexuelle et reproductive pour les jeunes marocains. Apprenez, progressez et gagnez des récompenses.",
  applicationName: 'WellnessXP',
  keywords: ['santé', 'éducation', 'jeunesse', 'Maroc', 'bien-être'],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'WellnessXP',
  },
}

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialProgress = await getUserProgress()
  const cookieStore = await cookies()
  const userId = cookieStore.get('userId')?.value || ''

  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${geist.className} antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <UserProvider initialProgress={initialProgress} userId={userId}>
          <div className="flex min-h-screen">
            <DesktopNav />
            <div className="flex-1 flex flex-col min-w-0">
              <MobileNav />
              <NavOffset>
                <main className="flex-1 animate-in fade-in duration-500">
                  {children}
                </main>
              </NavOffset>
            </div>
          </div>
        </UserProvider>
      </body>
    </html>
  )
}