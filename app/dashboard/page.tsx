'use client'
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Brain, Users, Zap, BookOpen, Film, TrendingUp, Award, Clock, Target, CheckCircle2, Star, Flame, MapPin, Calendar, Eye, BookMarked, Shield, Sparkles } from "lucide-react"

interface DashboardProps {
  onNavigate?: (page: string) => void
  recentQuizzes?: any[]
  recentStories?: any[]
  allBadges?: any[]
}

export default function Dashboard({ onNavigate, recentQuizzes = [], recentStories = [], allBadges = [] }: DashboardProps) {
  const [timeOfDay, setTimeOfDay] = useState("morning")
  const [isNavOpen, setIsNavOpen] = useState(true)
  const [streak, setStreak] = useState(5)
  
  // Mock data - Remplacez par vos vraies données
  const progress = {
    level: 4,
    totalXP: 1850,
    quizzesCompleted: 12,
    storiesRead: 8,
    reelsWatched: 15,
    badges: ['beginner', 'curious', 'informed']
  }

  const settings = { language: 'fr' }
  const activityHistory = []
  
  // Données par défaut si non fournies
  const defaultQuizzes = [{ title: "Contraception Moderne", titleAr: "وسائل منع الحمل", titleEn: "Modern Contraception" }]
  const defaultStories = [{ title: "Le Consentement", titleAr: "الموافقة", titleEn: "Consent" }]
  const defaultBadges = Array(8).fill({})
  
  const quizData = recentQuizzes.length > 0 ? recentQuizzes : defaultQuizzes
  const storyData = recentStories.length > 0 ? recentStories : defaultStories
  const badgeData = allBadges.length > 0 ? allBadges : defaultBadges

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setTimeOfDay("morning")
    else if (hour < 18) setTimeOfDay("afternoon")
    else setTimeOfDay("evening")

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
  }, [])

  const currentLevelXP = (progress.level - 1) * 500
  const nextLevelXP = progress.level * 500
  const xpProgress = ((progress.totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100

  const weeklyXP = 320
  const totalActivities = progress.quizzesCompleted + progress.storiesRead + progress.reelsWatched
  const earnedBadgesCount = progress.badges.length
  const totalBadgesCount = badgeData.length || 8

  const features = [
    {
      icon: BookOpen,
      title: "Histoires Interactives",
      titleAr: "قصص تفاعلية",
      titleEn: "Interactive Stories",
      description: "Découvrez des récits qui parlent de votre santé",
      descriptionAr: "اكتشف قصصاً عن صحتك",
      descriptionEn: "Discover stories about your health",
      color: "from-emerald-400 to-teal-500",
      bgImage: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400&h=300&fit=crop",
      page: "stories",
      stats: `${progress.storiesRead} histoires`,
      statsAr: `${progress.storiesRead} قصة`,
      statsEn: `${progress.storiesRead} stories`,
    },
    {
      icon: Film,
      title: "Reels Éducatifs",
      titleAr: "ريلز تعليمية",
      titleEn: "Educational Reels",
      description: "Contenus courts pour mieux comprendre",
      descriptionAr: "محتوى قصير للفهم الأفضل",
      descriptionEn: "Short content for better understanding",
      color: "from-teal-400 to-cyan-500",
      bgImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
      page: "reels",
      stats: `${progress.reelsWatched} reels`,
      statsAr: `${progress.reelsWatched} ريلز`,
      statsEn: `${progress.reelsWatched} reels`,
    },
    {
      icon: Zap,
      title: "Quiz Éducatifs",
      titleAr: "اختبارات تعليمية",
      titleEn: "Educational Quizzes",
      description: "Testez vos connaissances en vous amusant",
      descriptionAr: "اختبر معرفتك بطريقة ممتعة",
      descriptionEn: "Test your knowledge while having fun",
      color: "from-green-400 to-emerald-500",
      bgImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
      page: "quiz",
      stats: `${progress.quizzesCompleted} quiz`,
      statsAr: `${progress.quizzesCompleted} اختبار`,
      statsEn: `${progress.quizzesCompleted} quizzes`,
    },
    {
      icon: MapPin,
      title: "Centres de Santé",
      titleAr: "مراكز الصحة",
      titleEn: "Health Centers",
      description: "Services confidentiels près de vous",
      descriptionAr: "خدمات سرية بالقرب منك",
      descriptionEn: "Confidential services near you",
      color: "from-blue-400 to-indigo-500",
      bgImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
      page: "map",
      stats: "Centres partenaires",
      statsAr: "مراكز شريكة",
      statsEn: "Partner centers",
    },
  ]

  const getText = (fr: string, ar: string, en: string) => {
    if (settings.language === 'ar') return ar
    if (settings.language === 'en') return en
    return fr
  }

  const getGreeting = () => {
    const greetings = {
      morning: { fr: "Bon matin! 🌅 Prenez soin de vous", ar: "صباح الخير! 🌅 اعتن بنفسك", en: "Good morning! 🌅 Take care of yourself" },
      afternoon: { fr: "Bon après-midi! ☀️ Continuez votre parcours", ar: "مساء الخير! ☀️ واصل رحلتك", en: "Good afternoon! ☀️ Continue your journey" },
      evening: { fr: "Bonsoir! 🌙 Moment idéal pour apprendre", ar: "مساء الخير! 🌙 وقت مثالي للتعلم", en: "Good evening! 🌙 Perfect time to learn" }
    }
    return getText(greetings[timeOfDay].fr, greetings[timeOfDay].ar, greetings[timeOfDay].en)
  }

  const getRecommendations = () => {
    const recs = []
    
    if (progress.quizzesCompleted < 3 && quizData.length > 0) {
      recs.push({
        title: getText("Comprendre le consentement", "فهم الموافقة", "Understanding consent"),
        description: getText(
          "Une histoire interactive sur les relations saines",
          "قصة تفاعلية حول العلاقات الصحية",
          "An interactive story about healthy relationships"
        ),
        icon: Heart,
        color: "bg-emerald-500/10",
        iconColor: "text-emerald-600",
        action: getText("Commencer", "ابدأ", "Start"),
        page: "stories",
      })
    }

    if (progress.storiesRead < 5 && storyData.length > 0) {
      recs.push({
        title: getText("Quiz: Méthodes contraceptives", "اختبار: وسائل منع الحمل", "Quiz: Contraceptive methods"),
        description: getText(
          "Testez vos connaissances sur la contraception",
          "اختبر معرفتك بوسائل منع الحمل",
          "Test your knowledge about contraception"
        ),
        icon: Shield,
        color: "bg-blue-500/10",
        iconColor: "text-blue-600",
        action: getText("Participer", "شارك", "Participate"),
        page: "quiz",
      })
    }

    recs.push({
      title: getText("Nouveau: IST et prévention", "جديد: الأمراض المنقولة", "New: STIs and prevention"),
      description: getText(
        "Informations essentielles sur la prévention",
        "معلومات أساسية حول الوقاية",
        "Essential information about prevention"
      ),
      icon: Sparkles,
      color: "bg-teal-500/10",
      iconColor: "text-teal-600",
      action: getText("Découvrir", "اكتشف", "Discover"),
      page: "reels",
    })

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

    return recs.slice(0, 3)
  }

  const recommendations = getRecommendations()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-teal-950">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-emerald-100 dark:border-gray-800 shadow-sm">
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300 ${
          isNavOpen ? 'max-w-7xl' : 'max-w-full'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  WellnessXP
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">
                  {getText("Votre bien-être, notre priorité", "رفاهيتك أولويتنا", "Your wellness, our priority")}
                </p>
              </div>
            </div>

            {/* Stats Header - Responsive */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white dark:bg-gray-800 rounded-lg border border-emerald-200 dark:border-gray-700 shadow-sm">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500 fill-emerald-500" />
                <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">{progress.level}</span>
              </div>
              
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-gray-700 shadow-sm">
                <Flame className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-bold text-gray-900 dark:text-white">{streak}j</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className={`mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 transition-all duration-300 ${
        isNavOpen ? 'max-w-7xl' : 'max-w-full'
      }`}>
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-90" />
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=400&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="relative z-10 p-6 sm:p-8 lg:p-10 text-white">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">{getGreeting()}</h2>
            <p className="text-white/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              {getText(
                "Explorez nos ressources sur la santé sexuelle dans un espace sûr, confidentiel et sans jugement. Votre bien-être est notre priorité.",
                "استكشف مواردنا حول الصحة الجنسية في مساحة آمنة وسرية وخالية من الأحكام. رفاهيتك أولويتنا.",
                "Explore our sexual health resources in a safe, confidential, and judgment-free space. Your well-being is our priority."
              )}
            </p>
            
            {/* Mobile streak indicator */}
            <div className="sm:hidden mt-4 inline-flex items-center gap-2 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <Flame className="w-4 h-4 text-cyan-300" />
              <span className="text-sm font-semibold">{streak} {getText("jours de série", "أيام متتالية", "day streak")}</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-1">
            {getText("Explorez nos Ressources", "استكشف مواردنا", "Explore Our Resources")}
          </h3>
          <div className={`grid gap-4 sm:gap-6 transition-all duration-300 ${
            isNavOpen 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4'
          }`}>
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer border-0 overflow-hidden bg-white dark:bg-gray-800 duration-300"
                  onClick={() => onNavigate?.(feature.page)}
                >
                  <div className="relative h-32 sm:h-40 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url(${feature.bgImage})` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-80 group-hover:opacity-70 transition-opacity`} />
                    <div className="absolute top-3 right-3 text-white/40 text-4xl font-bold">0{index + 1}</div>
                    <div className="absolute bottom-3 left-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-3 pt-4">
                    <CardTitle className="text-base sm:text-lg text-gray-900 dark:text-white">
                      {getText(feature.title, feature.titleAr, feature.titleEn)}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {getText(feature.description, feature.descriptionAr, feature.descriptionEn)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                        {getText(feature.stats, feature.statsAr, feature.statsEn)}
                      </span>
                      <Button size="sm" className={`bg-gradient-to-r ${feature.color} hover:opacity-90 text-white border-0 text-xs sm:text-sm`}>
                        {getText("Voir", "عرض", "View")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Recommendations */}
            {recommendations.length > 0 && (
              <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white text-base sm:text-lg">
                    <Target className="w-5 h-5 text-emerald-500" />
                    {getText("Pour Vous", "لك", "For You")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  {recommendations.map((rec, idx) => {
                    const Icon = rec.icon
                    return (
                      <div
                        key={idx}
                        className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-rose-300 dark:hover:border-rose-700 transition-colors group cursor-pointer bg-gradient-to-r from-transparent to-gray-50 dark:to-gray-900"
                        onClick={() => onNavigate?.(rec.page)}
                      >
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${rec.color} flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${rec.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{rec.title}</h4>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{rec.description}</p>
                        </div>
                        <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 text-xs sm:text-sm flex-shrink-0">
                          {rec.action}
                        </Button>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            )}

            {/* Progress Stats */}
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white text-base sm:text-lg">
                  <TrendingUp className="w-5 h-5 text-teal-500" />
                  {getText("Votre Progression", "تقدمك", "Your Progress")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-3 sm:p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{getText("XP Semaine", "نقاط الأسبوع", "Weekly XP")}</span>
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">+{weeklyXP}</p>
                    <div className="w-full bg-emerald-200 dark:bg-emerald-900/30 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(100, (weeklyXP / 500) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-3 sm:p-4 rounded-xl border border-teal-200 dark:border-teal-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{getText("Activités", "الأنشطة", "Activities")}</span>
                      <CheckCircle2 className="w-4 h-4 text-teal-500" />
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-teal-600 dark:text-teal-400">{totalActivities}</p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-2 rounded-full ${
                            i < Math.min(5, Math.floor(totalActivities / 7)) 
                              ? 'bg-teal-500' 
                              : 'bg-gray-300 dark:bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 sm:p-4 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{getText("Badges", "الشارات", "Badges")}</span>
                      <Award className="w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                      {earnedBadgesCount}<span className="text-sm text-gray-500">/{totalBadgesCount}</span>
                    </p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-2 rounded-full ${
                            i < Math.min(5, Math.floor((earnedBadgesCount / totalBadgesCount) * 5))
                              ? 'bg-green-500' 
                              : 'bg-gray-300 dark:bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-3 sm:p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{getText("Série", "السلسلة", "Streak")}</span>
                      <Flame className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{streak} {getText("j", "ي", "d")}</p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-2 rounded-full ${
                            i < streak ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Level Progress */}
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900 dark:text-white text-base sm:text-lg">
                  {getText("Niveau", "المستوى", "Level")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 relative">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="38%"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="38%"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        strokeDasharray={`${xpProgress * 2.4} 240`}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                                              <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#14b8a6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Star className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500 fill-emerald-500" />
                    </div>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Niveau {progress.level}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {progress.totalXP} / {nextLevelXP} XP
                  </p>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Platform Stats */}
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white text-base sm:text-lg">
                  {getText("Impact", "التأثير", "Impact")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-transparent dark:from-emerald-900/20">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">500+</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{getText("Ressources", "الموارد", "Resources")}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-teal-50 to-transparent dark:from-teal-900/20">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 sm:w-8 sm:h-8 text-teal-500" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">10K+</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{getText("Utilisateurs", "المستخدمين", "Users")}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">100%</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{getText("Confidentiel", "سري", "Confidential")}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="relative">
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=300&fit=crop)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 opacity-90" />
                <CardContent className="relative z-10 pt-6 text-center text-white">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-2">
                    {getText("Besoin d'aide ?", "تحتاج مساعدة؟", "Need help?")}
                  </h3>
                  <p className="text-white/90 text-xs sm:text-sm mb-4 px-2">
                    {getText(
                      "Accédez à nos services confidentiels et nos professionnels",
                      "الوصول إلى خدماتنا السرية ومهنيينا",
                      "Access our confidential services and professionals"
                    )}
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-white text-rose-600 hover:bg-gray-100 w-full shadow-lg text-sm sm:text-base"
                    onClick={() => onNavigate?.('map')}
                  >
                    {getText("Trouver un Centre", "ابحث عن مركز", "Find a Center")}
                  </Button>
                </CardContent>
              </div>
            </Card>

            {/* Info Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
                      {getText("Espace sûr et confidentiel", "مساحة آمنة وسرية", "Safe and confidential space")}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {getText(
                        "Toutes vos données sont protégées. Apprenez en toute tranquillité.",
                        "جميع بياناتك محمية. تعلم براحة تامة.",
                        "All your data is protected. Learn with peace of mind."
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border-l-4 border-rose-500">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                {getText("Sans jugement", "بدون حكم", "Judgment-free")}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {getText(
                "Un espace bienveillant pour toutes vos questions",
                "مساحة داعمة لجميع أسئلتك",
                "A supportive space for all your questions"
              )}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                {getText("Confidentiel", "سري", "Confidential")}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {getText(
                "Vos informations restent privées et sécurisées",
                "معلوماتك تبقى خاصة وآمنة",
                "Your information remains private and secure"
              )}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border-l-4 border-teal-500">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                {getText("Communauté", "المجتمع", "Community")}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {getText(
                "Rejoignez des milliers d'utilisateurs bienveillants",
                "انضم لآلاف المستخدمين الداعمين",
                "Join thousands of supportive users"
              )}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
              {getText(
                "WellnessXP - Votre santé, votre bien-être, votre vie",
                "WellnessXP - صحتك، رفاهيتك، حياتك",
                "WellnessXP - Your health, your wellness, your life"
              )}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {getText(
                "Informations fiables • Support 24/7 • Totalement confidentiel",
                "معلومات موثوقة • دعم 24/7 • سري تماماً",
                "Reliable information • 24/7 Support • Completely confidential"
              )}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}