"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Heart, ChevronLeft, ChevronRight, Share2, Clock, Award, CheckCircle2, Play, Sparkles, Filter, Search } from "lucide-react"
import { useUser } from "@/lib/user-context"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

interface Chapter {
  id: number
  content: string
  contentAr: string
  contentEn: string
  choices: any[]
}

interface Story {
  id: string
  title: string
  titleAr: string
  titleEn: string
  description: string
  descriptionAr: string
  descriptionEn: string
  category: string
  coverImage: string
  difficulty: string
  xpReward: number
  estimatedTime: number
  chapters: Chapter[]
  createdAt: string
}

interface StoriesProps {
  stories: Story[]
}

export default function Stories({ stories }: StoriesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isNavOpen, setIsNavOpen] = useState(true)
  const { settings, hasReadStory, progress } = useUser()
  const router = useRouter()

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

  const getText = (fr: string, ar: string, en: string) => {
    if (settings.language === 'ar') return ar
    if (settings.language === 'en') return en
    return fr
  }

  const getTitle = (story: Story) => getText(story.title, story.titleAr, story.titleEn)
  const getDescription = (story: Story) => getText(story.description, story.descriptionAr, story.descriptionEn)

  // Get unique categories
  const categories = Array.from(new Set(stories.map(s => s.category)))

  // Filter stories
  const filteredStories = stories.filter(story => {
    const matchesCategory = categoryFilter === "all" || story.category === categoryFilter
    const matchesSearch = searchQuery === "" || 
      getTitle(story).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getDescription(story).toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const currentStory = filteredStories[currentIndex] || stories[0]
  const isCompleted = hasReadStory(currentStory?.id)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredStories.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredStories.length) % filteredStories.length)
  }

  const handleStartStory = () => {
    if (currentStory) {
      router.push(`/stories/${currentStory.id}`)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'hard': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
    }
  }

  const getDifficultyText = (difficulty: string) => {
    const texts = {
      easy: { fr: "Facile", ar: "سهل", en: "Easy" },
      medium: { fr: "Moyen", ar: "متوسط", en: "Medium" },
      hard: { fr: "Difficile", ar: "صعب", en: "Hard" }
    }
    return getText(texts[difficulty]?.fr || difficulty, texts[difficulty]?.ar || difficulty, texts[difficulty]?.en || difficulty)
  }

  if (!currentStory) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-background via-background to-purple-500/5 transition-all duration-300 ${
        isNavOpen ? 'md:ml-64' : 'md:ml-20'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">
            {getText("Aucune histoire disponible", "لا توجد قصص متاحة", "No stories available")}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-background via-background to-purple-500/5 transition-all duration-300 ${
      isNavOpen ? 'md:ml-64' : 'md:ml-20'
    }`}>
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {getText("Histoires Interactives", "قصص تفاعلية", "Interactive Stories")}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {getText("Apprenez à travers des récits engageants", "تعلم من خلال قصص جذابة", "Learn through engaging stories")}
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium">{progress.storiesRead} {getText("lues", "مقروءة", "read")}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-pink-500/10 rounded-full border border-pink-500/20">
                <Award className="w-4 h-4 text-pink-600" />
                <span className="text-sm font-medium">{progress.storiesPoints} XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={getText("Rechercher une histoire...", "ابحث عن قصة...", "Search for a story...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value)
                setCurrentIndex(0)
              }}
              className="px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">{getText("Toutes les catégories", "جميع الفئات", "All categories")}</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Story Card */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-0">
                {/* Story Cover */}
                <div className="relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 aspect-video flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30" />
                  <div className="text-8xl z-10">{currentStory.coverImage}</div>
                  
                  {/* Completion Badge */}
                  {isCompleted && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                      <CheckCircle2 className="w-3 h-3" />
                      {getText("Complété", "مكتمل", "Completed")}
                    </div>
                  )}

                  {/* Category & Difficulty Badges */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <Badge className="bg-purple-500/80 text-white backdrop-blur-sm">
                      {currentStory.category}
                    </Badge>
                    <Badge className={`${getDifficultyColor(currentStory.difficulty)} backdrop-blur-sm`}>
                      {getDifficultyText(currentStory.difficulty)}
                    </Badge>
                  </div>
                </div>

                {/* Story Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-foreground mb-2">{getTitle(currentStory)}</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">{getDescription(currentStory)}</p>
                    </div>
                  </div>

                  {/* Story Stats */}
                  <div className="flex items-center gap-6 mb-6 p-4 bg-secondary/10 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {currentStory.estimatedTime} {getText("min", "دقيقة", "min")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {currentStory.chapters.length} {getText("chapitres", "فصول", "chapters")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-semibold text-purple-600">
                        +{currentStory.xpReward} XP
                      </span>
                    </div>
                  </div>

                  {/* Story Features */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                    <div className="flex items-start gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          {getText("Histoire Interactive", "قصة تفاعلية", "Interactive Story")}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {getText(
                            "Vos choix façonnent le récit. Chaque décision a des conséquences et vous rapporte de l'XP!",
                            "اختياراتك تشكل القصة. كل قرار له عواقب ويمنحك نقاط خبرة!",
                            "Your choices shape the narrative. Every decision has consequences and earns you XP!"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={handlePrev}
                      variant="outline"
                      className="flex-1 border-border hover:bg-secondary/20 bg-transparent"
                      disabled={filteredStories.length <= 1}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      {getText("Précédent", "السابق", "Previous")}
                    </Button>
                    <Button
                      onClick={handleStartStory}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {isCompleted 
                        ? getText("Relire", "إعادة القراءة", "Re-read")
                        : getText("Commencer", "ابدأ", "Start")
                      }
                    </Button>
                    <Button
                      onClick={handleNext}
                      variant="outline"
                      className="flex-1 border-border hover:bg-secondary/20 bg-transparent"
                      disabled={filteredStories.length <= 1}
                    >
                      {getText("Suivant", "التالي", "Next")}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Story List Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {getText("Autres Histoires", "قصص أخرى", "Other Stories")}
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {filteredStories.length}
                </Badge>
              </div>
              
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredStories.map((story, idx) => {
                  const completed = hasReadStory(story.id)
                  return (
                    <button
                      key={story.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-full text-left p-4 rounded-lg transition-all group ${
                        idx === currentIndex
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 shadow-md"
                          : "bg-card border-2 border-transparent hover:bg-secondary/20 hover:border-purple-500/30"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-2xl mb-2">{story.coverImage}</div>
                        {completed && (
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="font-semibold text-sm text-foreground mb-1 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {getTitle(story)}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{story.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          {story.xpReward} XP
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                {getText(
                  "Vous avez une histoire à partager?",
                  "هل لديك قصة للمشاركة؟",
                  "Have a story to share?"
                )}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {getText(
                  "Vos expériences et perspectives aident les autres. Contactez-nous pour contribuer à notre plateforme.",
                  "تجاربك ووجهات نظرك تساعد الآخرين. اتصل بنا للمساهمة في منصتنا.",
                  "Your experiences and perspectives help others. Contact us to contribute to our platform."
                )}
              </p>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-transparent hover:bg-purple-500 hover:text-white border-purple-500/50 hover:border-purple-500 transition-all"
              >
                {getText("Contribuer", "ساهم", "Contribute")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--muted-foreground) / 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--muted-foreground) / 0.5);
        }
      `}</style>
    </div>
  )
}