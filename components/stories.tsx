"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Heart, ChevronLeft, ChevronRight, Share2 } from "lucide-react"

interface Story {
  id: number
  title: string
  category: string
  content: string
  image: string
  likes: number
  liked: boolean
}

const STORIES: Story[] = [
  {
    id: 1,
    title: "Comprendre la Puberté",
    category: "Développement",
    content:
      "La puberté est une période de changements physiques et émotionnels. C'est normal d'avoir des questions! Voici ce que vous devez savoir sur les changements corporels, les hormones, et comment prendre soin de votre santé pendant cette période importante.",
    image: "/adolescent-health-education.jpg",
    likes: 234,
    liked: false,
  },
  {
    id: 2,
    title: "Consentement et Respect",
    category: "Relations",
    content:
      "Le consentement est fondamental dans toute relation. Cela signifie que chaque personne accepte librement et consciemment. Apprenez comment communiquer vos limites, respecter celles des autres, et construire des relations saines basées sur le respect mutuel.",
    image: "/consent-communication-respect.jpg",
    likes: 456,
    liked: false,
  },
  {
    id: 3,
    title: "Prévention des IST",
    category: "Santé",
    content:
      "Les infections sexuellement transmissibles (IST) sont courantes mais prévenues. Utilisez des préservatifs, faites-vous dépister régulièrement, et parlez ouvertement avec vos partenaires. La prévention est la meilleure protection pour votre santé.",
    image: "/sexual-health-prevention.jpg",
    likes: 189,
    liked: false,
  },
  {
    id: 4,
    title: "Santé Menstruelle",
    category: "Cycle",
    content:
      "Votre cycle menstruel est unique. Comprendre votre corps vous aide à gérer votre santé. Découvrez les phases du cycle, comment gérer les symptômes, et quand consulter un professionnel de santé.",
    image: "/menstrual-health-cycle.jpg",
    likes: 312,
    liked: false,
  },
  {
    id: 5,
    title: "Santé Mentale et Sexualité",
    category: "Bien-être",
    content:
      "Votre bien-être mental est aussi important que votre santé physique. La sexualité est liée à vos émotions, votre confiance en vous, et vos relations. Prenez soin de votre santé mentale et n'hésitez pas à chercher de l'aide.",
    image: "/mental-health-wellbeing.jpg",
    likes: 278,
    liked: false,
  },
  {
    id: 6,
    title: "Diversité et Inclusion",
    category: "Identité",
    content:
      "Chacun est unique et valide. Qu'importe votre orientation sexuelle ou identité de genre, vous méritez du respect et de l'acceptation. Explorez votre identité à votre rythme et trouvez une communauté qui vous soutient.",
    image: "/diversity-inclusion-identity.jpg",
    likes: 401,
    liked: false,
  },
]

export default function Stories() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [stories, setStories] = useState(STORIES)

  const currentStory = stories[currentIndex]

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length)
  }

  const handleLike = () => {
    setStories((prev) =>
      prev.map((story, idx) =>
        idx === currentIndex
          ? {
              ...story,
              liked: !story.liked,
              likes: story.liked ? story.likes - 1 : story.likes + 1,
            }
          : story,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 md:ml-64">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-accent" />
            </div>
            Histoires Interactives
          </h1>
          <p className="text-muted-foreground mt-2">Apprenez à travers des récits engageants</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-border/50 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-secondary/20 to-accent/20 aspect-video flex items-center justify-center overflow-hidden">
                  <img
                    src={currentStory.image || "/placeholder.svg"}
                    alt={currentStory.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <span className="inline-block w-fit px-3 py-1 bg-secondary/80 text-secondary-foreground text-xs font-semibold rounded-full mb-3">
                      {currentStory.category}
                    </span>
                    <h2 className="text-2xl font-bold text-white mb-2">{currentStory.title}</h2>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-foreground leading-relaxed mb-6">{currentStory.content}</p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Heart
                        className={`w-5 h-5 cursor-pointer transition-all ${
                          currentStory.liked ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-500"
                        }`}
                        onClick={handleLike}
                      />
                      <span className="text-sm text-muted-foreground">{currentStory.likes} likes</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Share2 className="w-4 h-4 mr-2" />
                      Partager
                    </Button>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handlePrev}
                      variant="outline"
                      className="flex-1 border-border hover:bg-secondary/10 bg-transparent"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Précédent
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Suivant
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Autres Histoires</h3>
              <div className="space-y-3">
                {stories.map((story, idx) => (
                  <button
                    key={story.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      idx === currentIndex
                        ? "bg-primary/20 border-2 border-primary"
                        : "bg-secondary/10 border-2 border-transparent hover:bg-secondary/20"
                    }`}
                  >
                    <p className="font-medium text-sm text-foreground">{story.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{story.category}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-secondary/10 rounded-lg border border-border/50">
          <h3 className="font-semibold text-foreground mb-2">Vous avez une histoire à partager?</h3>
          <p className="text-sm text-muted-foreground">
            Vos expériences et perspectives aident les autres. Contactez-nous pour contribuer à notre plateforme.
          </p>
        </div>
      </div>
    </div>
  )
}
