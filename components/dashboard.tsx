"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Brain, Users, Zap, BookOpen, Film, TrendingUp, Award, Clock, Target } from "lucide-react"
import { getUserProgress } from "@/lib/points-manager"

interface DashboardProps {
  onNavigate?: (page: string) => void
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [userProgress, setUserProgress] = useState(getUserProgress())
  const [timeOfDay, setTimeOfDay] = useState("morning")
  const [isNavOpen, setIsNavOpen] = useState(true)

 useEffect(() => {
  const hour = new Date().getHours()
  if (hour < 12) setTimeOfDay("morning")
  else if (hour < 18) setTimeOfDay("afternoon")
  else setTimeOfDay("evening")

  const progress = getUserProgress()
  setUserProgress(progress)

  // Observer pour détecter les changements de la variable CSS --nav-width
  const observer = new MutationObserver(() => {
    const navWidth = getComputedStyle(document.documentElement).getPropertyValue('--nav-width').trim()
    setIsNavOpen(navWidth === '16rem')
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['style']
  })

  // Vérification initiale de l'état du menu
  const initialWidth = getComputedStyle(document.documentElement).getPropertyValue('--nav-width').trim()
  setIsNavOpen(initialWidth === '16rem' || initialWidth === '')

  return () => observer.disconnect()
}, [])

  const features = [
    {
      icon: Brain,
      title: "Dr. Amina",
      description: "Chatbot IA pour vos questions",
      color: "bg-emerald-100 dark:bg-emerald-900/30",
      page: "chat",
      stats: "23 questions posées",
    },
    {
      icon: BookOpen,
      title: "Histoires Interactives",
      description: "Apprenez à travers des récits",
      color: "bg-indigo-100 dark:bg-indigo-900/30",
      page: "stories",
      stats: "12 histoires lues",
    },
    {
      icon: Film,
      title: "Reels Éducatifs",
      description: "Vidéos courtes et engageantes",
      color: "bg-violet-100 dark:bg-violet-900/30",
      page: "reels",
      stats: `${userProgress.reelsWatched} reels regardés`,
    },
    {
      icon: Zap,
      title: "Quiz Éducatifs",
      description: "Testez vos connaissances",
      color: "bg-rose-100 dark:bg-rose-900/30",
      page: "quiz",
      stats: "7 quiz complétés",
    },
    {
      icon: Heart,
      title: "Santé & Bien-être",
      description: "Conseils et ressources",
      color: "bg-cyan-100 dark:bg-cyan-900/30",
      page: "map",
      stats: "4 centres visités",
    },
    {
      icon: Users,
      title: "Communauté",
      description: "Connectez-vous avec d'autres",
      color: "bg-orange-100 dark:bg-orange-900/30",
      page: "profile",
      stats: "Voir votre profil",
    },
  ]

  const getGreeting = () => {
    if (timeOfDay === "morning") return "Bonjour! Prêt à apprendre?"
    if (timeOfDay === "afternoon") return "Bon après-midi! Continuez votre apprentissage"
    return "Bonsoir! Détendez-vous et apprenez"
  }

  const recommendations = [
    {
      title: "Complétez votre prochain quiz",
      description: "Vous êtes à 70% du Quiz Santé Menstruelle",
      icon: Target,
      color: "bg-blue-500/10",
      action: "Continuer",
    },
    {
      title: "Regardez un nouveau reel",
      description: "Découvrez notre dernier contenu sur le consentement",
      icon: Film,
      color: "bg-purple-500/10",
      action: "Regarder",
    },
    {
      title: "Vous êtes proche du niveau suivant",
      description: "Encore 150 XP pour atteindre le niveau 5",
      icon: TrendingUp,
      color: "bg-green-500/10",
      action: "Voir",
    },
  ]

  return (
<div className={`min-h-screen bg-gradient-to-br from-background via-background to-primary/5 transition-all duration-300 ${
  isNavOpen ? 'md:ml-64' : 'md:ml-20'
}`}>      {/* Enhanced Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
<div className={`mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-all duration-300 ${
  isNavOpen ? 'max-w-7xl' : 'max-w-full'
}`}>          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">WellnessXP</h1>
              <p className="text-sm text-muted-foreground mt-1">Votre plateforme de santé sexuelle</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Niveau {userProgress.level}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full">
                <Award className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-secondary">{userProgress.totalXP} XP</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-accent">En ligne</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
<main className={`mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-300 ${
  isNavOpen ? 'max-w-7xl' : 'max-w-full'
}`}>        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">{getGreeting()}</h2>
          <p className="text-muted-foreground max-w-2xl">
            Explorez nos ressources complètes sur la santé sexuelle et reproductive. Posez vos questions à Dr. Amina,
            apprenez à travers des histoires interactives, et connectez-vous avec une communauté bienveillante.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Recommandations Personnalisées
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((rec, idx) => {
              const Icon = rec.icon
              return (
                <Card key={idx} className="border-border/50 hover:shadow-lg transition-smooth">
                  <CardContent className="pt-6">
                    <div className={`w-12 h-12 rounded-lg ${rec.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => onNavigate?.(rec.action.toLowerCase())}
                    >
                      {rec.action}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-secondary" />
            Votre Progression
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">XP Cette Semaine</p>
                    <p className="text-2xl font-bold text-primary">+250</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary/30" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Activités Complétées</p>
                    <p className="text-2xl font-bold text-secondary">42</p>
                  </div>
                  <Award className="w-8 h-8 text-secondary/30" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Badges Débloqués</p>
                    <p className="text-2xl font-bold text-accent">2/6</p>
                  </div>
                  <Award className="w-8 h-8 text-accent/30" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Série Actuelle</p>
                    <p className="text-2xl font-bold text-chart-4">5 jours</p>
                  </div>
                  <Clock className="w-8 h-8 text-chart-4/30" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-foreground mb-4">Explorez nos Ressources</h3>
<div className={`grid gap-6 transition-all duration-300 ${
  isNavOpen 
    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
}`}>            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  className="group hover:shadow-lg transition-smooth cursor-pointer border-border/50 hover:border-primary/30"
                >
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-3">{feature.stats}</p>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                      onClick={() => onNavigate?.(feature.page)}
                    >
                      Découvrir
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Ressources Disponibles</p>
                  <p className="text-3xl font-bold text-primary">500+</p>
                </div>
                <BookOpen className="w-10 h-10 text-primary/20" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-gradient-to-br from-secondary/5 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Utilisateurs Actifs</p>
                  <p className="text-3xl font-bold text-secondary">10K+</p>
                </div>
                <Users className="w-10 h-10 text-secondary/20" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-gradient-to-br from-accent/5 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Support Disponible</p>
                  <p className="text-3xl font-bold text-accent">24/7</p>
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
