// /app/
"use client"

import { useState, useEffect } from "react"
import { Heart, Share2, MessageCircle, Volume2, VolumeX, ChevronUp, ChevronDown, Sparkles, Award, TrendingUp, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
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
  const [isNavOpen, setIsNavOpen] = useState(true)
  const [xpNotification, setXpNotification] = useState<{ points: number; show: boolean }>({ 
    points: 0, 
    show: false 
  })

  const currentReel = reels[currentReelIndex]

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

  // Load watched reels from localStorage on mount
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

  // Save watched reels to localStorage
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

      // Update local state
      const newWatchedReels = [...watchedReels, reelId]
      setWatchedReels(newWatchedReels)
      saveWatchedReels(newWatchedReels)

      // Add points via context (includes badge checking and activity logging)
      await addReels(reel.points, getReelTitle(reel))

      // Show XP notification
      setXpNotification({ points: reel.points, show: true })
      setTimeout(() => setXpNotification({ points: 0, show: false }), 2000)
    }
  }

  const handleNextReel = () => {
    if (currentReelIndex < reels.length - 1) {
      markReelAsWatched(currentReel.id)
      setCurrentReelIndex(currentReelIndex + 1)
    }
  }

  const handlePreviousReel = () => {
    if (currentReelIndex > 0) {
      setCurrentReelIndex(currentReelIndex - 1)
    }
  }

  const handleLike = () => {
    const updatedReels = [...reels]
    updatedReels[currentReelIndex].liked = !updatedReels[currentReelIndex].liked
    updatedReels[currentReelIndex].likes += updatedReels[currentReelIndex].liked ? 1 : -1
    setReels(updatedReels)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp") handlePreviousReel()
    if (e.key === "ArrowDown") handleNextReel()
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentReelIndex])

  // Sync mute state with settings
  useEffect(() => {
    setIsMuted(!settings.soundEnabled)
  }, [settings.soundEnabled])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'hard': return 'bg-red-500/20 text-red-300 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  if (!currentReel) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-background via-background to-violet-500/5 transition-all duration-300 flex items-center justify-center ${
        isNavOpen ? 'md:ml-64' : 'md:ml-20'
      }`}>
        <div className="text-center">
          <p className="text-muted-foreground">
            {getText("Aucun reel disponible", "لا يوجد ريلز متاح", "No reels available")}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-background via-background to-violet-500/5 transition-all duration-300 ${
      isNavOpen ? 'md:ml-64' : 'md:ml-20'
    }`}>
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
                  {getText("Reels Éducatifs", "ريلز تعليمية", "Educational Reels")}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {getText("Apprenez en regardant", "تعلم بالمشاهدة", "Learn by watching")}
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Badge className="bg-violet-500/10 text-violet-600 border-violet-500/20">
                <Film className="w-3 h-3 mr-1" />
                {progress.reelsWatched} {getText("regardés", "مشاهدة", "watched")}
              </Badge>
              <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">
                <Award className="w-3 h-3 mr-1" />
                {progress.reelsPoints} XP
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar - Reel List (Desktop) */}
        <div className="hidden lg:flex flex-col w-80 bg-card/50 backdrop-blur-sm border-r border-border p-6 overflow-y-auto max-h-[calc(100vh-73px)] sticky top-[73px]">
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-1">
              {getText("Tous les Reels", "جميع الريلز", "All Reels")}
            </h3>
            <p className="text-xs text-muted-foreground">
              {watchedReels.length} / {reels.length} {getText("regardés", "مشاهدة", "watched")}
            </p>
            <div className="mt-2 w-full bg-secondary/30 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${(watchedReels.length / reels.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="space-y-2">
            {reels.map((reel, index) => (
              <button
                key={reel.id}
                onClick={() => {
                  if (currentReelIndex !== index) {
                    markReelAsWatched(currentReel.id)
                    setCurrentReelIndex(index)
                  }
                }}
                disabled={isPending}
                className={`w-full p-3 rounded-xl transition-all text-left relative overflow-hidden group ${
                  index === currentReelIndex
                    ? "bg-gradient-to-r from-violet-500/20 to-purple-500/20 border-2 border-violet-500"
                    : "bg-card hover:bg-secondary/20 border-2 border-transparent"
                } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`text-2xl flex-shrink-0 ${index === currentReelIndex ? 'animate-pulse' : ''}`}>
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
                  {watchedReels.includes(reel.id) && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Reel Display */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-lg flex flex-col">
            {/* Video Container */}
            <div className="relative">
              <div
                className={`w-full aspect-[9/16] rounded-3xl bg-gradient-to-br ${currentReel.videoColor} shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{ 
                    backgroundImage: 'radial-gradient(circle at 20px 20px, white 2px, transparent 0)',
                    backgroundSize: '40px 40px'
                  }} />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-6">
                  <div className="text-7xl mb-6 animate-bounce-slow">{currentReel.icon}</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {getReelTitle(currentReel)}
                  </h2>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed">
                    {getReelDescription(currentReel)}
                  </p>
                </div>

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge className="bg-black/50 text-white backdrop-blur-sm border-white/20">
                    {getReelTopic(currentReel)}
                  </Badge>
                  {currentReel.educational && (
                    <Badge className="bg-yellow-500/80 text-white backdrop-blur-sm border-yellow-400/50">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {getText("Éducatif", "تعليمي", "Educational")}
                    </Badge>
                  )}
                </div>

                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                  {currentReel.duration}s
                </div>

                {/* Watched Indicator */}
                {watchedReels.includes(currentReel.id) && (
                  <div className="absolute top-16 left-4 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <span>✓</span>
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
                  +{currentReel.points} XP
                </div>

                {/* XP Notification */}
                {xpNotification.show && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-2xl animate-bounce shadow-2xl flex items-center gap-3">
                      <Sparkles className="w-6 h-6" />
                      +{xpNotification.points} XP!
                      <Sparkles className="w-6 h-6" />
                    </div>
                  </div>
                )}

                {/* Loading Overlay */}
                {isPending && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                      {getText("Enregistrement...", "جاري الحفظ...", "Saving...")}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <Button
                  onClick={handlePreviousReel}
                  disabled={currentReelIndex === 0}
                  size="lg"
                  className="rounded-full bg-card hover:bg-secondary border-2 border-border"
                >
                  <ChevronUp size={24} className="text-foreground" />
                </Button>
                
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm font-medium text-foreground">
                    {currentReelIndex + 1} / {reels.length}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {watchedReels.length} {getText("regardés", "مشاهدة", "watched")}
                  </span>
                </div>

                <Button
                  onClick={handleNextReel}
                  disabled={currentReelIndex === reels.length - 1}
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
                >
                  <ChevronDown size={24} />
                </Button>
              </div>
            </div>

            {/* Reel Info Card */}
            <div className="mt-6 p-4 bg-card rounded-xl border border-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">{getReelTitle(currentReel)}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleLike}
                    className={`transition-all ${
                      currentReel.liked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                    }`}
                  >
                    <Heart size={20} className={currentReel.liked ? "fill-current" : ""} />
                  </button>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <MessageCircle size={20} />
                  </button>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {currentReel.views.toLocaleString()} {getText("vues", "مشاهدات", "views")}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {currentReel.likes.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Mobile Progress */}
            <div className="lg:hidden mt-4 p-4 bg-secondary/10 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {getText("Progression", "التقدم", "Progress")}
                </span>
                <span className="text-sm font-bold text-violet-600">
                  {watchedReels.length} / {reels.length}
                </span>
              </div>
              <div className="w-full bg-secondary/30 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${(watchedReels.length / reels.length) * 100}%` }}
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
      `}</style>
    </div>
  )
}