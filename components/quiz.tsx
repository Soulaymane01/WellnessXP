"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, CheckCircle, XCircle, RotateCcw } from "lucide-react"

interface QuizQuestion {
  id: number
  question: string
  category: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Quel est le cycle menstruel moyen?",
    category: "Cycle Menstruel",
    options: ["21 jours", "28 jours", "35 jours", "45 jours"],
    correctAnswer: 1,
    explanation:
      "Le cycle menstruel moyen dure environ 28 jours, mais peut varier de 21 à 35 jours selon les individus. C'est tout à fait normal.",
  },
  {
    id: 2,
    question: "Quelle est la méthode de contraception la plus efficace?",
    category: "Contraception",
    options: ["Préservatif", "Pilule", "DIU", "Retrait"],
    correctAnswer: 2,
    explanation:
      "Le DIU (Dispositif Intra-Utérin) est l'une des méthodes les plus efficaces avec un taux de réussite supérieur à 99%. Cependant, le choix dépend de vos besoins personnels.",
  },
  {
    id: 3,
    question: "Le consentement peut-il être retiré à tout moment?",
    category: "Consentement",
    options: ["Non, jamais", "Oui, toujours", "Seulement au début", "Seulement à la fin"],
    correctAnswer: 1,
    explanation:
      "Oui, le consentement peut être retiré à tout moment. C'est un droit fondamental. Si quelqu'un change d'avis, il faut respecter sa décision immédiatement.",
  },
  {
    id: 4,
    question: "Comment se transmettent les IST?",
    category: "IST",
    options: [
      "Par contact physique uniquement",
      "Par contact sexuel, sanguin, ou de mère à enfant",
      "Par la salive uniquement",
      "Par l'air",
    ],
    correctAnswer: 1,
    explanation:
      "Les IST se transmettent principalement par contact sexuel, mais aussi par contact sanguin (partage d'aiguilles) ou de mère à enfant. L'utilisation de préservatifs réduit le risque.",
  },
  {
    id: 5,
    question: "À quel âge commence généralement la puberté?",
    category: "Développement",
    options: ["8-10 ans", "10-14 ans", "14-18 ans", "18-22 ans"],
    correctAnswer: 1,
    explanation:
      "La puberté commence généralement entre 10 et 14 ans, mais peut varier considérablement. Chaque personne se développe à son propre rythme.",
  },
  {
    id: 6,
    question: "Quel est le meilleur moment pour se faire dépister pour les IST?",
    category: "Santé",
    options: [
      "Seulement si vous avez des symptômes",
      "Régulièrement si vous êtes sexuellement actif",
      "Une fois dans la vie",
      "Jamais si vous utilisez un préservatif",
    ],
    correctAnswer: 1,
    explanation:
      "Il est recommandé de se faire dépister régulièrement si vous êtes sexuellement actif, car certaines IST n'ont pas de symptômes visibles. Le dépistage régulier est une partie importante de la santé sexuelle.",
  },
  {
    id: 7,
    question: "Qu'est-ce que la dysménorrhée?",
    category: "Cycle Menstruel",
    options: ["Une absence de règles", "Des douleurs menstruelles", "Une infection", "Un type de contraception"],
    correctAnswer: 1,
    explanation:
      "La dysménorrhée est le terme médical pour les douleurs menstruelles. C'est courant et peut être géré avec des analgésiques, du repos, ou en consultant un professionnel de santé.",
  },
  {
    id: 8,
    question: "Le préservatif protège-t-il contre la grossesse ET les IST?",
    category: "Contraception",
    options: ["Seulement contre la grossesse", "Seulement contre les IST", "Contre les deux", "Contre aucun"],
    correctAnswer: 2,
    explanation:
      "Oui, le préservatif est la seule méthode qui protège à la fois contre la grossesse et les IST. C'est pourquoi il est souvent recommandé en combinaison avec d'autres contraceptifs.",
  },
  {
    id: 9,
    question: "Qu'est-ce que l'identité de genre?",
    category: "Identité",
    options: [
      "Votre sexe biologique",
      "Votre sentiment interne d'être homme, femme, ou autre",
      "Votre orientation sexuelle",
      "Votre apparence physique",
    ],
    correctAnswer: 1,
    explanation:
      "L'identité de genre est votre sentiment interne d'être homme, femme, non-binaire, ou autre. Elle peut être différente de votre sexe assigné à la naissance.",
  },
  {
    id: 10,
    question: "Quel est le rôle de l'hygiène dans la santé sexuelle?",
    category: "Hygiène",
    options: [
      "Aucun rôle",
      "Prévenir les infections et maintenir le confort",
      "Augmenter le plaisir",
      "Prévenir la grossesse",
    ],
    correctAnswer: 1,
    explanation:
      "Une bonne hygiène est importante pour prévenir les infections et maintenir le confort. Cependant, une hygiène excessive peut perturber l'équilibre naturel du corps.",
  },
]

