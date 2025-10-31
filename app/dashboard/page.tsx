// app/dashboard/page.tsx
'use client'

import { useUser } from '@/lib/user-context'
import Dashboard from '@/components/dashboard'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getAllQuizzes, getAllStories, getAllBadges } from '@/lib/firebase-service'

export default function DashboardPage() {
  const router = useRouter()
  const { progress, settings, activityHistory } = useUser()
  
  // State for Firebase data
  const [quizzes, setQuizzes] = useState([])
  const [stories, setStories] = useState([])
  const [badges, setBadges] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch data on mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        
        // Fetch all data in parallel
        const [quizzesData, storiesData, badgesData] = await Promise.all([
          getAllQuizzes(),
          getAllStories(),
          getAllBadges()
        ])
        
        setQuizzes(quizzesData)
        setStories(storiesData)
        setBadges(badgesData)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-hidden">
      <Dashboard
        onNavigate={(page) => router.push(`/${page}`)}
        progress={progress}
        settings={settings}
        activityHistory={activityHistory}
        recentQuizzes={quizzes.slice(0, 5)} // Get first 5 recent quizzes
        recentStories={stories.slice(0, 5)} // Get first 5 recent stories
        allBadges={badges}
      />
    </div>
  )
}