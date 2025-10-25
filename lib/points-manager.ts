export interface UserProgress {
  totalXP: number
  level: number
  reelsWatched: number
  reelsPoints: number
  quizPoints: number
  storiesPoints: number
  badges: string[]
}

const STORAGE_KEY = "userProgress"

export const getDefaultProgress = (): UserProgress => ({
  totalXP: 0,
  level: 1,
  reelsWatched: 0,
  reelsPoints: 0,
  quizPoints: 0,
  storiesPoints: 0,
  badges: [],
})

export const getUserProgress = (): UserProgress => {
  if (typeof window === "undefined") return getDefaultProgress()
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : getDefaultProgress()
}

export const updateUserProgress = (updates: Partial<UserProgress>): UserProgress => {
  const current = getUserProgress()
  const updated = { ...current, ...updates }
  updated.totalXP = updated.reelsPoints + updated.quizPoints + updated.storiesPoints
  updated.level = Math.floor(updated.totalXP / 500) + 1
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

  if (typeof window !== "undefined") {
    import("./firebase-sync").then(({ syncToFirebase }) => {
      syncToFirebase().catch((err) => console.error("Firebase sync error:", err))
    })
  }

  return updated
}

export const addReelsPoints = (points: number): UserProgress => {
  const current = getUserProgress()
  return updateUserProgress({
    reelsPoints: current.reelsPoints + points,
    reelsWatched: current.reelsWatched + 1,
  })
}

export const checkBadgeUnlock = (progress: UserProgress): string[] => {
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

  return newBadges
}