interface QuizState {
  currentQuestion: number
  score: number
  answered: boolean
  selectedAnswer: number | null
  showResults: boolean
}

export default function Quiz() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    answered: false,
    selectedAnswer: null,
    showResults: false,
  })

  const currentQuestion = QUIZ_QUESTIONS[quizState.currentQuestion]
  const isCorrect = quizState.selectedAnswer === currentQuestion.correctAnswer

  const handleAnswerClick = (index: number) => {
    if (!quizState.answered) {
      setQuizState((prev) => ({
        ...prev,
        selectedAnswer: index,
        answered: true,
        score: index === currentQuestion.correctAnswer ? prev.score + 1 : prev.score,
      }))
    }
  }

  const handleNextQuestion = () => {
    if (quizState.currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        answered: false,
        selectedAnswer: null,
      }))
    } else {
      setQuizState((prev) => ({
        ...prev,
        showResults: true,
      }))
    }
  }

  const handleRestart = () => {
    setQuizState({
      currentQuestion: 0,
      score: 0,
      answered: false,
      selectedAnswer: null,
      showResults: false,
    })
  }

  const progressPercentage = ((quizState.currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100

  if (quizState.showResults) {
    const percentage = (quizState.score / QUIZ_QUESTIONS.length) * 100
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-chart-4/5 md:ml-64">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 bg-chart-4/20 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-chart-4" />
              </div>
              Quiz Éducatifs
            </h1>
          </div>

          <Card className="border-border/50">
            <CardContent className="pt-8">
              <div className="text-center">
                <div className="mb-6">
                  {percentage >= 80 ? (
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  ) : (
                    <XCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Quiz Terminé!</h2>
                <p className="text-muted-foreground mb-6">Voici vos résultats:</p>

                <div className="bg-secondary/10 rounded-lg p-6 mb-6">
                  <p className="text-5xl font-bold text-primary mb-2">
                    {quizState.score}/{QUIZ_QUESTIONS.length}
                  </p>
                  <p className="text-lg text-foreground">{percentage.toFixed(0)}%</p>
                </div>

                <p className="text-foreground mb-6">
                  {percentage >= 80
                    ? "Excellent travail! Vous maîtrisez bien ces sujets."
                    : percentage >= 60
                      ? "Bon effort! Continuez à apprendre pour améliorer vos connaissances."
                      : "Continuez à explorer et à apprendre. Chaque question est une opportunité!"}
                </p>

                <Button onClick={handleRestart} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Recommencer le Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-chart-4/5 md:ml-64">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 bg-chart-4/20 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-chart-4" />
            </div>
            Quiz Éducatifs
          </h1>
          <p className="text-muted-foreground mt-2">Testez vos connaissances en santé sexuelle</p>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>
                Question {quizState.currentQuestion + 1} sur {QUIZ_QUESTIONS.length}
              </CardTitle>
              <span className="text-sm font-medium text-muted-foreground">
                Score: {quizState.score}/{QUIZ_QUESTIONS.length}
              </span>
            </div>
            <div className="w-full bg-secondary/20 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <CardDescription className="mt-4">{currentQuestion.category}</CardDescription>
          </CardHeader>

          <CardContent>
            <h2 className="text-xl font-semibold text-foreground mb-6">{currentQuestion.question}</h2>

            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => {
                const isSelected = quizState.selectedAnswer === index
                const isCorrectOption = index === currentQuestion.correctAnswer

                let buttonClass = "border-2 border-border hover:border-primary/50 bg-transparent"
                if (quizState.answered) {
                  if (isCorrectOption) {
                    buttonClass = "border-2 border-green-500 bg-green-500/10"
                  } else if (isSelected && !isCorrect) {
                    buttonClass = "border-2 border-red-500 bg-red-500/10"
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={quizState.answered}
                    className={`w-full p-4 rounded-lg text-left font-medium transition-all ${buttonClass} ${
                      quizState.answered ? "cursor-default" : "cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">{option}</span>
                      {quizState.answered && isCorrectOption && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {quizState.answered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                    </div>
                  </button>
                )
              })}
            </div>

            {quizState.answered && (
              <div
                className={`p-4 rounded-lg mb-6 ${isCorrect ? "bg-green-500/10 border border-green-500/30" : "bg-orange-500/10 border border-orange-500/30"}`}
              >
                <p
                  className={`font-semibold mb-2 ${isCorrect ? "text-green-700 dark:text-green-400" : "text-orange-700 dark:text-orange-400"}`}
                >
                  {isCorrect ? "Correct!" : "Incorrect"}
                </p>
                <p className="text-sm text-foreground">{currentQuestion.explanation}</p>
              </div>
            )}

            <Button
              onClick={handleNextQuestion}
              disabled={!quizState.answered}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
            >
              {quizState.currentQuestion === QUIZ_QUESTIONS.length - 1 ? "Voir les Résultats" : "Question Suivante"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
