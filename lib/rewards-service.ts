'use server'

import { cookies } from 'next/headers'

// ---------------------------------------------
// Types
// ---------------------------------------------
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

export interface RewardStats {
  totalClaimed: number
  totalActive: number
  totalUsed: number
}

// ---------------------------------------------
// Mock Data (Local Rewards)
// ---------------------------------------------
const mockRewards: Reward[] = [
  {
    id: 'r1',
    title: 'Coupon Café',
    titleAr: 'قسيمة مقهى',
    titleEn: 'Coffee Coupon',
    description: 'Échangez 200 XP pour un café gratuit dans notre partenaire local.',
    descriptionAr: 'استبدل 200 نقطة XP للحصول على قهوة مجانية في شريكنا المحلي.',
    descriptionEn: 'Exchange 200 XP for a free coffee at our local partner.',
    type: 'coupon',
    category: 'Local Deal',
    requiredLevel: 3,
    claimed: 0,
    totalAvailable: 10,
    partner: 'CoffeeTime',
    icon: '☕',
  },
  {
    id: 'r2',
    title: 'Atelier Bien-être',
    titleAr: 'ورشة الرفاهية',
    titleEn: 'Wellness Workshop',
    description: 'Participez à un atelier sur le bien-être et gagnez des points bonus.',
    descriptionAr: 'شارك في ورشة الرفاهية واكسب نقاطًا إضافية.',
    descriptionEn: 'Join a wellness workshop and earn bonus points.',
    type: 'activity',
    category: 'Event',
    requiredLevel: 5,
    claimed: 0,
    totalAvailable: 5,
    location: 'FST Tanger',
    date: '2025-11-15',
    icon: '🧘',
  },
  {
    id: 'r3',
    title: 'Programme Mentor',
    titleAr: 'برنامج المرشد',
    titleEn: 'Mentor Program',
    description: 'Devenez mentor et aidez d’autres jeunes à se développer.',
    descriptionAr: 'كن مرشدًا وساعد الشباب الآخرين على التطور.',
    descriptionEn: 'Become a mentor and help other youth grow.',
    type: 'mentor',
    category: 'Leadership',
    requiredLevel: 15,
    requiredBadges: ['leadership', 'community'],
    claimed: 0,
    totalAvailable: 3,
    icon: '🎓',
  },
]

// ---------------------------------------------
// Mock "database" for user rewards and mentor apps
// ---------------------------------------------
let userRewards: UserReward[] = []
let mentorApplication: MentorApplication | null = null

// ---------------------------------------------
// Functions
// ---------------------------------------------
export async function getAvailableRewards(level: number, badges: string[]): Promise<Reward[]> {
  // Filter rewards by level and badges
  return mockRewards.filter((reward) => {
    const levelOk = level >= reward.requiredLevel
    const badgesOk = !reward.requiredBadges || reward.requiredBadges.every((b) => badges.includes(b))
    return levelOk || badgesOk
  })
}

export async function getAllRewards(): Promise<Reward[]> {
  return mockRewards
}

export async function getUserRewards(): Promise<UserReward[]> {
  return userRewards
}

export async function claimReward(rewardId: string): Promise<{ success: boolean; message: string; code?: string }> {
  const reward = mockRewards.find((r) => r.id === rewardId)
  if (!reward) return { success: false, message: 'Reward not found' }

  if (reward.claimed >= (reward.totalAvailable ?? Infinity))
    return { success: false, message: 'No more rewards available' }

  const code = Math.random().toString(36).substring(2, 8).toUpperCase()
  reward.claimed++

  const newUserReward: UserReward = {
    id: `ur-${Date.now()}`,
    reward,
    status: 'claimed',
    code,
    claimedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  }

  userRewards.push(newUserReward)
  return { success: true, message: 'Reward claimed successfully', code }
}

export async function useReward(userRewardId: string): Promise<{ success: boolean }> {
  const ur = userRewards.find((r) => r.id === userRewardId)
  if (!ur) return { success: false }

  ur.status = 'used'
  return { success: true }
}

export async function getRewardStats(): Promise<RewardStats> {
  const totalClaimed = userRewards.length
  const totalActive = userRewards.filter((r) => r.status === 'claimed').length
  const totalUsed = userRewards.filter((r) => r.status === 'used').length
  return { totalClaimed, totalActive, totalUsed }
}

export async function submitMentorApplication(form: Omit<MentorApplication, 'submittedAt'>) {
  mentorApplication = { ...form, submittedAt: new Date().toISOString() }
  return { success: true, message: 'Application submitted successfully!' }
}

export async function getMentorApplication(): Promise<MentorApplication | null> {
  return mentorApplication
}
