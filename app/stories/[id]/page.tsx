// /app/stories/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/lib/user-context'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BookOpen, 
  Award, 
  ChevronRight, 
  Home, 
  RotateCcw, 
  Trophy,
  Sparkles,
  CheckCircle2,
  Star,
  ArrowLeft
} from "lucide-react"

interface Choice {
  text: string
  textAr: string
  textEn: string
  nextChapter: number
  xp: number
  feedback: string
  feedbackAr: string
  feedbackEn: string
}

interface Chapter {
  id: number
  content: string
  contentAr: string
  contentEn: string
  choices: Choice[]
}

interface Story {
  id: string
  title: string
  titleAr: string
  titleEn: string
  description: string
  descriptionAr: string
  descriptionEn: string
  coverImage: string
  xpReward: number
  chapters: Chapter[]
}

interface StoryPlayerProps {
  story: Story
}

export default function StoryPlayer({ story }: StoryPlayerProps) {
  const { settings, addStories, isPending } = useUser()
  const router = useRouter()
  const [currentChapterId, setCurrentChapterId] = useState(1)
  const [totalXP, setTotalXP] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [visitedChapters, setVisitedChapters] = useState<Set<number>>(new Set([1]))
  const [storyPath, setStoryPath] = useState<number[]>([1])
  const [isNavOpen, setIsNavOpen] = useState(true)

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

  console.log(story)

  // Safety checks for story data
  if (!story || !story.chapters || !Array.isArray(story.chapters) || story.chapters.length === 0) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-background via-background to-purple-500/5 transition-all duration-300 flex items-center justify-center ${
        isNavOpen ? 'md:ml-64' : 'md:ml-20'
      }`}>
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            {getText("Données de l'histoire invalides", "بيانات القصة غير صالحة", "Invalid story data")}
          </p>
          <Button onClick={() => router.push('/stories')}>
            {getText("Retour aux histoires", "العودة إلى القصص", "Back to stories")}
          </Button>
        </div>
      </div>
    )
  }

  const currentChapter = story.chapters.find((ch: Chapter) => ch.id === currentChapterId)
  const progress = (visitedChapters.size / story.chapters.length) * 100

  const getTitle = () => getText(story.title || '', story.titleAr || '', story.titleEn || '')
  const getContent = () => {
    if (!currentChapter) return ''
    return getText(currentChapter.content || '', currentChapter.contentAr || '', currentChapter.contentEn || '')
  }

  const handleChoiceSelect = async (choice: Choice) => {
    setSelectedChoice(choice)
    setShowFeedback(true)
    setTotalXP(prev => prev + choice.xp)

    // Wait a bit before transitioning
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (choice.nextChapter === -1) {
      // Story completed
      await handleComplete()
    } else {
      // Move to next chapter
      setCurrentChapterId(choice.nextChapter)
      setVisitedChapters(prev => new Set([...prev, choice.nextChapter]))
      setStoryPath(prev => [...prev, choice.nextChapter])
      setSelectedChoice(null)
      setShowFeedback(false)
    }
  }

  const handleComplete = async () => {
    const finalXP = totalXP + story.xpReward
    await addStories(finalXP, getTitle())
    setIsCompleted(true)
  }

  const handleRestart = () => {
    setCurrentChapterId(1)
    setTotalXP(0)
    setSelectedChoice(null)
    setShowFeedback(false)
    setIsCompleted(false)
    setVisitedChapters(new Set([1]))
    setStoryPath([1])
  }

  const handleBackToStories = () => {
    router.push('/stories')
  }

  if (!currentChapter && !isCompleted) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-background via-background to-purple-500/5 transition-all duration-300 flex items-center justify-center ${
        isNavOpen ? 'md:ml-64' : 'md:ml-20'
      }`}>
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            {getText("Chapitre introuvable", "الفصل غير موجود", "Chapter not found")}
          </p>
          <Button onClick={handleBackToStories}>
            {getText("Retour aux histoires", "العودة إلى القصص", "Back to stories")}
          </Button>
        </div>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-background via-background to-purple-500/5 transition-all duration-300 ${
        isNavOpen ? 'md:ml-64' : 'md:ml-20'
      }`}>
        <div className="max-w-3xl mx-auto px-4 py-12">
          <Card className="border-border/50 overflow-hidden shadow-2xl">
            <CardContent className="p-8 md:p-12 text-center">
              {/* Success Animation */}
              <div className="mb-6 relative">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-bounce">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32">
                  <Sparkles className="w-8 h-8 text-yellow-500 absolute top-0 left-0 animate-pulse" />
                  <Sparkles className="w-6 h-6 text-yellow-500 absolute top-4 right-0 animate-pulse delay-150" />
                  <Sparkles className="w-7 h-7 text-yellow-500 absolute bottom-0 right-4 animate-pulse delay-300" />
                </div>
              </div>

              {/* Completion Message */}
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                {getText("Histoire Complétée!", "اكتملت القصة!", "Story Completed!")}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {getText("Félicitations! Vous avez terminé", "تهانينا! لقد أنهيت", "Congratulations! You finished")} <span className="font-semibold text-foreground">{getTitle()}</span>
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-lg border border-purple-500/20">
                  <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">{totalXP + story.xpReward}</p>
                  <p className="text-xs text-muted-foreground">
                    {getText("XP Gagnés", "نقاط الخبرة المكتسبة", "XP Earned")}
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-pink-500/10 to-pink-500/5 rounded-lg border border-pink-500/20">
                  <BookOpen className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-pink-600">{visitedChapters.size}</p>
                  <p className="text-xs text-muted-foreground">
                    {getText("Chapitres Explorés", "فصول مستكشفة", "Chapters Explored")}
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-lg border border-orange-500/20">
                  <CheckCircle2 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-orange-600">{storyPath.length - 1}</p>
                  <p className="text-xs text-muted-foreground">
                    {getText("Choix Faits", "خيارات مختارة", "Choices Made")}
                  </p>
                </div>
              </div>

              {/* Story Summary */}
              <div className="mb-8 p-6 bg-secondary/10 rounded-lg border border-border/50 text-left">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  {getText("Votre Parcours", "رحلتك", "Your Journey")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {getText(
                    `Vous avez navigué à travers ${storyPath.length} chapitres, faisant des choix importants qui ont façonné votre histoire unique. Chaque décision comptait!`,
                    `لقد تنقلت عبر ${storyPath.length} فصلاً، واتخذت خيارات مهمة شكلت قصتك الفريدة. كل قرار كان مهماً!`,
                    `You navigated through ${storyPath.length} chapters, making important choices that shaped your unique story. Every decision mattered!`
                  )}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleBackToStories}
                  variant="outline"
                  className="flex-1 border-border hover:bg-secondary/20"
                >
                  <Home className="w-4 h-4 mr-2" />
                  {getText("Retour aux Histoires", "العودة إلى القصص", "Back to Stories")}
                </Button>
                <Button
                  onClick={handleRestart}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {getText("Rejouer", "إعادة اللعب", "Play Again")}
                </Button>
              </div>
            </CardContent>
          </Card>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToStories}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {getText("Retour", "رجوع", "Back")}
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 rounded-full">
                <Award className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-600">{totalXP} XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Story Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">{story.coverImage}</div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{getTitle()}</h1>
              <p className="text-sm text-muted-foreground">
                {getText("Chapitre", "الفصل", "Chapter")} {currentChapterId} / {story.chapters.length}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {getText("Progression", "التقدم", "Progress")}
              </span>
              <span className="font-semibold text-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Story Content Card */}
        <Card className="border-border/50 shadow-xl mb-6">
          <CardContent className="p-6 md:p-8">
            {/* Chapter Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-foreground leading-relaxed whitespace-pre-line">
                {getContent()}
              </p>
            </div>

            {/* Feedback Section */}
            {showFeedback && selectedChoice && (
              <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      {getText(selectedChoice.feedback, selectedChoice.feedbackAr, selectedChoice.feedbackEn)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      +{selectedChoice.xp} XP {getText("gagné", "مكتسب", "earned")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Choices */}
            {!showFeedback && currentChapter && currentChapter.choices && currentChapter.choices.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground mb-4">
                  {getText("Que faites-vous?", "ماذا تفعل؟", "What do you do?")}
                </p>
                {currentChapter.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoiceSelect(choice)}
                    disabled={isPending}
                    className="w-full p-4 text-left border-2 rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed border-border hover:border-purple-500 bg-card hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-600 text-xs font-bold flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="font-medium text-foreground">
                            {getText(choice.text, choice.textAr, choice.textEn)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-3">
                        <Badge variant="secondary" className="text-xs">
                          +{choice.xp} XP
                        </Badge>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-purple-600 transition-colors" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Story Info Footer */}
        <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg border border-border/50">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{visitedChapters.size}/{story.chapters.length} {getText("chapitres", "فصول", "chapters")}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>{story.xpReward} XP {getText("max", "أقصى", "max")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}