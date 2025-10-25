"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Trophy, Zap, Settings, LogOut } from "lucide-react"
import { getUserProgress } from "@/lib/points-manager"

interface Badge {
  id: number
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedDate?: string
}

interface Achievement {
  id: number
  title: string
  description: string
  progress: number
  target: number
  reward: number
}

const BADGES: Badge[] = [
  {
    id: 1,
    name: "Première Étape",
    description: "Complétez votre premier quiz",
    icon: "🎯",
    unlocked: true,
    unlockedDate: "2024-10-15",
  },
  {
    id: 2,
    name: "Curieux",
    description: "Lisez 5 histoires éducatives",
    icon: "📖",
    unlocked: true,
    unlockedDate: "2024-10-18",
  },
  {
    id: 3,
    name: "Reel Watcher",
    description: "Regardez 5 reels éducatifs",
    icon: "🎬",
    unlocked: false,
  },
  {
    id: 4,
    name: "Reel Master",
    description: "Regardez 15 reels éducatifs",
    icon: "🏆",
    unlocked: false,
  },
  {
    id: 5,
    name: "Knowledge Seeker",
    description: "Accumulez 1000 XP",
    icon: "💪",
    unlocked: false,
  },
  {
    id: 6,
    name: "Mentor",
    description: "Aidez 5 autres utilisateurs",
    icon: "🤝",
    unlocked: false,
  },
]

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    title: "Quiz Master",
    description: "Complétez 10 quiz",
    progress: 7,
    target: 10,
    reward: 500,
  },
  {
    id: 2,
    title: "Lecteur Assidu",
    description: "Lisez 20 histoires",
    progress: 12,
    target: 20,
    reward: 300,
  },
  {
    id: 3,
    title: "Reel Enthusiast",
    description: "Regardez 10 reels",
    progress: 0,
    target: 10,
    reward: 400,
  },
  {
    id: 4,
    title: "Explorateur",
    description: "Visitez tous les centres de santé",
    progress: 4,
    target: 6,
    reward: 250,
  },
]

