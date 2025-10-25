"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getUserProgress } from "@/lib/points-manager"
import { calculateUserInsights, getPersonalizedRecommendations } from "@/lib/recommendation-engine"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Activity, Target, Zap, Calendar } from "lucide-react"

export default function Analytics() {
  const [userProgress, setUserProgress] = useState(getUserProgress())
  const [insights, setInsights] = useState(calculateUserInsights())
  const [recommendations, setRecommendations] = useState(getPersonalizedRecommendations())

  useEffect(() => {
    const progress = getUserProgress()
    setUserProgress(progress)
    setInsights(calculateUserInsights())
    setRecommendations(getPersonalizedRecommendations())
  }, [])

  // Data for charts
  const activityData = [
    { name: "Quiz", value: userProgress.quizzesCompleted, fill: "#10b981" },
    { name: "Histoires", value: userProgress.storiesRead, fill: "#6366f1" },
    { name: "Reels", value: userProgress.reelsWatched, fill: "#a855f7" },
  ]

  const xpProgressData = [
    { week: "Sem 1", xp: 150 },
    { week: "Sem 2", xp: 200 },
    { week: "Sem 3", xp: 180 },
    { week: "Sem 4", xp: 250 },
    { week: "Sem 5", xp: 220 },
    { week: "Sem 6", xp: 280 },
    { week: "Sem 7", xp: 310 },
  ]

  const levelProgressData = [
    { level: "Niveau 1", xp: 500, current: 500 },
    { level: "Niveau 2", xp: 500, current: 450 },
    { level: "Niveau 3", xp: 500, current: 200 },
    { level: "Niveau 4", xp: 500, current: 0 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 md:ml-64">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-secondary" />
            </div>
            Analytique & Progression
          </h1>
          <p className="text-muted-foreground mt-2">Suivez votre apprentissage et vos progrès</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Activités Totales</p>
                  <p className="text-3xl font-bold text-primary">{insights.totalActivities}</p>
                </div>
                <Activity className="w-8 h-8 text-primary/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">XP Moyen par Activité</p>
                  <p className="text-3xl font-bold text-secondary">{insights.averageXpPerActivity}</p>
                </div>
                <Zap className="w-8 h-8 text-secondary/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Série Actuelle</p>
                  <p className="text-3xl font-bold text-accent">{Math.round(insights.learningStreak)} jours</p>
                </div>
                <Calendar className="w-8 h-8 text-accent/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Prochain Jalon</p>
                  <p className="text-sm font-bold text-chart-4 line-clamp-2">{insights.nextMilestone}</p>
                </div>
                <Target className="w-8 h-8 text-chart-4/30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Activity Distribution */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Distribution des Activités</CardTitle>
              <CardDescription>Répartition de vos activités d'apprentissage</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={activityData} cx="50%" cy="50%" labelLine={false} label={{ position: "insideRight" }}>
                    {activityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* XP Progress Over Time */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Progression XP Hebdomadaire</CardTitle>
              <CardDescription>Votre XP gagné chaque semaine</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={xpProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="week" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="xp"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={{ fill: "var(--primary)", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="border-border/50 mb-8">
          <CardHeader>
            <CardTitle>Progression par Niveau</CardTitle>
            <CardDescription>Votre progression vers les niveaux suivants</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={levelProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="level" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="current" stackId="a" fill="var(--primary)" name="XP Actuel" />
                <Bar dataKey="xp" stackId="a" fill="var(--muted)" name="XP Restant" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Recommandations Personnalisées
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="border-border/50 hover:shadow-lg transition-smooth">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{rec.icon}</span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        rec.priority === "high"
                          ? "bg-red-500/20 text-red-700 dark:text-red-400"
                          : rec.priority === "medium"
                            ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                            : "bg-blue-500/20 text-blue-700 dark:text-blue-400"
                      }`}
                    >
                      {rec.priority === "high" ? "Urgent" : rec.priority === "medium" ? "Moyen" : "Faible"}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{rec.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                  <p className="text-xs text-muted-foreground mb-4">Raison: {rec.reason}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {rec.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Statistiques Détaillées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Quiz Complétés</span>
                <span className="font-semibold text-foreground">{userProgress.quizzesCompleted}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Histoires Lues</span>
                <span className="font-semibold text-foreground">{userProgress.storiesRead}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Reels Regardés</span>
                <span className="font-semibold text-foreground">{userProgress.reelsWatched}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <span className="text-sm text-muted-foreground">XP Total</span>
                <span className="font-semibold text-foreground">{userProgress.totalXP}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Niveau Actuel</span>
                <span className="font-semibold text-foreground">Niveau {userProgress.level}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Badges & Réalisations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Badges Débloqués</span>
                <span className="font-semibold text-foreground">{userProgress.badges.length}/6</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Taux de Réussite Quiz</span>
                <span className="font-semibold text-foreground">85%</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Activité Principale</span>
                <span className="font-semibold text-foreground capitalize">{insights.mostActiveFeature}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Temps Moyen par Activité</span>
                <span className="font-semibold text-foreground">8 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Dernier Accès</span>
                <span className="font-semibold text-foreground">Aujourd'hui</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
