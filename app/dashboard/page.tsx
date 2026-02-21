// app/dashboard/page.tsx
import { getUserProgress, getAllQuizzes, getAllStories, getAllBadges, getUserActivityHistory } from '@/lib/firebase-service'
import Dashboard from '@/components/dashboard'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tableau de bord | WellnessXP',
  description: 'Suivez vos progrès et relevez des défis quotidiens sur WellnessXP.',
}

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('userId')?.value

  if (!userId) {
    redirect('/')
  }

  // Fetch all data in parallel on the server
  const [progress, quizzes, stories, badges, activityHistory] = await Promise.all([
    getUserProgress(),
    getAllQuizzes(),
    getAllStories(),
    getAllBadges(),
    getUserActivityHistory(userId, 30)
  ])

  return (
    <div className="w-full overflow-x-hidden">
      <Dashboard
        progress={progress}
        settings={{
          language: progress.language || 'fr',
          notificationsEnabled: true,
          soundEnabled: true
        }}
        activityHistory={activityHistory}
        recentQuizzes={quizzes.slice(0, 5)}
        recentStories={stories.slice(0, 5)}
        allBadges={badges}
      />
    </div>
  )
}
