"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Send, Loader2 } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Bonjour! Je suis Dr. Amina, votre assistant IA pour la santé sexuelle et reproductive. Je suis ici pour répondre à vos questions de manière confidentielle et bienveillante. Comment puis-je vous aider aujourd'hui?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getSampleResponse = (userMessage: string): string => {
    const responses: Record<string, string> = {
      contraception:
        "Il existe plusieurs méthodes de contraception disponibles: la pilule, le préservatif, le DIU, l'implant, et bien d'autres. Chaque méthode a ses avantages et inconvénients. Je vous recommande de consulter un professionnel de santé pour choisir celle qui vous convient le mieux.",
      sti: "Les infections sexuellement transmissibles (IST) peuvent être prévenues en utilisant des préservatifs et en se faisant dépister régulièrement. Si vous pensez avoir une IST, consultez un professionnel de santé dès que possible.",
      menstruation:
        "Le cycle menstruel dure généralement 28 jours, mais peut varier de 21 à 35 jours. Les règles durent habituellement 3 à 7 jours. Si vous avez des préoccupations, parlez à un professionnel de santé.",
      default:
        "Merci pour votre question. C'est un sujet important pour votre santé. Je vous recommande de consulter un professionnel de santé pour des conseils personnalisés. Y a-t-il autre chose que je puisse vous aider?",
    }

    const lowerMessage = userMessage.toLowerCase()
    if (lowerMessage.includes("contraception") || lowerMessage.includes("pilule")) return responses.contraception
    if (lowerMessage.includes("sti") || lowerMessage.includes("infection")) return responses.sti
    if (lowerMessage.includes("menstruation") || lowerMessage.includes("règles")) return responses.menstruation
    return responses.default
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getSampleResponse(input),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 800)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 md:ml-64">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-secondary" />
            </div>
            Dr. Amina - Votre Assistant IA
          </h1>
          <p className="text-muted-foreground mt-2">Posez vos questions sur la santé sexuelle et reproductive</p>
        </div>

        <Card className="border-border/50 flex flex-col h-[600px]">
          <CardHeader>
            <CardTitle>Chat avec Dr. Amina</CardTitle>
            <CardDescription>Vos conversations sont 100% anonymes et confidentielles</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-secondary/20 text-foreground rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary/20 text-foreground px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Dr. Amina est en train de répondre...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question..."
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows={2}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <p className="text-sm text-muted-foreground mb-3">Questions fréquentes:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Comment choisir une contraception?",
              "Qu'est-ce qu'une IST?",
              "Cycle menstruel normal?",
              "Où trouver de l'aide?",
            ].map((question) => (
              <button
                key={question}
                onClick={() => {
                  setInput(question)
                }}
                className="text-left px-3 py-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-sm text-foreground transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
