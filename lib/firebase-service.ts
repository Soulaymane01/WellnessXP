'use server'

import { cookies } from 'next/headers'
import { db } from "./firebase-config"
import { doc, setDoc, getDoc, updateDoc, serverTimestamp, collection, getDocs, query, orderBy, limit } from "firebase/firestore"

export interface UserProgress {
  userId: string
  level: number
  totalXP: number
  quizzesCompleted: number
  storiesRead: number
  reelsWatched: number
  reelsPoints: number
  quizPoints: number
  storiesPoints: number
  badges: string[]
  lastUpdated: string | null
  createdAt: string | null
}

export interface UserActivity {
  activityType: "quiz" | "story" | "reel" | "question"
  title: string
  xpEarned: number
  timestamp: any
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
function serializeUserProgress(data: any): UserProgress {
  return {
    ...data,
    lastUpdated: data.lastUpdated?.toDate?.()?.toISOString() || new Date().toISOString(),
    createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
  }
}

// ===== USER PROGRESS =====

export async function getUserProgress(): Promise<UserProgress> {
  try {
    const userId = await getUserId()
    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      console.log("User progress retrieved from Firebase")
      const data = userSnap.data()
      return serializeUserProgress({ ...data, userId })
    } else {
      const now = new Date().toISOString()
      const initialProgress: UserProgress = {
        userId,
        ...getDefaultProgress(),
        createdAt: now,
        lastUpdated: now,
      }
      
      await setDoc(userRef, {
        ...initialProgress,
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp(),
      })
      
      console.log("New user created in Firebase")
      return initialProgress
    }
  } catch (error) {
    console.error("Error retrieving user progress:", error)
    return {
      userId: 'error',
      ...getDefaultProgress(),
    }
  }
}

export async function saveUserProgress(userId: string, progress: Partial<UserProgress>) {
  try {
    const userRef = doc(db, "users", userId)
    await setDoc(
      userRef,
      {
        ...progress,
        userId,
        lastUpdated: serverTimestamp(),
      },
      { merge: true }
    )
    console.log("User progress saved to Firebase")
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
  const userId = await getUserId()
  const current = await getUserProgress()
  
  return updateUserProgress({
    reelsPoints: (current.reelsPoints || 0) + points,
    reelsWatched: (current.reelsWatched || 0) + 1,
  })
}

export async function addQuizPoints(points: number): Promise<UserProgress> {
  const userId = await getUserId()
  const current = await getUserProgress()
  
  return updateUserProgress({
    quizPoints: (current.quizPoints || 0) + points,
    quizzesCompleted: (current.quizzesCompleted || 0) + 1,
  })
}

export async function addStoriesPoints(points: number): Promise<UserProgress> {
  const userId = await getUserId()
  const current = await getUserProgress()
  
  return updateUserProgress({
    storiesPoints: (current.storiesPoints || 0) + points,
    storiesRead: (current.storiesRead || 0) + 1,
  })
}

// ===== ACTIVITY LOGGING =====

export async function logUserActivity(userId: string, activity: Omit<UserActivity, "timestamp">) {
  try {
    const activitiesRef = collection(db, "users", userId, "activities")
    const activityDoc = doc(activitiesRef)

    await setDoc(activityDoc, {
      ...activity,
      timestamp: serverTimestamp(),
    })

    console.log("Activity logged to Firebase")
    return true
  } catch (error) {
    console.error("Error logging activity:", error)
    return false
  }
}

export async function getUserActivityHistory(userId: string, limitCount = 10): Promise<UserActivity[]> {
  try {
    const activitiesRef = collection(db, "users", userId, "activities")
    const querySnapshot = await getDocs(activitiesRef)

    const activities: UserActivity[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      activities.push({
        ...data,
        timestamp: data.timestamp?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as UserActivity)
    })

    activities.sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime()
      const timeB = new Date(b.timestamp).getTime()
      return timeB - timeA
    })

    return activities.slice(0, limitCount)
  } catch (error) {
    console.error("Error retrieving activity history:", error)
    return []
  }
}

// ===== BADGES =====

export async function getAllBadges() {
  try {
    const badgesRef = collection(db, "badges")
    const snapshot = await getDocs(badgesRef)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error fetching badges:", error)
    return []
  }
}

export async function getBadgeById(badgeId: string) {
  try {
    const badgeRef = doc(db, "badges", badgeId)
    const badgeSnap = await getDoc(badgeRef)
    return badgeSnap.exists() ? { id: badgeSnap.id, ...badgeSnap.data() } : null
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
    const quizzesRef = collection(db, "quizzes")
    const snapshot = await getDocs(quizzesRef)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error fetching quizzes:", error)
    return []
  }
}

export async function getQuizById(quizId: string) {
  try {
    const quizRef = doc(db, "quizzes", quizId)
    const quizSnap = await getDoc(quizRef)
    return quizSnap.exists() ? { id: quizSnap.id, ...quizSnap.data() } : null
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
    const storiesRef = collection(db, "stories")
    const snapshot = await getDocs(storiesRef)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error fetching stories:", error)
    return []
  }
}

export async function getStoryById(storyId: string) {
  try {
    const storyRef = doc(db, "stories", storyId)
    const storySnap = await getDoc(storyRef)
    if (storySnap.exists()) {
      const data = storySnap.data()
      console.log('Story data from Firestore:', data)
      return { 
        id: storySnap.id, 
        ...data 
      }
    }
    return null
  } catch (error) {
    console.error("Error fetching story:", error)
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
    const centersRef = collection(db, "healthCenters")
    const snapshot = await getDocs(centersRef)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error fetching health centers:", error)
    return []
  }
}

export async function getHealthCenterById(centerId: string) {
  try {
    const centerRef = doc(db, "healthCenters", centerId)
    const centerSnap = await getDoc(centerRef)
    return centerSnap.exists() ? { id: centerSnap.id, ...centerSnap.data() } : null
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


export async function getAllReels() {
  try {
    const reelsRef = collection(db, "reels")
    const snapshot = await getDocs(reelsRef)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error fetching reels:", error)
    return []
  }
}