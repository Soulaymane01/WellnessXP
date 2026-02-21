'use server'

import { cookies } from 'next/headers'
import { adminDb } from "./firebase-admin"
import { FieldValue } from "firebase-admin/firestore"
import {
  UserProgress,
  UserActivity,
  Story,
  Quiz,
  Badge,
  HealthCenter,
  Reel
} from "./types"

// Get user ID from cookies
async function getUserId(): Promise<string> {
  const cookieStore = await cookies()
  const userId = cookieStore.get('userId')?.value

  if (!userId) {
    throw new Error('User ID not found. Middleware may not be running.')
  }

  return userId
}

// Helper to serialize Firebase data
function serializeData<T>(doc: any): T {
  const data = doc.data()
  const serialized = { ...data, id: doc.id }

  // Convert Firebase timestamps to ISO strings
  Object.keys(serialized).forEach(key => {
    if (serialized[key] && typeof serialized[key].toDate === 'function') {
      serialized[key] = serialized[key].toDate().toISOString()
    }
  })

  return serialized as T
}

const getDefaultProgress = (): Omit<UserProgress, 'userId'> => ({
  level: 1,
  totalXP: 0,
  quizzesCompleted: 0,
  storiesRead: 0,
  reelsWatched: 0,
  reelsPoints: 0,
  quizPoints: 0,
  storiesPoints: 0,
  badges: [],
  lastUpdated: new Date().toISOString(),
  createdAt: new Date().toISOString(),
})

// ===== USER PROGRESS =====

export async function getUserProgress(): Promise<UserProgress> {
  try {
    const userId = await getUserId()
    const userRef = adminDb.collection("users").doc(userId)
    const userSnap = await userRef.get()

    if (userSnap.exists) {
      console.log("User progress retrieved from Firebase Admin")
      return serializeData<UserProgress>(userSnap)
    } else {
      const now = new Date().toISOString()
      const initialProgress: any = {
        ...getDefaultProgress(),
        userId,
        createdAt: FieldValue.serverTimestamp(),
        lastUpdated: FieldValue.serverTimestamp(),
      }

      await userRef.set(initialProgress)

      console.log("New user created in Firebase")
      // Return with ISO strings for the client
      return {
        ...initialProgress,
        createdAt: now,
        lastUpdated: now,
      } as UserProgress
    }
  } catch (error) {
    console.error("Error retrieving user progress:", error)
    return {
      userId: 'error',
      ...getDefaultProgress(),
    } as UserProgress
  }
}

export async function saveUserProgress(userId: string, progress: Partial<UserProgress>) {
  try {
    const userRef = adminDb.collection("users").doc(userId)
    await userRef.set(
      {
        ...progress,
        userId,
        lastUpdated: FieldValue.serverTimestamp(),
      },
      { merge: true }
    )
    console.log("User progress saved to Firebase Admin")
    return true
  } catch (error) {
    console.error("Error saving user progress:", error)
    return false
  }
}

export async function updateUserProgress(updates: Partial<UserProgress>): Promise<UserProgress> {
  try {
    const userId = await getUserId()
    const current = await getUserProgress()

    const updated = { ...current, ...updates }
    updated.totalXP = (updated.reelsPoints || 0) + (updated.quizPoints || 0) + (updated.storiesPoints || 0)
    updated.level = Math.floor(updated.totalXP / 500) + 1
    updated.lastUpdated = new Date().toISOString()

    await saveUserProgress(userId, updated)
    return updated
  } catch (error) {
    console.error("Error updating user progress:", error)
    throw error
  }
}

export async function addReelsPoints(points: number): Promise<UserProgress> {
  const current = await getUserProgress()
  return updateUserProgress({
    reelsPoints: (current.reelsPoints || 0) + points,
    reelsWatched: (current.reelsWatched || 0) + 1,
  })
}

export async function addQuizPoints(points: number): Promise<UserProgress> {
  const current = await getUserProgress()
  return updateUserProgress({
    quizPoints: (current.quizPoints || 0) + points,
    quizzesCompleted: (current.quizzesCompleted || 0) + 1,
  })
}

export async function addStoriesPoints(points: number): Promise<UserProgress> {
  const current = await getUserProgress()
  return updateUserProgress({
    storiesPoints: (current.storiesPoints || 0) + points,
    storiesRead: (current.storiesRead || 0) + 1,
  })
}

// ===== ACTIVITY LOGGING =====

export async function logUserActivity(userId: string, activity: Omit<UserActivity, "timestamp">) {
  try {
    const activitiesRef = adminDb.collection("users").doc(userId).collection("activities")
    await activitiesRef.add({
      ...activity,
      timestamp: FieldValue.serverTimestamp(),
    })

    console.log("Activity logged to Firebase Admin")
    return true
  } catch (error) {
    console.error("Error logging activity:", error)
    return false
  }
}

export async function getUserActivityHistory(userId: string, limitCount = 10): Promise<UserActivity[]> {
  try {
    const activitiesRef = adminDb.collection("users").doc(userId).collection("activities")
    const snapshot = await activitiesRef.orderBy('timestamp', 'desc').limit(limitCount).get()

    return snapshot.docs.map(doc => serializeData<UserActivity>(doc))
  } catch (error) {
    console.error("Error retrieving activity history:", error)
    return []
  }
}

// ===== BADGES =====

