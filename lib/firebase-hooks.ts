"use client"

// Custom React hooks for Firebase integration
import { useState, useEffect } from "react"
import { getUserProgressFromFirebase, saveUserProgress, logUserActivity } from "./firebase-service"
import { getUserProgress } from "./points-manager"

export function useFirebaseUserProgress(userId: string | null) {
  const [progress, setProgress] = useState(getUserProgress())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return

    const fetchProgress = async () => {
      setLoading(true)
      try {
        const firebaseProgress = await getUserProgressFromFirebase(userId)
        if (firebaseProgress) {
          setProgress(firebaseProgress as any)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching progress")
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [userId])

  const updateProgress = async (updates: any) => {
    if (!userId) return

    try {
      await saveUserProgress(userId, updates)
      setProgress((prev) => ({ ...prev, ...updates }))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error updating progress")
    }
  }

  return { progress, loading, error, updateProgress }
}

export function useFirebaseActivity(userId: string | null) {
  const logActivity = async (activityType: string, title: string, xpEarned: number) => {
    if (!userId) return

    try {
      await logUserActivity(userId, {
        activityType: activityType as any,
        title,
        xpEarned,
      })
    } catch (err) {
      console.error("Error logging activity:", err)
    }
  }

  return { logActivity }
}