export default function Profile() {
  const [activeTab, setActiveTab] = useState<"overview" | "badges" | "settings">("overview")
  const [language, setLanguage] = useState("fr")
  const [userProgress, setUserProgress] = useState(getUserProgress())
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([])

  useEffect(() => {
    const progress = getUserProgress()
    setUserProgress(progress)
    setUnlockedBadges(progress.badges)
  }, [])

  const updatedBadges = BADGES.map((badge) => {
    if (badge.id === 3 && unlockedBadges.includes("reel-watcher")) {
      return { ...badge, unlocked: true, unlockedDate: new Date().toISOString().split("T")[0] }
    }
    if (badge.id === 4 && unlockedBadges.includes("reel-master")) {
      return { ...badge, unlocked: true, unlockedDate: new Date().toISOString().split("T")[0] }
    }
    if (badge.id === 5 && unlockedBadges.includes("knowledge-seeker")) {
      return { ...badge, unlocked: true, unlockedDate: new Date().toISOString().split("T")[0] }
    }
    return badge
  })

  const userStats = {
    level: userProgress.level,
    xp: userProgress.totalXP % 500,
    nextLevelXp: 500,
    totalXp: userProgress.totalXP,
    quizzesCompleted: 7,
    storiesRead: 12,
    questionsAsked: 23,
    centersVisited: 4,
    reelsWatched: userProgress.reelsWatched,
  }

  const xpPercentage = (userStats.xp / userStats.nextLevelXp) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-rose-500/5 md:ml-64">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-rose-500" />
            </div>
            Mon Profil
          </h1>
          <p className="text-muted-foreground mt-2">Gérez votre profil et vos préférences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-border/50 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Profil Utilisateur</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Utilisateur Anonyme</h2>
                  <p className="text-muted-foreground">Membre depuis octobre 2024</p>
                  <p className="text-sm text-muted-foreground mt-2">100% Confidentiel • Aucune donnée personnelle</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      Niveau {userStats.level}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {userStats.xp} / {userStats.nextLevelXp} XP
                    </span>
                  </div>
                  <div className="w-full bg-secondary/20 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-300"
                      style={{ width: `${xpPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-secondary/10 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{userStats.quizzesCompleted}</p>
                    <p className="text-xs text-muted-foreground mt-1">Quiz Complétés</p>
                  </div>
                  <div className="p-4 bg-secondary/10 rounded-lg">
                    <p className="text-2xl font-bold text-secondary">{userStats.storiesRead}</p>
                    <p className="text-xs text-muted-foreground mt-1">Histoires Lues</p>
                  </div>
                  <div className="p-4 bg-secondary/10 rounded-lg">
                    <p className="text-2xl font-bold text-accent">{userStats.questionsAsked}</p>
                    <p className="text-xs text-muted-foreground mt-1">Questions Posées</p>
                  </div>
                  <div className="p-4 bg-secondary/10 rounded-lg">
                    <p className="text-2xl font-bold text-chart-4">{userStats.reelsWatched}</p>
                    <p className="text-xs text-muted-foreground mt-1">Reels Regardés</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Statistiques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">XP Total</p>
                <p className="text-2xl font-bold text-foreground">{userStats.totalXp}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Badges Débloqués</p>
                <p className="text-2xl font-bold text-foreground">
                  {updatedBadges.filter((b) => b.unlocked).length}/{updatedBadges.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Taux de Réussite Quiz</p>
                <p className="text-2xl font-bold text-foreground">85%</p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-3">Prochains Objectifs</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground">Niveau {userStats.level + 1}</span>
                    <span className="text-muted-foreground">{500 - userStats.xp} XP restants</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground">Reel Watcher</span>
                    <span className="text-muted-foreground">{Math.max(0, 5 - userStats.reelsWatched)} reels</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "overview"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Aperçu
          </button>
          <button
            onClick={() => setActiveTab("badges")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "badges"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Badges & Réalisations
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "settings"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Paramètres
          </button>
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Réalisations en Cours</CardTitle>
                <CardDescription>Progressez vers vos objectifs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {ACHIEVEMENTS.map((achievement) => {
                  const progress =
                    achievement.id === 3 ? Math.min(userStats.reelsWatched, achievement.target) : achievement.progress
                  const progressPercent = (progress / achievement.target) * 100
                  return (
                    <div key={achievement.id}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">{achievement.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {progress}/{achievement.target}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                      <div className="w-full bg-secondary/20 rounded-full h-2 mb-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">+{achievement.reward} XP à débloquer</p>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Activité Récente</CardTitle>
                <CardDescription>Vos actions récentes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { action: "Quiz complété", detail: "Santé Menstruelle", date: "Aujourd'hui" },
                  { action: "Histoire lue", detail: "Consentement et Respect", date: "Hier" },
                  { action: "Question posée", detail: "À Dr. Amina", date: "Il y a 2 jours" },
                  { action: "Badge débloqué", detail: "Curieux", date: "Il y a 3 jours" },
                  { action: "Centre visité", detail: "Centre de Santé Casablanca", date: "Il y a 5 jours" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{item.action}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">{item.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "badges" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {updatedBadges.map((badge) => (
              <Card key={badge.id} className={`border-border/50 ${badge.unlocked ? "bg-primary/5" : "opacity-60"}`}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-5xl mb-3">{badge.icon}</div>
                    <h3 className="font-semibold text-foreground mb-1">{badge.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{badge.description}</p>
                    {badge.unlocked ? (
                      <p className="text-xs text-green-600 font-medium">Débloqué le {badge.unlockedDate}</p>
                    ) : (
                      <p className="text-xs text-muted-foreground">Non débloqué</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Préférences Générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Langue</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="fr">Français</option>
                    <option value="ar">Darija (Marocain)</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Mode Sombre</label>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Notifications</label>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Confidentialité & Sécurité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                    Votre profil est 100% anonyme
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Aucune donnée personnelle n'est stockée ou partagée
                  </p>
                </div>
                <Button variant="outline" className="w-full border-border hover:bg-secondary/10 bg-transparent">
                  Effacer l'Historique Local
                </Button>
                <Button variant="outline" className="w-full border-border hover:bg-secondary/10 bg-transparent">
                  Réinitialiser le Profil
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