export async function getAllBadges() {
  try {
    const snapshot = await adminDb.collection("badges").get()
    return snapshot.docs.map(doc => serializeData<Badge>(doc))
  } catch (error) {
    console.error("Error fetching badges:", error)
    return []
  }
}

export async function getBadgeById(badgeId: string) {
  try {
    const badgeSnap = await adminDb.collection("badges").doc(badgeId).get()
    return badgeSnap.exists ? serializeData<Badge>(badgeSnap) : null
  } catch (error) {
    console.error("Error fetching badge:", error)
    return null
  }
}

export async function checkBadgeUnlock(progress: UserProgress): Promise<string[]> {
  const newBadges = [...progress.badges]

  if (progress.reelsWatched >= 5 && !newBadges.includes("reel-watcher")) {
    newBadges.push("reel-watcher")
  }
  if (progress.reelsWatched >= 15 && !newBadges.includes("reel-master")) {
    newBadges.push("reel-master")
  }
  if (progress.totalXP >= 1000 && !newBadges.includes("knowledge-seeker")) {
    newBadges.push("knowledge-seeker")
  }
  if (progress.quizzesCompleted >= 10 && !newBadges.includes("quiz-champion")) {
    newBadges.push("quiz-champion")
  }
  if (progress.storiesRead >= 5 && !newBadges.includes("story-lover")) {
    newBadges.push("story-lover")
  }

  return newBadges
}

// ===== QUIZZES =====

export async function getAllQuizzes() {
  try {
    const snapshot = await adminDb.collection("quizzes").get()
    return snapshot.docs.map(doc => serializeData<Quiz>(doc))
  } catch (error) {
    console.error("Error fetching quizzes:", error)
    return []
  }
}

export async function getQuizById(quizId: string) {
  try {
    const quizSnap = await adminDb.collection("quizzes").doc(quizId).get()
    return quizSnap.exists ? serializeData<Quiz>(quizSnap) : null
  } catch (error) {
    console.error("Error fetching quiz:", error)
    return null
  }
}

export async function getQuizzesByCategory(category: string) {
  try {
    const quizzes = await getAllQuizzes()
    return quizzes.filter((quiz: any) => quiz.category === category)
  } catch (error) {
    console.error("Error fetching quizzes by category:", error)
    return []
  }
}

// ===== STORIES =====

export async function getAllStories() {
  try {
    const snapshot = await adminDb.collection("stories").get()
    return snapshot.docs.map(doc => serializeData<Story>(doc))
  } catch (error) {
    console.error("Error fetching stories:", error)
    return []
  }
}

export async function getStoryById(storyId: string) {
  try {
    if (!storyId || typeof storyId !== 'string') {
      console.error('Invalid story ID:', storyId)
      return null
    }

    const storySnap = await adminDb.collection('stories').doc(storyId).get()
    return storySnap.exists ? serializeData<Story>(storySnap) : null
  } catch (error) {
    console.error('Error fetching story:', error)
    return null
  }
}

export async function getStoriesByCategory(category: string) {
  try {
    const stories = await getAllStories()
    return stories.filter((story: any) => story.category === category)
  } catch (error) {
    console.error("Error fetching stories by category:", error)
    return []
  }
}

// ===== HEALTH CENTERS =====

export async function getAllHealthCenters() {
  try {
    const snapshot = await adminDb.collection("healthCenters").get()
    return snapshot.docs.map(doc => serializeData<HealthCenter>(doc))
  } catch (error) {
    console.error("Error fetching health centers:", error)
    return []
  }
}

export async function getHealthCenterById(centerId: string) {
  try {
    const centerSnap = await adminDb.collection("healthCenters").doc(centerId).get()
    return centerSnap.exists ? serializeData<HealthCenter>(centerSnap) : null
  } catch (error) {
    console.error("Error fetching health center:", error)
    return null
  }
}

export async function getHealthCentersByService(service: string) {
  try {
    const centers = await getAllHealthCenters()
    return centers.filter((center: any) => center.services?.includes(service))
  } catch (error) {
    console.error("Error fetching health centers by service:", error)
    return []
  }
}

export async function getYouthFriendlyHealthCenters() {
  try {
    const centers = await getAllHealthCenters()
    return centers.filter((center: any) => center.isYouthFriendly === true)
  } catch (error) {
    console.error("Error fetching youth-friendly health centers:", error)
    return []
  }
}

// ===== REELS =====

export async function getAllReels() {
  try {
    const snapshot = await adminDb.collection("reels").get()
    return snapshot.docs.map(doc => serializeData<Reel>(doc))
  } catch (error) {
    console.error("Error fetching reels:", error)
    return []
  }
}

// ===== LANGUAGE SETTINGS =====

export async function getUserLanguage(): Promise<"en" | "fr" | "ar"> {
  try {
    const userId = await getUserId()
    const userSnap = await adminDb.collection("users").doc(userId).get()

    if (userSnap.exists) {
      const data = userSnap.data()
      return (data?.language as "en" | "fr" | "ar") || "en"
    }
    return "en"
  } catch (error) {
    console.error("Error retrieving user language:", error)
    return "en"
  }
}

export async function updateUserLanguage(language: "en" | "fr" | "ar"): Promise<boolean> {
  try {
    const userId = await getUserId()
    const userRef = adminDb.collection("users").doc(userId)

    await userRef.update({
      language,
      lastUpdated: FieldValue.serverTimestamp(),
    })

    console.log(`User language updated to: ${language}`)
    return true
  } catch (error) {
    console.error("Error updating user language:", error)
    return false
  }
}
