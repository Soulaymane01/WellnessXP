'use client'
import { useUser } from '@/lib/user-context'
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Brain, Users, Zap, BookOpen, Film, TrendingUp, Award, Clock, Target, CheckCircle2, Star, Flame, MapPin, Calendar, Eye, BookMarked } from "lucide-react"

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

  // Calculs de progression
  const currentLevelXP = (progress.level - 1) * 500
  const nextLevelXP = progress.level * 500
  const xpProgress = ((progress.totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100

  const weeklyXP = activityHistory
    .filter(activity => {
      const activityDate = new Date(activity.timestamp)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return activityDate >= weekAgo
    })
    .reduce((sum, activity) => sum + activity.xpEarned, 0)

  const totalActivities = progress.quizzesCompleted + progress.storiesRead + progress.reelsWatched
  const earnedBadgesCount = progress.badges.length
  const totalBadgesCount = allBadges.length || 8

  const features = [
    {
      icon: BookOpen,
      title: "Histoires Interactives",
      titleAr: "قصص تفاعلية",
      titleEn: "Interactive Stories",
      description: "Apprenez à travers des récits captivants",
      descriptionAr: "تعلم من خلال قصص جذابة",
      descriptionEn: "Learn through captivating stories",
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
      icon: MapPin,
      title: "Centres de Santé",
      titleAr: "مراكز الصحة",
      titleEn: "Health Centers",
      description: "Trouvez de l'aide près de chez vous",
      descriptionAr: "ابحث عن مساعدة قريبة منك",
      descriptionEn: "Find help near you",
      color: "bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-900/30 dark:to-cyan-800/30",
      page: "map",
      stats: "Centres partenaires",
      statsAr: "مراكز شريكة",
      statsEn: "Partner centers",
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
      morning: { fr: "Bonjour! 🌅 Prêt à apprendre?", ar: "صباح الخير! 🌅 مستعد للتعلم؟", en: "Good morning! 🌅 Ready to learn?" },
      afternoon: { fr: "Bon après-midi! ☀️ Continuez votre apprentissage", ar: "مساء الخير! ☀️ واصل تعلمك", en: "Good afternoon! ☀️ Continue your learning" },
      evening: { fr: "Bonsoir! 🌙 Détendez-vous et apprenez", ar: "مساء الخير! 🌙 استرخ وتعلم", en: "Good evening! 🌙 Relax and learn" }
    }
    return getText(greetings[timeOfDay].fr, greetings[timeOfDay].ar, greetings[timeOfDay].en)
  }

  const getRecommendations = () => {
    const recs = []
    
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
        iconColor: "text-blue-600",
        action: getText("Commencer", "ابدأ", "Start"),
        page: "quiz",
      })
    }

    if (progress.storiesRead < 2 && recentStories.length > 0) {
      recs.push({
        title: getText("Lisez une nouvelle histoire", "اقرأ قصة جديدة", "Read a new story"),
        description: getText(
          `Explorez: ${recentStories[0]?.title || 'Histoire disponible'}`,
          `استكشف: ${recentStories[0]?.titleAr || 'قصة متاحة'}`,
          `Explore: ${recentStories[0]?.titleEn || 'Available story'}`
        ),
        icon: BookMarked,
        color: "bg-purple-500/10",
        iconColor: "text-purple-600",
        action: getText("Lire", "اقرأ", "Read"),
        page: "stories",
      })
    }

    if (progress.reelsWatched < 5) {
      recs.push({
        title: getText("Regardez un nouveau reel", "شاهد ريلز جديد", "Watch a new reel"),
        description: getText(
          "Découvrez notre dernier contenu éducatif",
          "اكتشف أحدث محتوى تعليمي",
          "Discover our latest educational content"
        ),
        icon: Eye,
        color: "bg-pink-500/10",
        iconColor: "text-pink-600",
        action: getText("Regarder", "شاهد", "Watch"),
        page: "reels",
      })
    }

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
        iconColor: "text-green-600",
        action: getText("Continuer", "تابع", "Continue"),
        page: "quiz",
      })
    }

    // Recommandation de série
    if (streak > 0 && streak < 7) {
      recs.push({
        title: getText("Maintenez votre série!", "حافظ على سلسلتك!", "Maintain your streak!"),
        description: getText(
          `Vous avez une série de ${streak} jour${streak > 1 ? 's' : ''}! Continuez comme ça.`,
          `لديك سلسلة ${streak} يوم! استمر هكذا.`,
          `You have a ${streak}-day streak! Keep it up.`
        ),
        icon: Flame,
        color: "bg-orange-500/10",
        iconColor: "text-orange-600",
        action: getText("Continuer", "تابع", "Continue"),
        page: "stories",
      })
    }

    return recs.slice(0, 3)
  }

  const recommendations = getRecommendations()

  return (
    <div className={`min-h-screen bg-gradient-to-br from-background via-background to-primary/5 transition-all duration-300`}>
      {/* Header avec Navigation */}
      <div className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300 ${
          isNavOpen ? 'max-w-7xl' : 'max-w-full'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  WellnessXP
                </h1>
                <p className="text-xs text-muted-foreground">
                  {getText(
                    "Votre plateforme de santé sexuelle",
                    "منصتك للصحة الجنسية",
                    "Your sexual health platform"
                  )}
                </p>
              </div>
            </div>

            {/* Stats Header */}
            <div className="hidden md:flex items-center gap-3">
              {/* Niveau */}
              <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-lg border border-border shadow-sm">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{getText("Niveau", "المستوى", "Level")}</p>
                  <p className="text-sm font-bold text-primary">{progress.level}</p>
                </div>
              </div>

              {/* XP Total */}
              <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-lg border border-border shadow-sm">
                <div className="w-8 h-8 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">XP Total</p>
                  <p className="text-sm font-bold text-secondary">{progress.totalXP}</p>
                </div>
              </div>

              {/* Série */}
              <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-lg border border-border shadow-sm">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Flame className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{getText("Série", "السلسلة", "Streak")}</p>
                  <p className="text-sm font-bold text-orange-500">
                    {streak} {getText("j", "ي", "d")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu Principal */}
      <main className={`mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300 ${
        isNavOpen ? 'max-w-7xl' : 'max-w-full'
      }`}>
        {/* Section Bienvenue */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white shadow-xl">
            <h2 className="text-2xl font-bold mb-2">{getGreeting()}</h2>
            <p className="text-primary-foreground/80 max-w-2xl">
              {getText(
                "Explorez nos ressources complètes sur la santé sexuelle et reproductive. Apprenez à votre rythme dans un environnement bienveillant.",
                "استكشف مواردنا الشاملة حول الصحة الجنسية والإنجابية. تعلم بسرعتك الخاصة في بيئة داعمة.",
                "Explore our comprehensive resources on sexual and reproductive health. Learn at your own pace in a supportive environment."
              )}
            </p>
          </div>
        </div>

        {/* Grille des Fonctionnalités */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-6">
            {getText("Explorez nos Ressources", "استكشف مواردنا", "Explore Our Resources")}
          </h3>
          <div className={`grid gap-4 md:gap-6 transition-all duration-300 ${
            isNavOpen 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          }`}>
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  className="group hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer border-border/50 hover:border-primary/30 duration-300 overflow-hidden bg-card"
                  onClick={() => onNavigate?.(feature.page)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-muted-foreground">0{index + 1}</div>
                    </div>
                    <CardTitle className="text-lg text-foreground">
                      {getText(feature.title, feature.titleAr, feature.titleEn)}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {getText(feature.description, feature.descriptionAr, feature.descriptionEn)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        {getText(feature.stats, feature.statsAr, feature.statsEn)}
                      </span>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
                      >
                        {getText("Explorer", "اكتشف", "Explore")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne Gauche - Recommandations et Progression */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recommandations Personnalisées */}
            {recommendations.length > 0 && (
              <Card className="border-border/50 bg-card">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Target className="w-5 h-5 text-primary" />
                    {getText("Recommandations Personnalisées", "توصيات مخصصة", "Personalized Recommendations")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.map((rec, idx) => {
                    const Icon = rec.icon
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/30 transition-colors group cursor-pointer"
                        onClick={() => onNavigate?.(rec.page)}
                      >
                        <div className={`w-12 h-12 rounded-lg ${rec.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className={`w-6 h-6 ${rec.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{rec.title}</h4>
                          <p className="text-sm text-muted-foreground">{rec.description}</p>
                        </div>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          {rec.action}
                        </Button>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            )}

            {/* Statistiques de Progression */}
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  {getText("Votre Progression", "تقدمك", "Your Progress")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {/* XP Hebdomadaire */}
                  <div className="bg-gradient-to-br from-primary/5 to-transparent p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{getText("XP Semaine", "نقاط الأسبوع", "Weekly XP")}</span>
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-2xl font-bold text-primary">+{weeklyXP}</p>
                    <div className="w-full bg-secondary/20 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(100, (weeklyXP / 500) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Activités Total */}
                  <div className="bg-gradient-to-br from-secondary/5 to-transparent p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{getText("Activités", "الأنشطة", "Activities")}</span>
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                    </div>
                    <p className="text-2xl font-bold text-secondary">{totalActivities}</p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-2 rounded-full ${
                            i < Math.min(5, Math.floor(totalActivities / 2)) 
                              ? 'bg-secondary' 
                              : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="bg-gradient-to-br from-accent/5 to-transparent p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{getText("Badges", "الشارات", "Badges")}</span>
                      <Award className="w-4 h-4 text-accent" />
                    </div>
                    <p className="text-2xl font-bold text-accent">
                      {earnedBadgesCount}<span className="text-sm text-muted-foreground">/{totalBadgesCount}</span>
                    </p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-2 rounded-full ${
                            i < Math.min(5, Math.floor((earnedBadgesCount / totalBadgesCount) * 5))
                              ? 'bg-accent' 
                              : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Série Actuelle */}
                  <div className="bg-gradient-to-br from-orange-500/5 to-transparent p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{getText("Série", "السلسلة", "Streak")}</span>
                      <Flame className="w-4 h-4 text-orange-500" />
                    </div>
                    <p className="text-2xl font-bold text-orange-500">{streak} {getText("j", "ي", "d")}</p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-2 rounded-full ${
                            i < streak ? 'bg-orange-500' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Colonne Droite - Statistiques Globales */}
          <div className="space-y-6">
            {/* Progression du Niveau */}
            <Card className="border-border/50 bg-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-foreground">{getText("Progression du Niveau", "تقدم المستوى", "Level Progress")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="w-20 h-20 mx-auto mb-3 relative">
                    <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                      <div 
                        className="absolute w-full h-full rounded-full border-4 border-transparent"
                        style={{
                          background: `conic-gradient(oklch(var(--primary)) ${xpProgress}%, oklch(var(--muted)) 0)`,
                          mask: 'radial-gradient(white 55%, transparent 56%)',
                          WebkitMask: 'radial-gradient(white 55%, transparent 56%)'
                        }}
                      />
                      <div className="relative z-10">
                        <Star className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-primary">Niveau {progress.level}</p>
                  <p className="text-sm text-muted-foreground">
                    {progress.totalXP} / {nextLevelXP} XP
                  </p>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Statistiques de la Plateforme */}
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">{getText("Statistiques", "الإحصائيات", "Statistics")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">500+</p>
                      <p className="text-sm text-muted-foreground">{getText("Ressources", "الموارد", "Resources")}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-secondary" />
                    <div>
                      <p className="font-semibold text-foreground">10K+</p>
                      <p className="text-sm text-muted-foreground">{getText("Utilisateurs", "المستخدمين", "Users")}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Heart className="w-8 h-8 text-accent" />
                    <div>
                      <p className="font-semibold text-foreground">24/7</p>
                      <p className="text-sm text-muted-foreground">{getText("Support", "الدعم", "Support")}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appel à l'Action */}
            <Card className="border-border/50 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
              <CardContent className="pt-6 text-center">
                <Brain className="w-12 h-12 mx-auto mb-4 text-primary-foreground/80" />
                <h3 className="font-bold text-lg mb-2">
                  {getText("Commencez votre apprentissage", "ابدأ رحلة التعلم", "Start Your Learning Journey")}
                </h3>
                <p className="text-primary-foreground/80 text-sm mb-4">
                  {getText(
                    "Découvrez nos ressources éducatives complètes",
                    "اكتشف مواردنا التعليمية الشاملة",
                    "Discover our comprehensive educational resources"
                  )}
                </p>
                <Button 
                  size="lg" 
                  className="bg-background text-foreground hover:bg-background/90 w-full"
                  onClick={() => onNavigate?.('stories')}
                >
                  {getText("Explorer Maintenant", "اكتشف الآن", "Explore Now")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}