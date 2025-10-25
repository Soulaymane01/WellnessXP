"use client"

import { useState, useEffect } from "react"
import { Heart, Share2, MessageCircle, Volume2, VolumeX, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { addReelsPoints, checkBadgeUnlock, updateUserProgress } from "@/lib/points-manager"

interface Reel {
  id: number
  title: string
  description: string
  topic: string
  duration: number
  views: number
  likes: number
  liked: boolean
  points: number
  videoColor: string
  icon: string
}

const reelsData: Reel[] = [
  {
    id: 1,
    title: "Comprendre le Cycle Menstruel",
    description: "Découvrez les 4 phases du cycle menstruel et comment elles affectent votre corps.",
    topic: "Santé Menstruelle",
    duration: 45,
    views: 2400,
    likes: 342,
    liked: false,
    points: 50,
    videoColor: "from-emerald-500 to-teal-500",
    icon: "🩸",
  },
  {
    id: 2,
    title: "Consentement: C'est Quoi?",
    description: "Le consentement est un accord clair, enthousiaste et continu entre les partenaires.",
    topic: "Consentement",
    duration: 38,
    views: 3200,
    likes: 521,
    liked: false,
    points: 50,
    videoColor: "from-indigo-500 to-blue-500",
    icon: "🤝",
  },
  {
    id: 3,
    title: "Prévention des ISTs",
    description: "Apprenez comment vous protéger contre les infections sexuellement transmissibles.",
    topic: "Prévention",
    duration: 52,
    views: 1800,
    likes: 289,
    liked: false,
    points: 75,
    videoColor: "from-violet-500 to-purple-500",
    icon: "🛡️",
  },
  {
    id: 4,
    title: "Contraception: Options Disponibles",
    description: "Explorez les différentes méthodes de contraception et trouvez celle qui vous convient.",
    topic: "Contraception",
    duration: 48,
    views: 2100,
    likes: 412,
    liked: false,
    points: 60,
    videoColor: "from-pink-500 to-rose-500",
    icon: "💊",
  },
  {
    id: 5,
    title: "Santé Mentale & Bien-être",
    description: "Votre santé mentale est aussi importante que votre santé physique.",
    topic: "Bien-être",
    duration: 41,
    views: 2800,
    likes: 456,
    liked: false,
    points: 55,
    videoColor: "from-cyan-500 to-blue-500",
    icon: "🧠",
  },
  {
    id: 6,
    title: "Diversité & Identité",
    description: "Célébrez la diversité des orientations sexuelles et identités de genre.",
    topic: "Inclusion",
    duration: 44,
    views: 3100,
    likes: 678,
    liked: false,
    points: 65,
    videoColor: "from-orange-500 to-red-500",
    icon: "🌈",
  },
]

export default function Reels() {
  const [currentReelIndex, setCurrentReelIndex] = useState(0)
  const [reels, setReels] = useState(reelsData)
  const [isMuted, setIsMuted] = useState(false)
  const [watchedReels, setWatchedReels] = useState<number[]>([])
  const [totalPointsEarned, setTotalPointsEarned] = useState(0)
  const [xpNotification, setXpNotification] = useState<{ points: number; show: boolean }>({ points: 0, show: false })

  const currentReel = reels[currentReelIndex]

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

  const markReelAsWatched = (reelId: number) => {
    if (!watchedReels.includes(reelId)) {
      const reel = reels.find((r) => r.id === reelId)
      if (!reel) return

      // Update local state
      setWatchedReels([...watchedReels, reelId])
      setTotalPointsEarned(totalPointsEarned + reel.points)

      // Update points manager
      const updatedProgress = addReelsPoints(reel.points)
      const newBadges = checkBadgeUnlock(updatedProgress)
      if (newBadges.length > updatedProgress.badges.length) {
        updateUserProgress({ badges: newBadges })
      }

      // Show XP notification
      setXpNotification({ points: reel.points, show: true })
      setTimeout(() => setXpNotification({ points: 0, show: false }), 2000)

      // Save to localStorage
      const saved = JSON.parse(localStorage.getItem("reelsProgress") || "{}")
      saved[reelId] = true
      localStorage.setItem("reelsProgress", JSON.stringify(saved))
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

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("reelsProgress") || "{}")
    const watched = Object.keys(saved).map(Number)
    setWatchedReels(watched)
    const points = watched.reduce((sum, id) => {
      const reel = reels.find((r) => r.id === id)
      return sum + (reel?.points || 0)
    }, 0)
    setTotalPointsEarned(points)
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Main Reel Display */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md aspect-video md:aspect-auto md:h-screen md:max-h-screen flex flex-col items-center justify-center relative">
          {/* Video Container */}
          <div
            className={`w-full h-full rounded-2xl md:rounded-3xl bg-gradient-to-br ${currentReel.videoColor} shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group`}
          >
            {/* Video Placeholder with Icon */}
            <div className="text-8xl mb-4">{currentReel.icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center px-4 mb-2">{currentReel.title}</h2>
            <p className="text-white/80 text-center px-4 text-sm md:text-base">{currentReel.description}</p>

            {/* Duration Badge */}
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
              {currentReel.duration}s
            </div>

            {/* Watched Indicator */}
            {watchedReels.includes(currentReel.id) && (
              <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Regardé
              </div>
            )}

            {/* Mute Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-4 left-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-smooth"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            {/* Points Badge */}
            <div className="absolute bottom-4 right-4 bg-violet-500 text-white px-4 py-2 rounded-full font-bold text-lg">
              +{currentReel.points} pts
            </div>

            {xpNotification.show && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-emerald-500 text-white px-6 py-3 rounded-full font-bold text-xl animate-bounce">
                  +{xpNotification.points} XP!
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-6 md:mt-8">
            <Button
              onClick={handlePreviousReel}
              disabled={currentReelIndex === 0}
              variant="outline"
              size="lg"
              className="rounded-full bg-transparent"
            >
              <ChevronUp size={24} />
            </Button>
            <Button
              onClick={handleNextReel}
              disabled={currentReelIndex === reels.length - 1}
              variant="outline"
              size="lg"
              className="rounded-full bg-transparent"
            >
              <ChevronDown size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Interactions */}
      <div className="w-full md:w-24 flex md:flex-col items-center justify-center gap-4 md:gap-8 p-4 md:p-8 bg-card/50 md:bg-card border-t md:border-t-0 md:border-l border-border">
        {/* Like Button */}
        <button
          onClick={handleLike}
          className={`flex flex-col items-center gap-2 transition-smooth ${
            currentReel.liked ? "text-destructive" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Heart size={28} className={currentReel.liked ? "fill-current" : ""} />
          <span className="text-xs font-medium">{currentReel.likes}</span>
        </button>

        {/* Comment Button */}
        <button className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth">
          <MessageCircle size={28} />
          <span className="text-xs font-medium">12</span>
        </button>

        {/* Share Button */}
        <button className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth">
          <Share2 size={28} />
          <span className="text-xs font-medium">8</span>
        </button>
      </div>

      {/* Left Sidebar - Reel List */}
      <div className="hidden lg:flex flex-col w-64 bg-card border-r border-border p-6 overflow-y-auto max-h-screen">
        <h3 className="text-lg font-bold mb-4">Tous les Reels</h3>
        <div className="space-y-3">
          {reels.map((reel, index) => (
            <button
              key={reel.id}
              onClick={() => {
                markReelAsWatched(currentReel.id)
                setCurrentReelIndex(index)
              }}
              className={`w-full p-3 rounded-lg transition-smooth text-left ${
                index === currentReelIndex
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{reel.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{reel.title}</p>
                  <p className="text-xs opacity-75">{reel.topic}</p>
                </div>
                {watchedReels.includes(reel.id) && <span className="text-xs font-bold">✓</span>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
