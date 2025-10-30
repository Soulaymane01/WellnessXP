'use client'

import { createContext, useContext, useState, useTransition, ReactNode, useEffect } from 'react'
import { 
  UserProgress, 
  updateUserProgress, 
  addReelsPoints, 
  addQuizPoints, 
  addStoriesPoints,
  logUserActivity,
  getUserActivityHistory,
  checkBadgeUnlock,
  saveUserProgress,
  getUserLanguage,            
  updateUserLanguage          
} from './firebase-service'

// User Settings Interface
export interface UserSettings {
  language: 'fr' | 'ar' | 'en'
  notificationsEnabled: boolean
  dailyReminderTime?: string // Format: "HH:MM"
  soundEnabled: boolean
}

// User Activity Summary
export interface UserActivity {
  activityType: "quiz" | "story" | "reel" | "question"
  title: string
  xpEarned: number
  timestamp: any
}

interface UserContextType {
  // User ID
  userId: string | null
  
  // Progress Data
  progress: UserProgress
  isPending: boolean
  
  // Settings
  settings: UserSettings
  updateSettings: (newSettings: Partial<UserSettings>) => void
  
  // Progress Actions
  addReels: (points: number, title: string) => Promise<void>
  addQuiz: (points: number, title: string) => Promise<void>
  addStories: (points: number, title: string) => Promise<void>
  updateProgress: (updates: Partial<UserProgress>) => Promise<void>
  
  // Badge Actions
  unlockBadge: (badgeId: string) => Promise<void>
  
  // Activity History
  activityHistory: UserActivity[]
  refreshActivityHistory: () => Promise<void>
  
  // Data Management
  exportUserData: () => Promise<void>
  resetProgress: () => Promise<void>

