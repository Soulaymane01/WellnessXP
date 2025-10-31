"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, Sparkles, Award, Film, CheckCircle2, Trophy, Brain } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/lib/user-context"

interface Reel {
  id: string
  title: string
  titleAr: string
  titleEn: string
  description: string
  descriptionAr: string
  descriptionEn: string
  topic: string
  topicAr: string
  topicEn: string
  duration: number
  views: number
  likes: number
  liked: boolean
  points: number
  videoColor: string
  icon: string
  category: string
  difficulty: string
  educational: boolean
}

interface ReelsProps {
  reels: Reel[]
}

export default function Reels({ reels: initialReels }: ReelsProps) {
  const { addReels, progress, isPending, settings, userId } = useUser()
  
  const [currentReelIndex, setCurrentReelIndex] = useState(0)
  const [reels, setReels] = useState(initialReels)
  const [isMuted, setIsMuted] = useState(!settings.soundEnabled)
  const [watchedReels, setWatchedReels] = useState<string[]>([])
  const [xpNotification, setXpNotification] = useState<{ points: number; show: boolean }>({ 
    points: 0, 
    show: false 
  })
  const [reelProgress, setReelProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  const currentReel = reels[currentReelIndex]

  // Load watched reels from storage
  useEffect(() => {
    if (!userId) return
    
    const saved = localStorage.getItem(`reelsProgress_${userId}`)
    if (saved) {
      try {
        const watched = JSON.parse(saved)
        setWatchedReels(watched)
      } catch (error) {
        console.error('Failed to load watched reels:', error)
      }
    }
  }, [userId])

  const saveWatchedReels = (watched: string[]) => {
    if (!userId) return
    localStorage.setItem(`reelsProgress_${userId}`, JSON.stringify(watched))
  }

  const getText = (fr: string, ar: string, en: string) => {
    if (settings.language === 'ar') return ar
    if (settings.language === 'en') return en
    return fr
  }

  const getReelTitle = (reel: Reel) => getText(reel.title || '', reel.titleAr || '', reel.titleEn || '')
  const getReelDescription = (reel: Reel) => getText(reel.description || '', reel.descriptionAr || '', reel.descriptionEn || '')
  const getReelTopic = (reel: Reel) => getText(reel.topic || '', reel.topicAr || '', reel.topicEn || '')

  const markReelAsWatched = async (reelId: string) => {
    if (!watchedReels.includes(reelId)) {
      const reel = reels.find((r) => r.id === reelId)
      if (!reel) return

      const newWatchedReels = [...watchedReels, reelId]
      setWatchedReels(newWatchedReels)
      saveWatchedReels(newWatchedReels)

      await addReels(reel.points, getReelTitle(reel))

      setXpNotification({ points: reel.points, show: true })
      setTimeout(() => setXpNotification({ points: 0, show: false }), 2000)
    }
  }

  // Handle scroll snap
  const handleScroll = () => {
    if (!containerRef.current) return
    
    setIsScrolling(true)
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const container = containerRef.current
      if (!container) return

      const scrollPosition = container.scrollTop
      const itemHeight = container.clientHeight
      const newIndex = Math.round(scrollPosition / itemHeight)
      
      if (newIndex !== currentReelIndex && newIndex >= 0 && newIndex < reels.length) {
        if (newIndex > currentReelIndex) {
          markReelAsWatched(reels[currentReelIndex].id)
        }
        setCurrentReelIndex(newIndex)
      }
      
      setIsScrolling(false)
    }, 150)
  }

  // Handle touch gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientY
    const diff = touchStartRef.current - touchEnd

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentReelIndex < reels.length - 1) {
        // Swipe up - next reel
        markReelAsWatched(currentReel.id)
        containerRef.current?.scrollTo({
          top: (currentReelIndex + 1) * window.innerHeight,
          behavior: 'smooth'
        })
      } else if (diff < 0 && currentReelIndex > 0) {
        // Swipe down - previous reel
        containerRef.current?.scrollTo({
          top: (currentReelIndex - 1) * window.innerHeight,
          behavior: 'smooth'
        })
      }
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && currentReelIndex > 0) {
        containerRef.current?.scrollTo({
          top: (currentReelIndex - 1) * window.innerHeight,
          behavior: 'smooth'
        })
      }
      if (e.key === "ArrowDown" && currentReelIndex < reels.length - 1) {
        markReelAsWatched(currentReel.id)
        containerRef.current?.scrollTo({
          top: (currentReelIndex + 1) * window.innerHeight,
          behavior: 'smooth'
        })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentReelIndex, reels.length])

  // Sync mute state with settings
  useEffect(() => {
    setIsMuted(!settings.soundEnabled)
  }, [settings.soundEnabled])

  // Animate progress bar
  useEffect(() => {
    setReelProgress(0)
    const interval = setInterval(() => {
      setReelProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + (100 / (currentReel.duration * 10))
      })
    }, 100)
    
    return () => clearInterval(interval)
  }, [currentReelIndex, currentReel?.duration])

  const completionRate = reels.length > 0 ? (watchedReels.length / reels.length) * 100 : 0

  if (!currentReel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-violet-500/5 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">
            {getText("Aucun reel disponible", "لا يوجد ريلز متاح", "No reels available")}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-violet-500/5">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Film className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  {getText("Cours Reels", "دروس ريلز", "Course Reels")}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {getText("Micro-apprentissage 30-60s", "التعلم المصغر 30-60 ثانية", "Micro-learning 30-60s")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-violet-500/10 text-violet-600 border-violet-500/20">
                <Trophy className="w-3 h-3 mr-1" />
                {progress.reelsPoints} XP
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        {/* Sidebar - Learning Path */}
        <div className="hidden lg:flex flex-col w-80 bg-card/30 backdrop-blur-sm border-r border-border p-6 overflow-y-auto max-h-[calc(100vh-73px)] sticky top-[73px]">
          <div className="mb-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-violet-600 flex-shrink-0" />
              <h3 className="text-lg font-bold truncate">
                {getText("Parcours d'apprentissage", "مسار التعلم", "Learning Path")}
              </h3>
            </div>

            {/* Completion Stats */}
            <div className="bg-secondary/20 rounded-xl p-4 mb-4 w-full overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground truncate">
                  {getText("Progression", "التقدم", "Progress")}
                </span>
                <span className="text-lg font-bold text-violet-600">
                  {Math.round(completionRate)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-secondary/50 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full transition-all duration-700 ease-in-out"
                  style={{ width: `${completionRate}%` }}
                />
              </div>

              {/* Completed reels */}
              <p className="text-xs text-muted-foreground mt-2 truncate">
                {watchedReels.length} / {reels.length} {getText("complétés", "مكتمل", "completed")}
              </p>
            </div>
          </div>

          {/* Reels List */}
          <div className="space-y-2">
            {reels.map((reel, index) => {
              const isWatched = watchedReels.includes(reel.id)
              const isCurrent = index === currentReelIndex
              
              return (
                <button
                  key={reel.id}
                  onClick={() => {
                    if (currentReelIndex !== index) {
                      markReelAsWatched(currentReel.id)
                      containerRef.current?.scrollTo({
                        top: index * (containerRef.current?.clientHeight || 0),
                        behavior: 'smooth'
                      })
                    }
                  }}
                  disabled={isPending}
                  className={`w-full p-3 rounded-xl transition-all text-left relative overflow-hidden ${
                    isCurrent
                      ? "bg-gradient-to-r from-violet-500/20 to-purple-500/20 border-2 border-violet-500"
                      : "bg-card/50 hover:bg-secondary/20 border-2 border-transparent"
                  } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`text-2xl flex-shrink-0 ${isCurrent ? 'animate-pulse' : ''}`}>
                      {reel.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{getReelTitle(reel)}</p>
                      <p className="text-xs text-muted-foreground truncate">{getReelTopic(reel)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-violet-600 font-medium">+{reel.points} XP</span>
                        <span className="text-xs text-muted-foreground">• {reel.duration}s</span>
                      </div>
                    </div>
                    {isWatched && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Scrollable Reels Container */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8">
          <div
            ref={containerRef}
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="w-full max-w-lg h-[calc(100vh-120px)] lg:h-[calc(100vh-120px)] overflow-y-scroll snap-y snap-mandatory scroll-smooth rounded-3xl"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reels.map((reel, index) => {
              const isWatched = watchedReels.includes(reel.id)
              const isCurrent = index === currentReelIndex
              const reelTitle = getReelTitle(reel)
              const reelDescription = getReelDescription(reel)
              const reelTopic = getReelTopic(reel)

              return (
                <div
                  key={reel.id}
                  className="h-full w-full snap-start snap-always relative flex items-center justify-center"
                >
                  {/* Reel Content */}
                  <div
                    className={`w-full h-full bg-gradient-to-br ${reel.videoColor} rounded-3xl flex flex-col items-center justify-center relative overflow-hidden shadow-2xl`}
                  >
                {/* Progress Bar */}
                {isCurrent && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-20 rounded-t-3xl overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-100"
                      style={{ width: `${reelProgress}%` }}
                    />
                  </div>
                )}

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{ 
                    backgroundImage: 'radial-gradient(circle at 20px 20px, white 2px, transparent 0)',
                    backgroundSize: '40px 40px'
                  }} />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-6 max-w-2xl">
                  <div className="text-7xl mb-6 animate-bounce-slow">{reel.icon}</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {reelTitle}
                  </h2>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed">
                    {reelDescription}
                  </p>
                </div>

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge className="bg-black/50 text-white backdrop-blur-sm border-white/20">
                    {reelTopic}
                  </Badge>
                  {reel.educational && (
                    <Badge className="bg-yellow-500/80 text-white backdrop-blur-sm border-yellow-400/50">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {getText("Éducatif", "تعليمي", "Educational")}
                    </Badge>
                  )}
                </div>

                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                  {reel.duration}s
                </div>

                {/* Watched Indicator */}
                {isWatched && (
                  <div className="absolute top-20 left-4 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <CheckCircle2 className="w-4 h-4" />
                    {getText("Regardé", "مشاهدة", "Watched")}
                  </div>
                )}

                {/* Bottom Controls */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-4 left-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all backdrop-blur-sm"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>

                <div className="absolute bottom-4 right-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  +{reel.points} XP
                </div>

                {/* Progress Indicator */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
                  {index + 1} / {reels.length}
                </div>

                {/* XP Notification */}
                {isCurrent && xpNotification.show && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-2xl animate-bounce shadow-2xl flex items-center gap-3">
                      <Sparkles className="w-6 h-6" />
                      +{xpNotification.points} XP!
                      <Sparkles className="w-6 h-6" />
                    </div>
                  </div>
                )}

                {/* Loading Overlay */}
                {isPending && isCurrent && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm z-20 rounded-3xl">
                    <div className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                      {getText("Enregistrement...", "جاري الحفظ...", "Saving...")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile Progress - Below the reels container */}
      <div className="lg:hidden w-full max-w-lg mx-auto px-4 pb-4">
        <div className="p-4 bg-secondary/10 rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium truncate">
              {getText("Progression", "التقدم", "Progress")}
            </span>
            <span className="text-sm font-bold text-violet-600 truncate">
              {watchedReels.length} / {reels.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-secondary/30 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full transition-all duration-700 ease-in-out"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}