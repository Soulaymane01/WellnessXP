"use client"

import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import { useEffect } from "react"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    const initFirebase = async () => {
      try {
        const { initializeFirebaseSync, startPeriodicSync } = await import("@/lib/firebase-sync")
        await initializeFirebaseSync()

        // Start periodic sync every 30 seconds
        const stopSync = startPeriodicSync(30000)

        return () => stopSync()
      } catch (error) {
        console.error("Firebase initialization error:", error)
      }
    }

    initFirebase()
  }, [])

  return (
    <>
      {children}
      <Analytics />
    </>
  )
}
