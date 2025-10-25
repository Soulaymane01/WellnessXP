import { getUserProgress, updateUserProgress, type UserProgress } from "./points-manager"
import {
  getCurrentUser,
  saveProgressToFirebase,
  syncProgressWithFirebase,
  isFirebaseAvailable,
  type FirebaseUserProgress,
} from "./firebase"

// Convert UserProgress to FirebaseUserProgress
const toFirebaseProgress = (progress: UserProgress): FirebaseUserProgress => ({
  totalXP: progress.totalXP,
  level: progress.level,
  reelsWatched: progress.reelsWatched,
  reelsPoints: progress.reelsPoints,
  quizPoints: progress.quizPoints,
  storiesPoints: progress.storiesPoints,
  badges: progress.badges,
  lastUpdated: Date.now(),
})

// Initialize Firebase sync on app load
export const initializeFirebaseSync = async (): Promise<void> => {
  if (!isFirebaseAvailable()) {
    console.log("Firebase not available, using localStorage only")
    return
  }

  try {
    const user = await getCurrentUser()
    if (!user) {
      console.log("No authenticated user")
      return
    }

    const localProgress = getUserProgress()
    const firebaseProgress = await syncProgressWithFirebase(user.uid, toFirebaseProgress(localProgress))

    // Update local storage with synced progress
    updateUserProgress(firebaseProgress)
  } catch (error) {
    console.error("Firebase sync initialization failed:", error)
  }
}

// Sync progress to Firebase (call this after user actions)
export const syncToFirebase = async (): Promise<void> => {
  if (!isFirebaseAvailable()) return

  try {
    const user = await getCurrentUser()
    if (!user) return

    const progress = getUserProgress()
    await saveProgressToFirebase(user.uid, toFirebaseProgress(progress))
  } catch (error) {
    console.error("Failed to sync to Firebase:", error)
  }
}

// Periodic sync (call this periodically to keep data in sync)
export const startPeriodicSync = (intervalMs = 30000): (() => void) => {
  const interval = setInterval(() => {
    syncToFirebase()
  }, intervalMs)

  return () => clearInterval(interval)
}
