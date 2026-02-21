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
    language?: "en" | "fr" | "ar"
}

export interface UserActivity {
    activityType: "quiz" | "story" | "reel" | "question"
    title: string
    xpEarned: number
    timestamp: any
}

export interface Chapter {
    id: number
    content: string
    contentAr: string
    contentEn: string
    choices: any[]
}

export interface Story {
    id: string
    title: string
    titleAr: string
    titleEn: string
    description: string
    descriptionAr: string
    descriptionEn: string
    category: string
    coverImage: string
    difficulty: string
    xpReward: number
    estimatedTime: number
    chapters: Chapter[]
    createdAt: string
}

export interface QuizQuestion {
    id: string
    question: string
    questionAr: string
    questionEn: string
    options: string[]
    optionsAr: string[]
    optionsEn: string[]
    correctAnswer: number
    explanation: string
    explanationAr: string
    explanationEn: string
}

export interface Quiz {
    id: string
    title: string
    titleAr: string
    titleEn: string
    category: string
    difficulty: "easy" | "medium" | "hard"
    xpReward: number
    estimatedTime: number
    questions: QuizQuestion[]
    createdAt: string
}

export interface Badge {
    id: string
    name: string
    nameAr: string
    nameEn: string
    description: string
    descriptionAr: string
    descriptionEn: string
    icon: string
    requirement: { type: string; count: number }
    xpReward: number
}

export interface HealthCenter {
    id: string
    name: string
    nameAr: string
    nameEn: string
    address: string
    addressAr: string
    addressEn: string
    phone: string
    services: string[]
    servicesLabels: Record<string, string>
    location: { lat: number; lng: number }
    hours: string
    hoursAr: string
    hoursEn: string
    isYouthFriendly: boolean
    isFree: boolean
    description: string
    descriptionAr: string
    descriptionEn: string
    createdAt: string
}

export interface Reel {
    id: string
    title: string
    titleAr: string
    titleEn: string
    description: string
    descriptionAr: string
    descriptionEn: string
    topic: string
    topicAr: string
    topicEn: string
    category: string
    difficulty: string
    duration: number
    educational: boolean
    views: number
    likes: number
    liked?: boolean
    points: number
    videoColor: string
    icon: string
    createdAt: string
}

export interface Reward {
    id: string
    title: string
    titleAr: string
    titleEn: string
    description: string
    descriptionAr: string
    descriptionEn: string
    type: 'coupon' | 'activity' | 'mentor'
    category: string
    requiredLevel: number
    requiredBadges?: string[]
    totalAvailable?: number
    claimed: number
    partner?: string
    location?: string
    date?: string
    icon?: string
    featured?: boolean
}

export interface UserReward {
    id: string
    reward: Reward
    status: 'claimed' | 'used' | 'expired'
    code?: string
    claimedAt: string
    expiresAt?: string
}

export interface MentorApplication {
    motivation: string
    experience: string
    availability: string
    submittedAt: string
}
