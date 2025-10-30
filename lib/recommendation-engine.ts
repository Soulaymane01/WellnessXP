import { useUser } from '@/lib/user-context'

export interface UserInsights {
  totalActivities: number
  averageXpPerActivity: number
  learningStreak: number
  nextMilestone: string
  mostActiveFeature: string
}

export interface Recommendation {
  id: number
  title: string
  description: string
  icon: string
  action: string
  reason: string
  priority: "high" | "medium" | "low"
}

export const calculateUserInsights = (): UserInsights => {
  const { progress } = useUser()

  const totalActivities =
    progress.reelsWatched + (progress.quizPoints > 0 ? 1 : 0) + (progress.storiesPoints > 0 ? 1 : 0)
  const averageXpPerActivity = totalActivities > 0 ? Math.round(progress.totalXP / totalActivities) : 0

  // Calculate learning streak (simplified - in production would track daily activity)
  const learningStreak = Math.min(Math.floor(progress.totalXP / 100), 30)

  // Determine next milestone
  let nextMilestone = ""
  if (progress.level < 5) {
    nextMilestone = `Atteindre le Niveau ${progress.level + 1}`
  } else if (progress.badges.length < 6) {
    nextMilestone = `Débloquer ${6 - progress.badges.length} badge(s)`
  } else {
    nextMilestone = "Vous avez atteint tous les jalons!"
  }

  // Determine most active feature
  let mostActiveFeature = "reels"
  const activities = {
    reels: progress.reelsWatched,
    quiz: progress.quizPoints > 0 ? 1 : 0,
    stories: progress.storiesPoints > 0 ? 1 : 0,
  }

  if (activities.quiz > activities.reels && activities.quiz > activities.stories) {
    mostActiveFeature = "quiz"
  } else if (activities.stories > activities.reels && activities.stories > activities.quiz) {
    mostActiveFeature = "stories"
  }

  return {
    totalActivities,
    averageXpPerActivity,
    learningStreak,
    nextMilestone,
    mostActiveFeature,
  }
}

export const getPersonalizedRecommendations = (): Recommendation[] => {
  const progress = getUserProgress()
  const recommendations: Recommendation[] = []

  // Recommendation 1: Watch more reels if not enough watched
  if (progress.reelsWatched < 5) {
    recommendations.push({
      id: 1,
      title: "Regardez plus de Reels",
      description: "Les reels éducatifs sont un excellent moyen d'apprendre rapidement.",
      icon: "🎬",
      action: "Regarder les Reels",
      reason: `Vous avez regardé ${progress.reelsWatched} reels. Continuez pour débloquer le badge "Reel Watcher"!`,
      priority: "medium",
    })
  }

  // Recommendation 2: Complete more quizzes
  if (progress.quizPoints < 300) {
    recommendations.push({
      id: 2,
      title: "Complétez des Quiz",
      description: "Les quiz vous aident à tester vos connaissances et gagner des XP.",
      icon: "🎯",
      action: "Faire un Quiz",
      reason: "Vous n'avez pas encore complété beaucoup de quiz. C'est un excellent moyen d'apprendre!",
      priority: "high",
    })
  }

  // Recommendation 3: Read more stories
  if (progress.storiesPoints < 200) {
    recommendations.push({
      id: 3,
      title: "Lisez des Histoires",
      description: "Les histoires interactives offrent des perspectives uniques sur la santé sexuelle.",
      icon: "📖",
      action: "Lire une Histoire",
      reason: "Les histoires sont un excellent complément à votre apprentissage.",
      priority: "low",
    })
  }

  // If all recommendations are covered, suggest advanced content
  if (recommendations.length < 3) {
    recommendations.push({
      id: 4,
      title: "Explorez les Ressources",
      description: "Découvrez les centres de santé et les ressources disponibles près de vous.",
      icon: "🏥",
      action: "Voir les Ressources",
      reason: "Vous avez fait d'excellents progrès! Explorez les ressources pour aller plus loin.",
      priority: "low",
    })
  }

  return recommendations.slice(0, 3)
}
