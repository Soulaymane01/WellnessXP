'use client'
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Trophy, Zap, Flame, Star, Award, Target, TrendingUp, 
  Crown, Sparkles, Medal, Gift, Lock, ChevronRight,
  BookOpen, Film, Brain, Heart, Users, Shield, CheckCircle2
} from "lucide-react"

interface DashboardProps {
  onNavigate?: (page: string) => void
  recentQuizzes?: any[]
  recentStories?: any[]
  allBadges?: any[]
  progress: any
  settings: any
  activityHistory: any[]
}

export default function Dashboard({ 
  onNavigate, 
  recentQuizzes = [], 
  recentStories = [], 
  allBadges = [],
  progress,
  settings,
  activityHistory
}: DashboardProps) {
  const [streak, setStreak] = useState(0)
  const [weeklyXP, setWeeklyXP] = useState(0)
  const [dailyGoal, setDailyGoal] = useState({ current: 0, target: 100 })

  // Calculate streak
  useEffect(() => {
    if (activityHistory.length > 0) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      let currentStreak = 0
      let checkDate = new Date(today)
      
      for (let i = 0; i < 30; i++) {
        const hasActivity = activityHistory.some(activity => {
          const activityDate = new Date(activity.timestamp)
          activityDate.setHours(0, 0, 0, 0)
          return activityDate.getTime() === checkDate.getTime()
        })
        
        if (hasActivity) {
          currentStreak++
          checkDate.setDate(checkDate.getDate() - 1)
        } else if (i === 0) {
          checkDate.setDate(checkDate.getDate() - 1)
          continue
        } else {
          break
        }
      }
      setStreak(currentStreak)
    }
  }, [activityHistory])

  // Calculate weekly XP and daily goal
  useEffect(() => {
    if (activityHistory.length > 0) {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      
      const weeklyPoints = activityHistory
        .filter(activity => new Date(activity.timestamp) >= oneWeekAgo)
        .reduce((sum, activity) => sum + (activity.xpEarned || 0), 0)
      
      setWeeklyXP(weeklyPoints)

      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const todayXP = activityHistory
        .filter(activity => {
          const activityDate = new Date(activity.timestamp)
          activityDate.setHours(0, 0, 0, 0)
          return activityDate.getTime() === today.getTime()
        })
        .reduce((sum, activity) => sum + (activity.xpEarned || 0), 0)
      
      setDailyGoal({ current: todayXP, target: 100 })
    }
  }, [activityHistory])

  const currentLevelXP = (progress.level - 1) * 500
  const nextLevelXP = progress.level * 500
  const xpProgress = ((progress.totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100

  const getText = (fr: string, ar: string, en: string) => {
    if (settings.language === 'ar') return ar
    if (settings.language === 'en') return en
    return fr
  }

  // Daily Challenges
  const challenges = [
    {
      id: 1,
      title: getText("Complète 1 Quiz", "أكمل اختبار واحد", "Complete 1 Quiz"),
      icon: Zap,
      xp: 50,
      progress: progress.quizzesCompleted > 0 ? 100 : 0,
      completed: progress.quizzesCompleted > 0,
      color: "emerald",
      action: () => onNavigate?.('quiz')
    },
    {
      id: 2,
      title: getText("Lis 1 Histoire", "اقرأ قصة واحدة", "Read 1 Story"),
      icon: BookOpen,
      xp: 30,
      progress: progress.storiesRead > 0 ? 100 : 0,
      completed: progress.storiesRead > 0,
      color: "teal",
      action: () => onNavigate?.('stories')
    },
    {
      id: 3,
      title: getText("Regarde 3 Reels", "شاهد 3 ريلز", "Watch 3 Reels"),
      icon: Film,
      xp: 30,
      progress: Math.min(100, (progress.reelsWatched / 3) * 100),
      completed: progress.reelsWatched >= 3,
      color: "cyan",
      action: () => onNavigate?.('reels')
    }
  ]

  // Quick Actions
  const quickActions = [
    {
      title: getText("Nouvelle Histoire", "قصة جديدة", "New Story"),
      subtitle: getText("+30 XP", "+30 نقطة", "+30 XP"),
      icon: BookOpen,
      gradient: "from-teal-400 to-cyan-500",
      iconBg: "bg-teal-500",
      page: "stories"
    },
    {
      title: getText("Reels du Jour", "ريلز اليوم", "Daily Reels"),
      subtitle: getText("+10 XP chacun", "+10 نقطة لكل", "+10 XP each"),
      icon: Film,
      gradient: "from-blue-400 to-indigo-500",
      iconBg: "bg-blue-500",
      page: "courses"
    },
    {
      title: getText("Centres Proches", "مراكز قريبة", "Nearby Centers"),
      subtitle: getText("Aide disponible", "مساعدة متاحة", "Help available"),
      icon: Heart,
      gradient: "from-rose-400 to-pink-500",
      iconBg: "bg-rose-500",
      page: "centers"
    },{
      title: getText("Récompenses", "المكافآت", "rewards"),
      subtitle: getText("Obtiens ta récompense aujourd'hui", "احصل على مكافأتك اليوم", "get your reward today"),
      icon: Trophy,
      gradient: "from-emerald-400 to-green-500",
      iconBg: "bg-emerald-500",
      page: "rewards"
    }
  ]

  // Achievements to unlock
  const nextAchievements = [
    {
      title: getText("Apprenti Sage", "المتعلم الحكيم", "Wise Learner"),
      requirement: getText("Atteindre niveau 5", "الوصول للمستوى 5", "Reach level 5"),
      icon: Brain,
      locked: progress.level < 5,
      progress: (progress.level / 5) * 100,
      color: "emerald"
    },
    {
      title: getText("Marathonien", "عداء الماراثون", "Marathon Runner"),
      requirement: getText("10 jours de série", "10 أيام متتالية", "10 day streak"),
      icon: Flame,
      locked: streak < 10,
      progress: (streak / 10) * 100,
      color: "orange"
    },
    {
      title: getText("Maître Quiz", "سيد الاختبارات", "Quiz Master"),
      requirement: getText("Compléter 20 quiz", "أكمل 20 اختبار", "Complete 20 quizzes"),
      icon: Trophy,
      locked: progress.quizzesCompleted < 20,
      progress: (progress.quizzesCompleted / 20) * 100,
      color: "teal"
    }
  ]

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-teal-950 p-4 sm:p-6 lg:p-8">
      {/* Top Stats Bar */}
      <div className="w-full max-w-7xl mx-auto mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Level */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-emerald-100 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate">{getText("Niveau", "المستوى", "Level")}</span>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">{progress.level}</p>
            <Progress value={xpProgress} className="h-1.5 mt-2 bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* XP */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-emerald-100 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate">XP Total</span>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{progress.totalXP}</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium truncate">+{weeklyXP} {getText("cette semaine", "هذا الأسبوع", "this week")}</p>
          </div>

          {/* Streak */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-emerald-100 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate">{getText("Série", "السلسلة", "Streak")}</span>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{streak}</p>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1 font-medium truncate">{getText("jours", "أيام", "days")}</p>
          </div>

          {/* Badges */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-emerald-100 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate">{getText("Badges", "الشارات", "Badges")}</span>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{progress.badges.length}</p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium">/ {allBadges.length}</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6 min-w-0">
          {/* Daily Goal */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white overflow-hidden">
            
            <CardHeader className="relative">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-white text-xl truncate">
                      {getText("Objectif Quotidien", "الهدف اليومي", "Daily Goal")}
                    </CardTitle>
                    <CardDescription className="text-white/80 truncate">
                      {dailyGoal.current} / {dailyGoal.target} XP
                    </CardDescription>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-4xl font-bold text-white">{Math.round((dailyGoal.current / dailyGoal.target) * 100)}%</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="bg-white/20 rounded-full h-4 overflow-hidden backdrop-blur-sm">
                <div 
                  className="h-full bg-gradient-to-r from-white to-white/90 rounded-full transition-all duration-500 shadow-lg"
                  style={{ width: `${Math.min(100, (dailyGoal.current / dailyGoal.target) * 100)}%` }}
                />
              </div>
              {dailyGoal.current >= dailyGoal.target && (
                <div className="mt-3 flex items-center gap-2 text-white">
                  <Sparkles className="w-5 h-5 flex-shrink-0" />
                  <span className="font-semibold truncate">
                    {getText("Objectif atteint! 🎉", "تم تحقيق الهدف! 🎉", "Goal achieved! 🎉")}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Daily Challenges */}
          <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                <span className="truncate">{getText("Défis du Jour", "تحديات اليوم", "Daily Challenges")}</span>
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                {getText("Complete pour gagner des XP bonus", "أكمل لكسب XP إضافية", "Complete to earn bonus XP")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {challenges.map((challenge) => {
                const Icon = challenge.icon
                const colorClasses = {
                  emerald: {
                    bg: 'bg-emerald-500/10',
                    border: 'border-emerald-500/50',
                    icon: 'text-emerald-600 dark:text-emerald-400',
                    iconBg: 'bg-emerald-500/20'
                  },
                  teal: {
                    bg: 'bg-teal-500/10',
                    border: 'border-teal-500/50',
                    icon: 'text-teal-600 dark:text-teal-400',
                    iconBg: 'bg-teal-500/20'
                  },
                  cyan: {
                    bg: 'bg-cyan-500/10',
                    border: 'border-cyan-500/50',
                    icon: 'text-cyan-600 dark:text-cyan-400',
                    iconBg: 'bg-cyan-500/20'
                  }
                }
                const colors = colorClasses[challenge.color]
                
                return (
                  <div
                    key={challenge.id}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-lg ${
                      challenge.completed
                        ? `${colors.bg} ${colors.border}`
                        : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={challenge.action}
                  >
                    <div className="flex items-center justify-between mb-3 gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          challenge.completed ? colors.iconBg : 'bg-gray-200 dark:bg-gray-800'
                        }`}>
                          <Icon className={`w-6 h-6 ${challenge.completed ? colors.icon : 'text-gray-400'}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white truncate">{challenge.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">+{challenge.xp} XP</p>
                        </div>
                      </div>
                      {challenge.completed ? (
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                          <Star className="w-6 h-6 text-white fill-white" />
                        </div>
                      ) : (
                        <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                    <Progress 
                      value={challenge.progress} 
                      className={`h-2 ${challenge.completed ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-200 dark:bg-gray-800'}`}
                    />
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, idx) => {
              const Icon = action.icon
              return (
                <Card
                  key={idx}
                  className="border-0 shadow-lg bg-white dark:bg-gray-800 hover:shadow-2xl transition-all cursor-pointer group overflow-hidden hover:-translate-y-1"
                  onClick={() => onNavigate?.(action.page)}
                >
                  <CardContent className="pt-6 relative">
                    <div className={`w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1 truncate">{action.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium truncate">{action.subtitle}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 min-w-0">
          {/* Level Progress Card */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-emerald-900/20">
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="none"
                      stroke="url(#levelGradient)"
                      strokeWidth="8"
                      strokeDasharray={`${xpProgress * 2.8} 280`}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                    <defs>
                      <linearGradient id="levelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#14b8a6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Crown className="w-10 h-10 text-yellow-500 mx-auto mb-1" />
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{progress.level}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
                  {nextLevelXP - progress.totalXP} XP {getText("pour niveau", "إلى المستوى", "to level")} {progress.level + 1}
                </p>
                <Progress value={xpProgress} className="h-2.5 bg-gray-200 dark:bg-gray-700" />
              </div>
            </CardContent>
          </Card>

          {/* Next Achievements */}
          <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                <Medal className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                <span className="truncate">{getText("Prochains Objectifs", "الأهداف التالية", "Next Goals")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {nextAchievements.map((achievement, idx) => {
                const Icon = achievement.icon
                const colorMap = {
                  emerald: {
                    bg: 'bg-emerald-500/10',
                    border: 'border-emerald-500/50',
                    icon: 'text-emerald-600 dark:text-emerald-400',
                    iconBg: 'bg-emerald-500/20'
                  },
                  orange: {
                    bg: 'bg-orange-500/10',
                    border: 'border-orange-500/50',
                    icon: 'text-orange-600 dark:text-orange-400',
                    iconBg: 'bg-orange-500/20'
                  },
                  teal: {
                    bg: 'bg-teal-500/10',
                    border: 'border-teal-500/50',
                    icon: 'text-teal-600 dark:text-teal-400',
                    iconBg: 'bg-teal-500/20'
                  }
                }
                const colors = colorMap[achievement.color]
                
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      achievement.locked
                        ? 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700'
                        : `${colors.bg} ${colors.border}`
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        achievement.locked ? 'bg-gray-200 dark:bg-gray-800' : colors.iconBg
                      }`}>
                        {achievement.locked ? (
                          <Lock className="w-6 h-6 text-gray-400" />
                        ) : (
                          <Icon className={`w-6 h-6 ${colors.icon}`} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold text-sm truncate ${achievement.locked ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                          {achievement.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 truncate">{achievement.requirement}</p>
                      </div>
                    </div>
                    <Progress 
                      value={achievement.progress} 
                      className={`h-2 ${achievement.locked ? 'bg-gray-200 dark:bg-gray-800' : 'bg-gray-200 dark:bg-gray-700'}`}
                    />
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          {activityHistory.length > 0 && (
            <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="truncate">{getText("Activité Récente", "النشاط الأخير", "Recent Activity")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {activityHistory.slice(0, 5).map((activity, idx) => {
                  const activityIcons = {
                    quiz: { icon: Zap, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
                    story: { icon: BookOpen, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-100 dark:bg-teal-900/30' },
                    reel: { icon: Film, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
                    question: { icon: Brain, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' }
                  }
                  const activityStyle = activityIcons[activity.activityType] || { icon: Sparkles, color: 'text-gray-600', bg: 'bg-gray-100' }
                  const Icon = activityStyle.icon
                  
                  return (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                      <div className={`w-10 h-10 ${activityStyle.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${activityStyle.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{activity.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">+{activity.xpEarned} XP</p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}