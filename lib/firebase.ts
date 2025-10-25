import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"
import { getAuth, signInAnonymously, onAuthStateChanged, type User } from "firebase/auth"

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
let app: any
let db: any
let auth: any

try {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  auth = getAuth(app)
} catch (error) {
  console.warn("Firebase initialization failed. Using localStorage only.", error)
}

export interface FirebaseUserProgress {
  totalXP: number
  level: number
  reelsWatched: number
  reelsPoints: number
  quizPoints: number
  storiesPoints: number
  badges: string[]
  lastUpdated: number
}

// Initialize anonymous authentication
export const initializeAuth = async (): Promise<User | null> => {
  if (!auth) return null

  try {
    const result = await signInAnonymously(auth)
    return result.user
  } catch (error) {
    console.error("Auth initialization failed:", error)
    return null
  }
}

// Get current user
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    if (!auth) {
      resolve(null)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}

// Save user progress to Firestore
export const saveProgressToFirebase = async (userId: string, progress: FirebaseUserProgress): Promise<boolean> => {
  if (!db) return false

  try {
    const userRef = doc(db, "users", userId)
    await setDoc(
      userRef,
      {
        ...progress,
        lastUpdated: Date.now(),
      },
      { merge: true },
    )
    return true
  } catch (error) {
    console.error("Failed to save progress to Firebase:", error)
    return false
  }
}

// Load user progress from Firestore
export const loadProgressFromFirebase = async (userId: string): Promise<FirebaseUserProgress | null> => {
  if (!db) return null

  try {
    const userRef = doc(db, "users", userId)
    const docSnap = await getDoc(userRef)

    if (docSnap.exists()) {
      return docSnap.data() as FirebaseUserProgress
    }
    return null
  } catch (error) {
    console.error("Failed to load progress from Firebase:", error)
    return null
  }
}

// Sync progress between localStorage and Firebase
export const syncProgressWithFirebase = async (
  userId: string,
  localProgress: FirebaseUserProgress,
): Promise<FirebaseUserProgress> => {
  if (!db) return localProgress

  try {
    const firebaseProgress = await loadProgressFromFirebase(userId)

    // Use the most recent version
    if (firebaseProgress && firebaseProgress.lastUpdated > localProgress.lastUpdated) {
      return firebaseProgress
    }

    // Save local progress to Firebase if it's newer
    await saveProgressToFirebase(userId, localProgress)
    return localProgress
  } catch (error) {
    console.error("Sync failed, using local progress:", error)
    return localProgress
  }
}

// Check if Firebase is available
export const isFirebaseAvailable = (): boolean => {
  return !!db && !!auth
}
