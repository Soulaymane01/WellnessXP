// Firebase service functions for user data management
import { db } from "./firebase-config"
import { collection, doc, setDoc, getDoc, updateDoc, serverTimestamp, getDocs } from "firebase/firestore"

export interface UserProgress {
  userId: string
  level: number
  totalXP: number
  quizzesCompleted: number
  storiesRead: number
  reelsWatched: number
  badges: string[]
  lastUpdated: any
  createdAt: any
}

export interface UserActivity {
  userId: string
  activityType: "quiz" | "story" | "reel" | "question"
  title: string
  xpEarned: number
  timestamp: any
}

// Save or update user progress to Firebase
export async function saveUserProgress(userId: string, progress: Partial<UserProgress>) {
  try {
    const userRef = doc(db, "users", userId)
    await setDoc(
      userRef,
      {
        ...progress,
        lastUpdated: serverTimestamp(),
      },
      { merge: true },
    )
    console.log("[v0] User progress saved to Firebase")
    return true
  } catch (error) {
    console.error("[v0] Error saving user progress:", error)
    return false
  }
}

// Get user progress from Firebase
export async function getUserProgressFromFirebase(userId: string): Promise<UserProgress | null> {
  try {
    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      console.log("[v0] User progress retrieved from Firebase")
      return userSnap.data() as UserProgress
    } else {
      console.log("[v0] No user progress found in Firebase")
      return null
    }
  } catch (error) {
    console.error("[v0] Error retrieving user progress:", error)
    return null
  }
}

// Log user activity to Firebase
export async function logUserActivity(userId: string, activity: Omit<UserActivity, "userId" | "timestamp">) {
  try {
    const activitiesRef = collection(db, "users", userId, "activities")
    const activityDoc = doc(activitiesRef)

    await setDoc(activityDoc, {
      ...activity,
      timestamp: serverTimestamp(),
    })

    console.log("[v0] Activity logged to Firebase")
    return true
  } catch (error) {
    console.error("[v0] Error logging activity:", error)
    return false
  }
}

// Update user XP
export async function updateUserXP(userId: string, xpToAdd: number) {
  try {
    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      const currentXP = userSnap.data().totalXP || 0
      const newXP = currentXP + xpToAdd
      const newLevel = Math.floor(newXP / 500) + 1

      await updateDoc(userRef, {
        totalXP: newXP,
        level: newLevel,
        lastUpdated: serverTimestamp(),
      })

      console.log("[v0] User XP updated in Firebase")
      return { newXP, newLevel }
    }
  } catch (error) {
    console.error("[v0] Error updating user XP:", error)
    return null
  }
}

// Add badge to user
export async function addBadgeToUser(userId: string, badgeId: string) {
  try {
    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      const currentBadges = userSnap.data().badges || []

      if (!currentBadges.includes(badgeId)) {
        await updateDoc(userRef, {
          badges: [...currentBadges, badgeId],
          lastUpdated: serverTimestamp(),
        })

        console.log("[v0] Badge added to user in Firebase")
        return true
      }
    }
  } catch (error) {
    console.error("[v0] Error adding badge:", error)
    return false
  }
}

// Get user activity history
export async function getUserActivityHistory(userId: string, limit = 10) {
  try {
    const activitiesRef = collection(db, "users", userId, "activities")
    // Note: This is a simplified query. In production, you'd want to add proper pagination
    const querySnapshot = await getDocs(activitiesRef)

    const activities: UserActivity[] = []
    querySnapshot.forEach((doc) => {
      activities.push(doc.data() as UserActivity)
    })

    console.log("[v0] Activity history retrieved from Firebase")
    return activities.slice(0, limit)
  } catch (error) {
    console.error("[v0] Error retrieving activity history:", error)
    return []
  }
}

// Sync local data with Firebase
export async function syncLocalDataWithFirebase(userId: string, localProgress: UserProgress) {
  try {
    const firebaseProgress = await getUserProgressFromFirebase(userId)

    if (!firebaseProgress) {
      // If no Firebase data exists, save local data
      await saveUserProgress(userId, localProgress)
      console.log("[v0] Local data synced to Firebase (new user)")
    } else if (localProgress.lastUpdated > firebaseProgress.lastUpdated) {
      // If local data is newer, update Firebase
      await saveUserProgress(userId, localProgress)
      console.log("[v0] Local data synced to Firebase (updated)")
    } else {
      // If Firebase data is newer, return it
      console.log("[v0] Firebase data is newer, using cloud data")
      return firebaseProgress
    }

    return localProgress
  } catch (error) {
    console.error("[v0] Error syncing data:", error)
    return localProgress
  }
}