  hasCompletedQuiz: (quizId: string) => boolean
  hasReadStory: (storyId: string) => boolean
  hasEarnedBadge: (badgeId: string) => boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

// Default settings
const DEFAULT_SETTINGS: UserSettings = {
  language: 'fr',
  notificationsEnabled: true,
  soundEnabled: true,
}

export function UserProvider({ 
  children, 
  initialProgress,
  userId
}: { 
  children: ReactNode
  initialProgress: UserProgress
  userId: string
}) {
  const [progress, setProgress] = useState(initialProgress)
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS)
  const [activityHistory, setActivityHistory] = useState<UserActivity[]>([])
  const [isPending, startTransition] = useTransition()

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem(`user_settings_${userId}`)
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (error) {
        console.error('Failed to load settings:', error)
      }
    }
  }, [userId])

  // 🆕 Load settings + language from Firebase and localStorage
  useEffect(() => {
    async function loadSettings() {
      const savedSettings = localStorage.getItem(`user_settings_${userId}`)
      let loadedSettings = DEFAULT_SETTINGS

      if (savedSettings) {
        try {
          loadedSettings = JSON.parse(savedSettings)
        } catch (error) {
          console.error('Failed to load settings from localStorage:', error)
        }
      }

      // Fetch language from Firebase (will override local value)
      try {
        const firebaseLang = await getUserLanguage()
        loadedSettings.language = firebaseLang
      } catch (error) {
        console.error('Failed to fetch user language from Firebase:', error)
      }

      setSettings(loadedSettings)
    }

    loadSettings()
  }, [userId])

  // 🆕 Save settings locally and in Firebase when they change
  useEffect(() => {
    localStorage.setItem(`user_settings_${userId}`, JSON.stringify(settings))

    // Sync language only if changed
    updateUserLanguage(settings.language).catch(err => 
      console.error('Failed to sync language to Firebase:', err)
    )
  }, [settings, userId])

  // Update user settings locally (and trigger sync)
  const handleUpdateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  // Add reels points with activity logging
  const handleAddReels = async (points: number, title: string) => {
    startTransition(async () => {
      try {
        const updated = await addReelsPoints(points)
        setProgress(updated)
        
        // Log activity
        await logUserActivity(userId, {
          activityType: 'reel',
          title,
          xpEarned: points,
        })
        
        // Check for new badges
        const newBadges = checkBadgeUnlock(updated)
        if (newBadges.length > updated.badges.length) {
          setProgress(prev => ({ ...prev, badges: newBadges }))
          await updateUserProgress({ badges: newBadges })
        }
      } catch (error) {
        console.error('Failed to add reels points:', error)
      }
    })
  }

  // Add quiz points with activity logging
  const handleAddQuiz = async (points: number, title: string) => {
    startTransition(async () => {
      try {
        const updated = await addQuizPoints(points)
        setProgress(updated)
        
        // Log activity
        await logUserActivity(userId, {
          activityType: 'quiz',
          title,
          xpEarned: points,
        })
        
        // Check for new badges
        const newBadges = checkBadgeUnlock(updated)
        if (newBadges.length > updated.badges.length) {
          setProgress(prev => ({ ...prev, badges: newBadges }))
          await updateUserProgress({ badges: newBadges })
        }
      } catch (error) {
        console.error('Failed to add quiz points:', error)
      }
    })
  }

  // Add stories points with activity logging
  const handleAddStories = async (points: number, title: string) => {
    startTransition(async () => {
      try {
        const updated = await addStoriesPoints(points)
        setProgress(updated)
        
        // Log activity
        await logUserActivity(userId, {
          activityType: 'story',
          title,
          xpEarned: points,
        })
        
        // Check for new badges
        const newBadges = checkBadgeUnlock(updated)
        if (newBadges.length > updated.badges.length) {
          setProgress(prev => ({ ...prev, badges: newBadges }))
          await updateUserProgress({ badges: newBadges })
        }
      } catch (error) {
        console.error('Failed to add stories points:', error)
      }
    })
  }

  // Update progress
  const handleUpdateProgress = async (updates: Partial<UserProgress>) => {
    startTransition(async () => {
      try {
        const updated = await updateUserProgress(updates)
        setProgress(updated)
      } catch (error) {
        console.error('Failed to update progress:', error)
      }
    })
  }

  // Manually unlock a badge
  const handleUnlockBadge = async (badgeId: string) => {
    startTransition(async () => {
      try {
        if (!progress.badges.includes(badgeId)) {
          const newBadges = [...progress.badges, badgeId]
          const updated = await updateUserProgress({ badges: newBadges })
          setProgress(updated)
        }
      } catch (error) {
        console.error('Failed to unlock badge:', error)
      }
    })
  }

  // Refresh activity history
  const handleRefreshActivityHistory = async () => {
    try {
      const activities = await getUserActivityHistory(userId, 20)
      setActivityHistory(activities)
    } catch (error) {
      console.error('Failed to refresh activity history:', error)
    }
  }

  // Export user data (for user privacy/transparency)
  const handleExportUserData = async () => {
    const data = {
      userId,
      progress,
      settings,
      activityHistory,
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `wellnessxp-data-${userId}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Reset progress (for testing or user request)
  const handleResetProgress = async () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser votre progression ? Cette action est irréversible.')) {
      startTransition(async () => {
        try {
          const resetData: Partial<UserProgress> = {
            totalXP: 0,
            level: 1,
            reelsWatched: 0,
            reelsPoints: 0,
            quizPoints: 0,
            storiesPoints: 0,
            quizzesCompleted: 0,
            storiesRead: 0,
            badges: [],
          }
          await saveUserProgress(userId, resetData)
          setProgress(prev => ({ ...prev, ...resetData }))
          setActivityHistory([])
        } catch (error) {
          console.error('Failed to reset progress:', error)
        }
      })
    }
  }

  const hasCompletedQuiz = (quizId: string) => {
  return activityHistory.some(
    activity => activity.activityType === 'quiz' && activity.title.includes(quizId)
    )
    }

    const hasReadStory = (storyId: string) => {
    return activityHistory.some(
        activity => activity.activityType === 'story' && activity.title.includes(storyId)
    )
    }

    const hasEarnedBadge = (badgeId: string) => {
    return progress.badges.includes(badgeId)
    }

  return (
    <UserContext.Provider
      value={{
        userId,
        progress,
        isPending,
        settings,
        updateSettings: handleUpdateSettings,
        addReels: handleAddReels,
        addQuiz: handleAddQuiz,
        addStories: handleAddStories,
        updateProgress: handleUpdateProgress,
        unlockBadge: handleUnlockBadge,
        activityHistory,
        refreshActivityHistory: handleRefreshActivityHistory,
        exportUserData: handleExportUserData,
        resetProgress: handleResetProgress,
        hasCompletedQuiz,
        hasReadStory,
        hasEarnedBadge
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}