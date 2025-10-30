'use client'
import { useUser } from '@/lib/user-context'
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Brain, Users, Zap, BookOpen, Film, TrendingUp, Award, Clock, Target, CheckCircle2, Star, Flame } from "lucide-react"

interface DashboardProps {
  onNavigate?: (page: string) => void
  recentQuizzes?: any[]
  recentStories?: any[]
  allBadges?: any[]
}

export default function Dashboard({ onNavigate, recentQuizzes = [], recentStories = [], allBadges = [] }: DashboardProps) {
  const [timeOfDay, setTimeOfDay] = useState("morning")
  const [isNavOpen, setIsNavOpen] = useState(true)
  const [streak, setStreak] = useState(0)

  const { progress, isPending, settings, activityHistory, hasEarnedBadge } = useUser()

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setTimeOfDay("morning")
    else if (hour < 18) setTimeOfDay("afternoon")
    else setTimeOfDay("evening")

    // Calculate streak from activity history
    calculateStreak()

    const observer = new MutationObserver(() => {
      const navWidth = getComputedStyle(document.documentElement).getPropertyValue('--nav-width').trim()
      setIsNavOpen(navWidth === '16rem')
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    })

    const initialWidth = getComputedStyle(document.documentElement).getPropertyValue('--nav-width').trim()
    setIsNavOpen(initialWidth === '16rem' || initialWidth === '')

    return () => observer.disconnect()
  }, [activityHistory])

  const calculateStreak = () => {
    if (activityHistory.length === 0) {
      setStreak(0)
      return
    }

    let currentStreak = 1
    const today = new Date().setHours(0, 0, 0, 0)
    
    // Sort activities by date
    const sortedActivities = [...activityHistory].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    const uniqueDays = new Set<number>()
    sortedActivities.forEach(activity => {
      const activityDay = new Date(activity.timestamp).setHours(0, 0, 0, 0)
      uniqueDays.add(activityDay)
    })

    const daysArray = Array.from(uniqueDays).sort((a, b) => b - a)
    
    for (let i = 1; i < daysArray.length; i++) {
      const dayDiff = Math.floor((daysArray[i - 1] - daysArray[i]) / (1000 * 60 * 60 * 24))
      if (dayDiff === 1) {
        currentStreak++
      } else {
        break
      }
    }

    setStreak(currentStreak)
  }

  // Calculate XP needed for next level
  const currentLevelXP = (progress.level - 1) * 500
  const nextLevelXP = progress.level * 500
  const xpProgress = ((progress.totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100

  // Calculate weekly XP
  const weeklyXP = activityHistory
    .filter(activity => {
      const activityDate = new Date(activity.timestamp)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return activityDate >= weekAgo
    })
    .reduce((sum, activity) => sum + activity.xpEarned, 0)

  // Get total activities completed
  const totalActivities = progress.quizzesCompleted + progress.storiesRead + progress.reelsWatched

  // Get earned badges count
  const earnedBadgesCount = progress.badges.length
  const totalBadgesCount = allBadges.length || 5

  const features = [
    {
      icon: BookOpen,
      title: "Histoires Interactives",
      titleAr: "قصص تفاعلية",
      titleEn: "Interactive Stories",
      description: "Apprenez à travers des récits",
      descriptionAr: "تعلم من خلال القصص",
      descriptionEn: "Learn through stories",
      color: "bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30",
      page: "stories",
      stats: `${progress.storiesRead} ${progress.storiesRead > 1 ? 'histoires lues' : 'histoire lue'}`,
      statsAr: `${progress.storiesRead} قصة مقروءة`,
      statsEn: `${progress.storiesRead} ${progress.storiesRead > 1 ? 'stories read' : 'story read'}`,
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: Film,
      title: "Reels Éducatifs",
      titleAr: "ريلز تعليمية",
      titleEn: "Educational Reels",
      description: "Vidéos courtes et engageantes",
      descriptionAr: "فيديوهات قصيرة وجذابة",
      descriptionEn: "Short and engaging videos",
      color: "bg-gradient-to-br from-violet-100 to-violet-200 dark:from-violet-900/30 dark:to-violet-800/30",
      page: "reels",
      stats: `${progress.reelsWatched} reels regardés`,
      statsAr: `${progress.reelsWatched} ريلز مشاهدة`,
      statsEn: `${progress.reelsWatched} reels watched`,
      gradient: "from-violet-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "Quiz Éducatifs",
      titleAr: "اختبارات تعليمية",
      titleEn: "Educational Quizzes",
      description: "Testez vos connaissances",
      descriptionAr: "اختبر معرفتك",
      descriptionEn: "Test your knowledge",
      color: "bg-gradient-to-br from-rose-100 to-rose-200 dark:from-rose-900/30 dark:to-rose-800/30",
      page: "quiz",
      stats: `${progress.quizzesCompleted} quiz complétés`,
      statsAr: `${progress.quizzesCompleted} اختبار مكتمل`,
      statsEn: `${progress.quizzesCompleted} quizzes completed`,
      gradient: "from-rose-500 to-orange-500",
    },
    {
      icon: Heart,
      title: "Santé & Bien-être",
      titleAr: "الصحة والعافية",
      titleEn: "Health & Wellness",
      description: "Centres et ressources",
      descriptionAr: "المراكز والموارد",
      descriptionEn: "Centers and resources",
      color: "bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-900/30 dark:to-cyan-800/30",
      page: "map",
      stats: "Trouver un centre",
      statsAr: "ابحث عن مركز",
      statsEn: "Find a center",
      gradient: "from-cyan-500 to-blue-500",
    },
  ]

  const getText = (fr: string, ar: string, en: string) => {
    if (settings.language === 'ar') return ar
    if (settings.language === 'en') return en
    return fr
  }

  const getGreeting = () => {
    const greetings = {
      morning: { fr: "Bonjour! Prêt à apprendre?", ar: "صباح الخير! مستعد للتعلم؟", en: "Good morning! Ready to learn?" },
      afternoon: { fr: "Bon après-midi! Continuez votre apprentissage", ar: "مساء الخير! واصل تعلمك", en: "Good afternoon! Continue your learning" },
      evening: { fr: "Bonsoir! Détendez-vous et apprenez", ar: "مساء الخير! استرخ وتعلم", en: "Good evening! Relax and learn" }
    }
    return getText(greetings[timeOfDay].fr, greetings[timeOfDay].ar, greetings[timeOfDay].en)
  }

  // Smart recommendations based on user progress
  const getRecommendations = () => {
    const recs = []
    
    // Recommend quiz if user hasn't completed many
    if (progress.quizzesCompleted < 3 && recentQuizzes.length > 0) {
      recs.push({
        title: getText("Commencez un nouveau quiz", "ابدأ اختباراً جديداً", "Start a new quiz"),
        description: getText(
          `Découvrez: ${recentQuizzes[0]?.title || 'Quiz disponible'}`,
          `اكتشف: ${recentQuizzes[0]?.titleAr || 'اختبار متاح'}`,
          `Discover: ${recentQuizzes[0]?.titleEn || 'Available quiz'}`
        ),
        icon: Target,
        color: "bg-blue-500/10",
        action: getText("Commencer", "ابدأ", "Start"),
        page: "quiz",
      })
    }

    // Recommend story if user hasn't read many
    if (progress.storiesRead < 2 && recentStories.length > 0) {
      recs.push({
        title: getText("Lisez une nouvelle histoire", "اقرأ قصة جديدة", "Read a new story"),
        description: getText(
          `Explorez: ${recentStories[0]?.title || 'Histoire disponible'}`,
          `استكشف: ${recentStories[0]?.titleAr || 'قصة متاحة'}`,
          `Explore: ${recentStories[0]?.titleEn || 'Available story'}`
        ),
        icon: BookOpen,
        color: "bg-purple-500/10",
        action: getText("Lire", "اقرأ", "Read"),
        page: "stories",
      })
    }

    // Recommend watching reels
    if (progress.reelsWatched < 5) {
      recs.push({
        title: getText("Regardez un nouveau reel", "شاهد ريلز جديد", "Watch a new reel"),
        description: getText(
          "Découvrez notre dernier contenu éducatif",
          "اكتشف أحدث محتوى تعليمي",
          "Discover our latest educational content"
        ),
        icon: Film,
        color: "bg-pink-500/10",
        action: getText("Regarder", "شاهد", "Watch"),
        page: "reels",
      })
    }

    // Level up recommendation
    if (xpProgress >= 70) {
      recs.push({
        title: getText("Proche du niveau suivant!", "قريب من المستوى التالي!", "Close to next level!"),
        description: getText(
          `Encore ${nextLevelXP - progress.totalXP} XP pour le niveau ${progress.level + 1}`,
          `${nextLevelXP - progress.totalXP} نقطة خبرة للمستوى ${progress.level + 1}`,
          `${nextLevelXP - progress.totalXP} XP to level ${progress.level + 1}`
        ),
        icon: TrendingUp,
        color: "bg-green-500/10",
        action: getText("Continuer", "تابع", "Continue"),
        page: "quiz",
      })
    }

    return recs.slice(0, 3)
  }

  const recommendations = getRecommendations()

  return (
    <div className={`min-h-screen bg-gradient-to-br from-background via-background to-primary/5 transition-all duration-300 `}>
      {/* Enhanced Header with Level Progress */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-all duration-300 ${
          isNavOpen ? 'max-w-7xl' : 'max-w-full'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                WellnessXP
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {getText(
                  "Votre plateforme de santé sexuelle",
                  "منصتك للصحة الجنسية",
                  "Your sexual health platform"
                )}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              {/* Level Badge */}
              <div className="relative group">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full border border-primary/30">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold text-primary">
                    {getText("Niveau", "المستوى", "Level")} {progress.level}
                  </span>
                </div>
                {/* Tooltip */}
                <div className="absolute top-full mt-2 right-0 hidden group-hover:block bg-popover border rounded-lg p-3 shadow-lg w-48 z-50">
                  <p className="text-xs text-muted-foreground mb-2">
                    {getText("Progression vers le niveau", "التقدم نحو المستوى", "Progress to level")} {progress.level + 1}
                  </p>
                  <div className="w-full bg-secondary/20 rounded-full h-2 mb-1">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
                      style={{ width: `${xpProgress}%` }}
                    />
                  </div>
                  <p className="text-xs font-medium">
                    {progress.totalXP} / {nextLevelXP} XP
                  </p>
                </div>
              </div>

              {/* Total XP */}
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full border border-secondary/30">
                <Zap className="w-4 h-4 text-secondary" />
                <span className="text-sm font-bold text-secondary">{progress.totalXP} XP</span>
              </div>

              {/* Streak */}
              <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 rounded-full border border-orange-500/30">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-bold text-orange-500">
                  {streak} {getText("jours", "أيام", "days")}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Stats */}
          <div className="md:hidden flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full text-xs">
              <Star className="w-3 h-3" />
              <span className="font-medium">Niv. {progress.level}</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 bg-secondary/10 rounded-full text-xs">
              <Zap className="w-3 h-3" />
              <span className="font-medium">{progress.totalXP} XP</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 bg-orange-500/10 rounded-full text-xs">
              <Flame className="w-3 h-3" />
              <span className="font-medium">{streak}j</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className={`mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 transition-all duration-300 ${
        isNavOpen ? 'max-w-7xl' : 'max-w-full'
      }`}>
        {/* Greeting Section */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{getGreeting()}</h2>
          <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
            {getText(
              "Explorez nos ressources complètes sur la santé sexuelle et reproductive. Apprenez à travers des histoires interactives, et connectez-vous avec une communauté bienveillante.",
              "استكشف مواردنا الشاملة حول الصحة الجنسية والإنجابية. تعلم من خلال القصص التفاعلية، وتواصل مع مجتمع داعم.",
              "Explore our comprehensive resources on sexual and reproductive health. Learn through interactive stories, and connect with a caring community."
            )}
          </p>
        </div>

        {/* Personalized Recommendations */}
        {recommendations.length > 0 && (
          <div className="mb-8 md:mb-12">
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              {getText("Recommandations Personnalisées", "توصيات مخصصة", "Personalized Recommendations")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.map((rec, idx) => {
                const Icon = rec.icon
                return (
                  <Card key={idx} className="border-border/50 hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
                    <CardContent className="pt-6">
                      <div className={`w-12 h-12 rounded-xl ${rec.color} flex items-center justify-center mb-4 shadow-inner`}>
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-1 line-clamp-1">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{rec.description}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => onNavigate?.(rec.page)}
                      >
                        {rec.action}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Progress Stats */}
        <div className="mb-8 md:mb-12">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-secondary" />
            {getText("Votre Progression", "تقدمك", "Your Progress")}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-transparent hover:shadow-lg transition-shadow">
              <CardContent className="pt-4 md:pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">
                      {getText("XP Cette Semaine", "نقاط الخبرة هذا الأسبوع", "XP This Week")}
                    </p>
                    <p className="text-xl md:text-2xl font-bold text-primary">+{weeklyXP}</p>
                  </div>
                  <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-primary/30 mt-2 md:mt-0" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-gradient-to-br from-secondary/5 to-transparent hover:shadow-lg transition-shadow">
              <CardContent className="pt-4 md:pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">
                      {getText("Activités", "الأنشطة", "Activities")}
                    </p>
                    <p className="text-xl md:text-2xl font-bold text-secondary">{totalActivities}</p>
                  </div>
                  <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-secondary/30 mt-2 md:mt-0" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-gradient-to-br from-accent/5 to-transparent hover:shadow-lg transition-shadow">
              <CardContent className="pt-4 md:pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">
                      {getText("Badges", "الشارات", "Badges")}
                    </p>
                    <p className="text-xl md:text-2xl font-bold text-accent">
                      {earnedBadgesCount}/{totalBadgesCount}
                    </p>
                  </div>
                  <Award className="w-6 h-6 md:w-8 md:h-8 text-accent/30 mt-2 md:mt-0" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-gradient-to-br from-orange-500/5 to-transparent hover:shadow-lg transition-shadow">
              <CardContent className="pt-4 md:pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">
                      {getText("Série", "السلسلة", "Streak")}
                    </p>
                    <p className="text-xl md:text-2xl font-bold text-orange-500">
                      {streak} {getText("j", "ي", "d")}
                    </p>
                  </div>
                  <Flame className="w-6 h-6 md:w-8 md:h-8 text-orange-500/30 mt-2 md:mt-0" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-8 md:mb-12">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">
            {getText("Explorez nos Ressources", "استكشف مواردنا", "Explore Our Resources")}
          </h3>
          <div className={`grid gap-4 md:gap-6 transition-all duration-300 ${
            isNavOpen 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          }`}>
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  className="group hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer border-border/50 hover:border-primary/30 duration-300 overflow-hidden relative"
                  onClick={() => onNavigate?.(feature.page)}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <CardHeader className="relative">
                    <div
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:rotate-12 transition-transform" />
                    </div>
                    <CardTitle className="text-base md:text-lg">
                      {getText(feature.title, feature.titleAr, feature.titleEn)}
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                      {getText(feature.description, feature.descriptionAr, feature.descriptionEn)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-xs text-muted-foreground mb-3 font-medium">
                      {getText(feature.stats, feature.statsAr, feature.statsEn)}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all bg-transparent text-xs md:text-sm"
                    >
                      {getText("Découvrir", "اكتشف", "Discover")}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card className="border-border/50 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {getText("Ressources Disponibles", "الموارد المتاحة", "Available Resources")}
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    500+
                  </p>
                </div>
                <BookOpen className="w-10 h-10 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-secondary/5 via-secondary/10 to-transparent hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {getText("Utilisateurs Actifs", "المستخدمون النشطون", "Active Users")}
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                    10K+
                  </p>
                </div>
                <Users className="w-10 h-10 text-secondary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-accent/5 via-accent/10 to-transparent hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {getText("Support Disponible", "الدعم المتاح", "Available Support")}
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    24/7
                  </p>
                </div>
                <Heart className="w-10 h-10 text-accent/20" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}