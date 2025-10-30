import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import { getUserProgress } from '@/lib/firebase-service'
import { UserProvider } from '@/lib/user-context'
import { cookies } from 'next/headers'
import { MobileNav, DesktopNav, NavOffset } from '@/components/navigation'

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WellnessXP - Santé Sexuelle",
  description: "Plateforme interactive d'éducation en santé sexuelle et reproductive pour les jeunes marocains",
  generator: "v0.app",
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
    <html lang="fr">
      <body className={`${geist.className} antialiased`}>
        <UserProvider initialProgress={initialProgress} userId={userId}>
          <DesktopNav />
          <MobileNav />
          <NavOffset>
            {children}
          </NavOffset>
        </UserProvider>
      </body>
    </html>
  )
}