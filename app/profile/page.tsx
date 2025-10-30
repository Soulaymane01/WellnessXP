"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Trophy, Zap, Settings, LogOut, Award, Star, TrendingUp, Target, Clock, CheckCircle, Sparkles, Shield, Bell, Moon, Sun, Volume2, VolumeX, Globe } from "lucide-react"
import { useUser } from '@/lib/user-context'

interface BadgeItem {
  id: string
  name: string
  nameAr: string
  nameEn: string
  description: string
  descriptionAr: string
  descriptionEn: string
  icon: string
  unlocked: boolean
  unlockedDate?: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

interface Achievement {
  id: string
  title: string
  titleAr: string
  titleEn: string
  description: string
  descriptionAr: string
  descriptionEn: string
  progress: number
  target: number
  reward: number
  category: string
}

const BADGES: BadgeItem[] = [
  {
    id: "first-step",
    name: "Première Étape",
    nameAr: "الخطوة الأولى",
    nameEn: "First Step",
    description: "Complétez votre premier quiz",
    descriptionAr: "أكمل أول اختبار لك",
    descriptionEn: "Complete your first quiz",
    icon: "🎯",
    unlocked: true,
    unlockedDate: "2024-10-15",
    rarity: 'common'
  },
  {
    id: "story-lover",
    name: "Curieux",
    nameAr: "فضولي",
    nameEn: "Curious",
    description: "Lisez 5 histoires éducatives",
    descriptionAr: "اقرأ 5 قصص تعليمية",
    descriptionEn: "Read 5 educational stories",
    icon: "📖",
    unlocked: false,
    rarity: 'common'
  },
  {
    id: "reel-watcher",
    name: "Reel Watcher",
    nameAr: "مشاهد الريلز",
    nameEn: "Reel Watcher",
    description: "Regardez 5 reels éducatifs",
    descriptionAr: "شاهد 5 ريلز تعليمية",
    descriptionEn: "Watch 5 educational reels",
    icon: "🎬",
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: "reel-master",
    name: "Reel Master",
    nameAr: "خبير الريلز",
    nameEn: "Reel Master",
    description: "Regardez 15 reels éducatifs",
    descriptionAr: "شاهد 15 ريلز تعليمية",
    descriptionEn: "Watch 15 educational reels",
    icon: "🏆",
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: "knowledge-seeker",
    name: "Knowledge Seeker",
    nameAr: "الباحث عن المعرفة",
    nameEn: "Knowledge Seeker",
    description: "Accumulez 1000 XP",
    descriptionAr: "اجمع 1000 نقطة خبرة",
    descriptionEn: "Accumulate 1000 XP",
    icon: "💪",
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: "quiz-champion",
    name: "Quiz Champion",
    nameAr: "بطل الاختبارات",
    nameEn: "Quiz Champion",
    description: "Complétez 10 quiz",
    descriptionAr: "أكمل 10 اختبارات",
    descriptionEn: "Complete 10 quizzes",
    icon: "🌟",
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: "mentor",
    name: "Mentor",
    nameAr: "الموجه",
    nameEn: "Mentor",
    description: "Aidez 5 autres utilisateurs",
    descriptionAr: "ساعد 5 مستخدمين آخرين",
    descriptionEn: "Help 5 other users",
    icon: "🤝",
    unlocked: false,
    rarity: 'legendary'
  },
]

export default function EnhancedProfile() {
  const { progress, settings, updateSettings, isPending } = useUser()
  const [activeTab, setActiveTab] = useState<"overview" | "badges" | "settings">("overview")
  const [isNavOpen, setIsNavOpen] = useState(true)

  const getText = (fr: string, ar: string, en: string) => {
    if (settings.language === 'ar') return ar
    if (settings.language === 'en') return en
    return fr
  }

  useEffect(() => {
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

  const updatedBadges = BADGES.map((badge) => {
    const isUnlocked = progress.badges.includes(badge.id)
    return {
      ...badge,
      unlocked: isUnlocked,
      unlockedDate: isUnlocked ? new Date().toISOString().split("T")[0] : undefined
    }
  })

  const achievements: Achievement[] = [
    {
      id: "quiz-master",
      title: "Quiz Master",
      titleAr: "خبير الاختبارات",
      titleEn: "Quiz Master",
      description: "Complétez 10 quiz",
      descriptionAr: "أكمل 10 اختبارات",
      descriptionEn: "Complete 10 quizzes",
      progress: progress.quizzesCompleted,
      target: 10,
      reward: 500,
      category: "quiz"
    },
    {
      id: "story-reader",
      title: "Lecteur Assidu",
      titleAr: "القارئ المجتهد",
      titleEn: "Avid Reader",
      description: "Lisez 20 histoires",
      descriptionAr: "اقرأ 20 قصة",
      descriptionEn: "Read 20 stories",
      progress: progress.storiesRead,
      target: 20,
      reward: 300,
      category: "story"
    },
    {
      id: "reel-enthusiast",
      title: "Reel Enthusiast",
      titleAr: "عشاق الريلز",
      titleEn: "Reel Enthusiast",
      description: "Regardez 10 reels",
      descriptionAr: "شاهد 10 ريلز",
      descriptionEn: "Watch 10 reels",
      progress: progress.reelsWatched,
      target: 10,
      reward: 400,
      category: "reel"
    },
  ]

  const xpPercentage = ((progress.totalXP % 500) / 500) * 100
  const xpToNextLevel = 500 - (progress.totalXP % 500)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-slate-400 to-slate-500'
      case 'rare': return 'from-blue-400 to-blue-600'
      case 'epic': return 'from-purple-400 to-purple-600'
      case 'legendary': return 'from-amber-400 to-amber-600'
      default: return 'from-slate-400 to-slate-500'
    }
  }

  const handleLanguageChange = async (lang: string) => {
    await updateSettings({ language: lang as 'fr' | 'ar' | 'en' })
  }

  const handleThemeToggle = async () => {
    await updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })
  }

  const handleSoundToggle = async () => {
    await updateSettings({ soundEnabled: !settings.soundEnabled })
  }

  const handleNotificationToggle = async () => {
    await updateSettings({ notificationsEnabled: !settings.notificationsEnabled })
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-background via-background to-rose-500/5 transition-all duration-300 `}>
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  {getText("Mon Profil", "ملفي الشخصي", "My Profile")}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {getText("Gérez votre profil et vos préférences", "إدارة ملفك الشخصي وتفضيلاتك", "Manage your profile and preferences")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/20 hidden sm:flex">
                <Trophy className="w-3 h-3 mr-1" />
                {getText("Niveau", "المستوى", "Level")} {progress.level}
              </Badge>
              <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 hidden sm:flex">
                <Zap className="w-3 h-3 mr-1" />
                {progress.totalXP} XP
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Main Profile Card */}
          <Card className="border-border/50 lg:col-span-2 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500" />
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{getText("Profil Utilisateur", "الملف الشخصي", "User Profile")}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="hover:bg-secondary/20">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <Zap className="w-3 h-3" />
                    {progress.level}
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    {getText("Utilisateur Anonyme", "مستخدم مجهول", "Anonymous User")}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {getText("Membre depuis octobre 2024", "عضو منذ أكتوبر 2024", "Member since October 2024")}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <p className="text-xs text-green-600 font-medium">
                      {getText("100% Confidentiel", "100٪ سري", "100% Confidential")}
                    </p>
                  </div>
                </div>
              </div>

              {/* XP Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    {getText("Niveau", "المستوى", "Level")} {progress.level}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {progress.totalXP % 500} / 500 XP
                  </span>
                </div>
                <div className="w-full bg-secondary/20 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${xpPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {getText(
                    `${xpToNextLevel} XP jusqu'au niveau ${progress.level + 1}`,
                    `${xpToNextLevel} نقطة خبرة حتى المستوى ${progress.level + 1}`,
                    `${xpToNextLevel} XP until level ${progress.level + 1}`
                  )}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl border border-blue-500/20 hover:scale-105 transition-transform">
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">{progress.quizzesCompleted}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {getText("Quiz", "اختبارات", "Quizzes")}
                  </p>
                </div>
                <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl border border-purple-500/20 hover:scale-105 transition-transform">
                  <p className="text-xl sm:text-2xl font-bold text-purple-600">{progress.storiesRead}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {getText("Histoires", "قصص", "Stories")}
                  </p>
                </div>
                <div className="p-3 sm:p-4 bg-gradient-to-br from-pink-500/10 to-pink-600/10 rounded-xl border border-pink-500/20 hover:scale-105 transition-transform">
                  <p className="text-xl sm:text-2xl font-bold text-pink-600">{progress.reelsWatched}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {getText("Reels", "ريلز", "Reels")}
                  </p>
                </div>
                <div className="p-3 sm:p-4 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-xl border border-amber-500/20 hover:scale-105 transition-transform">
                  <p className="text-xl sm:text-2xl font-bold text-amber-600">
                    {updatedBadges.filter(b => b.unlocked).length}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {getText("Badges", "شارات", "Badges")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Summary */}
          <Card className="border-border/50 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-yellow-500" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                {getText("Statistiques", "الإحصائيات", "Statistics")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-xl border border-rose-500/20">
                <p className="text-sm text-muted-foreground mb-1">
                  {getText("XP Total", "إجمالي النقاط", "Total XP")}
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  {progress.totalXP}
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-500/20">
                <p className="text-sm text-muted-foreground mb-1">
                  {getText("Badges Débloqués", "الشارات المفتوحة", "Unlocked Badges")}
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {updatedBadges.filter(b => b.unlocked).length}/{updatedBadges.length}
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  {getText("Prochains Objectifs", "الأهداف القادمة", "Next Goals")}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs p-2 bg-secondary/10 rounded-lg">
                    <span className="text-foreground flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {getText("Niveau", "المستوى", "Level")} {progress.level + 1}
                    </span>
                    <span className="text-muted-foreground font-medium">{xpToNextLevel} XP</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 bg-secondary/10 rounded-lg">
                    <span className="text-foreground flex items-center gap-2">
                      <Award className="w-3 h-3 text-blue-500" />
                      Reel Watcher
                    </span>
                    <span className="text-muted-foreground font-medium">
                      {Math.max(0, 5 - progress.reelsWatched)} {getText("reels", "ريلز", "reels")}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 font-medium transition-all whitespace-nowrap ${
              activeTab === "overview"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {getText("Aperçu", "نظرة عامة", "Overview")}
          </button>
          <button
            onClick={() => setActiveTab("badges")}
            className={`px-4 py-2 font-medium transition-all whitespace-nowrap ${
              activeTab === "badges"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {getText("Badges", "الشارات", "Badges")}
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 font-medium transition-all whitespace-nowrap ${
              activeTab === "settings"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {getText("Paramètres", "الإعدادات", "Settings")}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-4">
            {/* Achievements */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  {getText("Réalisations en Cours", "الإنجازات الجارية", "Achievements in Progress")}
                </CardTitle>
                <CardDescription>
                  {getText("Progressez vers vos objectifs", "تقدم نحو أهدافك", "Progress towards your goals")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement) => {
                  const progressPercent = (achievement.progress / achievement.target) * 100
                  const isComplete = achievement.progress >= achievement.target
                  
                  return (
                    <div key={achievement.id} className={`p-4 rounded-xl border-2 transition-all ${
                      isComplete 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : 'bg-secondary/10 border-border'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          {isComplete && <CheckCircle className="w-4 h-4 text-green-600" />}
                          {getText(achievement.title, achievement.titleAr, achievement.titleEn)}
                        </h4>
                        <span className="text-xs text-muted-foreground font-medium">
                          {achievement.progress}/{achievement.target}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        {getText(achievement.description, achievement.descriptionAr, achievement.descriptionEn)}
                      </p>
                      <div className="w-full bg-secondary/20 rounded-full h-2 mb-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            isComplete 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                              : 'bg-gradient-to-r from-primary to-secondary'
                          }`}
                          style={{ width: `${Math.min(progressPercent, 100)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-500" />
                          +{achievement.reward} XP
                        </p>
                        {isComplete && (
                          <Badge className="bg-green-500/20 text-green-600 border-green-500/30 text-xs">
                            {getText("Complété!", "مكتمل!", "Complete!")}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  {getText("Activité Récente", "النشاط الأخير", "Recent Activity")}
                </CardTitle>
                <CardDescription>
                  {getText("Vos actions récentes", "أفعالك الأخيرة", "Your recent actions")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { 
                    action: getText("Quiz complété", "اختبار مكتمل", "Quiz completed"),
                    detail: getText("Santé Menstruelle", "الصحة الدورية", "Menstrual Health"),
                    date: getText("Aujourd'hui", "اليوم", "Today"),
                    icon: "🎯",
                    color: "text-blue-600"
                  },
                  { 
                    action: getText("Histoire lue", "قصة مقروءة", "Story read"),
                    detail: getText("Consentement et Respect", "الموافقة والاحترام", "Consent and Respect"),
                    date: getText("Hier", "أمس", "Yesterday"),
                    icon: "📖",
                    color: "text-purple-600"
                  },
                  { 
                    action: getText("Badge débloqué", "شارة مفتوحة", "Badge unlocked"),
                    detail: getText("Curieux", "فضولي", "Curious"),
                    date: getText("Il y a 3 jours", "منذ 3 أيام", "3 days ago"),
                    icon: "🏆",
                    color: "text-amber-600"
                  },
                  { 
                    action: getText("Reel regardé", "ريل تمت مشاهدته", "Reel watched"),
                    detail: getText("Contraception Moderne", "وسائل منع الحمل الحديثة", "Modern Contraception"),
                    date: getText("Il y a 5 jours", "منذ 5 أيام", "5 days ago"),
                    icon: "🎬",
                    color: "text-pink-600"
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/10 transition-colors border border-border/50">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.action}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                    </div>
                    <p className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">{item.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "badges" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4">
            {updatedBadges.map((badge) => {
              const badgeName = getText(badge.name, badge.nameAr, badge.nameEn)
              const badgeDescription = getText(badge.description, badge.descriptionAr, badge.descriptionEn)
              
              return (
                <Card 
                  key={badge.id} 
                  className={`border-2 transition-all hover:scale-105 overflow-hidden ${
                    badge.unlocked 
                      ? 'bg-gradient-to-br from-card to-primary/5 border-primary/30 shadow-lg' 
                      : 'opacity-60 hover:opacity-80 border-border/50'
                  }`}
                >
                  {badge.unlocked && (
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getRarityColor(badge.rarity)}`} />
                  )}
                  <CardContent className="pt-6 text-center relative">
                    <div className={`text-5xl mb-3 ${badge.unlocked ? 'animate-bounce-slow' : 'grayscale'}`}>
                      {badge.icon}
                    </div>
                    {badge.unlocked && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                    )}
                    <h3 className="font-bold text-foreground mb-1 text-sm">{badgeName}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{badgeDescription}</p>
                    
                    <Badge className={`text-xs ${
                      badge.rarity === 'legendary' ? 'bg-amber-500/20 text-amber-600 border-amber-500/30' :
                      badge.rarity === 'epic' ? 'bg-purple-500/20 text-purple-600 border-purple-500/30' :
                      badge.rarity === 'rare' ? 'bg-blue-500/20 text-blue-600 border-blue-500/30' :
                      'bg-slate-500/20 text-slate-600 border-slate-500/30'
                    }`}>
                      {getText(
                        badge.rarity === 'legendary' ? 'Légendaire' : badge.rarity === 'epic' ? 'Épique' : badge.rarity === 'rare' ? 'Rare' : 'Commun',
                        badge.rarity === 'legendary' ? 'أسطوري' : badge.rarity === 'epic' ? 'ملحمي' : badge.rarity === 'rare' ? 'نادر' : 'عادي',
                        badge.rarity === 'legendary' ? 'Legendary' : badge.rarity === 'epic' ? 'Epic' : badge.rarity === 'rare' ? 'Rare' : 'Common'
                      )}
                    </Badge>
                    
                    {badge.unlocked ? (
                      <p className="text-xs text-green-600 font-medium mt-3 flex items-center justify-center gap-1">
                        <Star className="w-3 h-3" />
                        {getText("Débloqué le", "مفتوح في", "Unlocked on")} {badge.unlockedDate}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground mt-3">
                        {getText("Non débloqué", "غير مفتوح", "Not unlocked")}
                      </p>
                    )}
                  </CardContent>
                </Card>
                )
                })}
              </div>
            )
            }
            </div>
        </div>
        )}