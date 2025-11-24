"use client"

import { useState, useRef, useEffect } from "react"
import { X, MessageCircle, Send, Minimize2, Maximize2, FileText } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"

const QuoteModal = dynamic(() => import("./quote-modal"), { ssr: false })

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  quickReplies?: Array<{ label: string; value: string }>
}

const KNOWLEDGE_BASE = {
  services: {
    keywords: ["service", "offre", "propose", "faire", "capabilities", "quoi", "que proposez", "devis"],
    response: `Nos services incluent :\n\n🎨 Design Web & Branding\n📱 Développement Mobile\n🔍 SEO & Optimisation\n📊 Marketing Digital\n🎬 Production Vidéo\n💼 Stratégie Digitale\n⚡ Optimisation Performance`,
    quickReplies: [
      { label: "Design Web", value: "J'ai besoin de design web" },
      { label: "SEO", value: "Parlez-moi du SEO" },
      { label: "Mobile", value: "Développement mobile ?" },
      { label: "Devis", value: "Je veux un devis" },
    ],
  },
  portfolio: {
    keywords: ["portfolio", "projet", "réalisation", "cas", "exemple", "travail", "clients", "montrer", "voir"],
    response: `Notre portfolio présente 150+ projets réussis !\n\n💼 Clients : Startups à grandes entreprises\n🏆 Secteurs : Tech, Finance, E-commerce, Santé\n📈 Résultats : +250% trafic en moyenne\n🌟 Note : 4.9/5 étoiles`,
    quickReplies: [
      { label: "Tech", value: "Montrez projets tech" },
      { label: "E-commerce", value: "Cas e-commerce ?" },
      { label: "Services", value: "Quels services ?" },
      { label: "Devis", value: "Je veux un devis" },
    ],
  },
  process: {
    keywords: ["processus", "comment", "étape", "fonctionnement", "méthode", "workflow", "travaillez", "approche"],
    response: `Notre processus en 5 étapes :\n\n1️⃣ Découverte & Audit\n2️⃣ Conception & Design\n3️⃣ Développement\n4️⃣ Optimisation SEO\n5️⃣ Support & Évolution\n\nDurée : 6-12 semaines généralement`,
    quickReplies: [
      { label: "Timing ?", value: "Combien de temps ?" },
      { label: "Équipe", value: "Qui travaillera ?" },
      { label: "Support", value: "Après le projet ?" },
      { label: "Devis", value: "Je veux un devis" },
    ],
  },
  team: {
    keywords: ["équipe", "expert", "qui", "responsable", "personne", "consultant", "staff", "développeur", "designer"],
    response: `Notre équipe d'experts :\n\n👨‍💼 Directeur Créatif - 15+ ans\n🎨 Designers UI/UX primés\n💻 Développeurs Full-Stack certifiés\n📊 Stratèges SEO & Marketing\n🚀 Chefs de projet agiles\n\nChaque projet a une équipe dédiée.`,
    quickReplies: [
      { label: "Certifications", value: "Vos certifications ?" },
      { label: "Experience", value: "Depuis quand ?" },
      { label: "Services", value: "Vos services" },
      { label: "Devis", value: "Je veux un devis" },
    ],
  },
  contact: {
    keywords: ["contact", "joindre", "appeler", "email", "téléphone", "adresse", "comment vous joindre"],
    response: `Vous pouvez nous joindre :\n\n📱 Téléphone : +212 652 768 993\n📧 Email : contact@prestigia-agency.com\n📍 Adresse : Casablanca, Ain Chock\nBld Qods The Gold Center, Étage 1, Bureau 2\n💬 Chat : Disponible 24/7`,
    quickReplies: [
      { label: "Appeler", value: "Je vais vous appeler" },
      { label: "WhatsApp", value: "WhatsApp ?" },
      { label: "Services", value: "Vos services" },
      { label: "Devis", value: "Je veux un devis" },
    ],
  },
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage("Bonjour 👋 Je suis l'assistant Prestigia Agency. Comment puis-je vous aider ?", [
          { label: "🎨 Services", value: "Vos services ?" },
          { label: "📂 Portfolio", value: "Vos projets" },
          { label: "👥 Équipe", value: "Qui êtes-vous ?" },
          { label: "📞 Contact", value: "Comment vous joindre ?" },
        ])
      }, 500)
    }
  }, [isOpen])

  const addBotMessage = (text: string, quickReplies?: Array<{ label: string; value: string }>) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "bot",
      timestamp: new Date(),
      quickReplies,
    }
    setMessages((prev) => [...prev, newMessage])
    setIsTyping(false)
  }

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const findBestMatch = (
    userInput: string,
  ): { response: string; quickReplies?: Array<{ label: string; value: string }> } => {
    const input = userInput.toLowerCase().trim()

    // Check for devis request
    if (input.includes("devis") || input.includes("prix") || input.includes("tarif")) {
      setShowQuoteModal(true)
      return {
        response:
          "Parfait ! Je vous ouvre le formulaire de devis. Remplissez vos informations et nous vous contacterons rapidement.",
        quickReplies: [
          { label: "📝 Devis", value: "Formulaire devis" },
          { label: "☎️ Appeler", value: "+212 652 768 993" },
          { label: "🔙 Retour", value: "Services" },
        ],
      }
    }

    // Check for contact request
    if (
      input.includes("contact") ||
      input.includes("joindre") ||
      input.includes("téléphone") ||
      input.includes("email")
    ) {
      return {
        response: KNOWLEDGE_BASE.contact.response,
        quickReplies: KNOWLEDGE_BASE.contact.quickReplies,
      }
    }

    // Check for keyword matches
    for (const [key, data] of Object.entries(KNOWLEDGE_BASE)) {
      if (key === "contact") continue // Skip contact since already handled
      for (const keyword of data.keywords) {
        if (input.includes(keyword)) {
          return {
            response: data.response,
            quickReplies: data.quickReplies,
          }
        }
      }
    }

    // Single word handling - be more flexible
    if (input.split(/\s+/).length <= 2) {
      const words = input.split(/\s+/)
      for (const word of words) {
        if (word.length > 2) {
          for (const [key, data] of Object.entries(KNOWLEDGE_BASE)) {
            if (key === "contact") continue
            for (const keyword of data.keywords) {
              if (keyword.includes(word.substring(0, 3)) || word.includes(keyword.substring(0, 3))) {
                return {
                  response: data.response,
                  quickReplies: data.quickReplies,
                }
              }
            }
          }
        }
      }
    }

    // Fallback with suggestions
    return {
      response: `Je n'ai pas bien compris. Essayez-moi :\n\n🎨 Services\n📂 Portfolio\n👥 Équipe\n📞 Contact\n💼 Processus\n\nOu posez simplement votre question !`,
      quickReplies: [
        { label: "🎨 Services", value: "Services" },
        { label: "📂 Portfolio", value: "Portfolio" },
        { label: "👥 Équipe", value: "Équipe" },
        { label: "📞 Contact", value: "Contact" },
      ],
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    addUserMessage(inputValue)
    setInputValue("")
    setIsTyping(true)

    setTimeout(
      () => {
        const { response, quickReplies } = findBestMatch(inputValue)
        addBotMessage(response, quickReplies)
      },
      1000 + Math.random() * 600,
    )
  }

  return (
    <>
      <QuoteModal isOpen={showQuoteModal} onClose={() => setShowQuoteModal(false)} />

      {/* Chat Bubble Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent/80 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center border-2 border-accent/50 hover:border-accent group"
          >
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-lg group-hover:blur-xl transition-all duration-300"></div>
            <MessageCircle className="w-6 h-6 text-background relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-40 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[80vh] rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-card/95 backdrop-blur-xl border border-border/50"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
              <div className="bg-gradient-to-r from-accent/20 to-accent/10 border-b border-border/50 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <div>
                    <h3 className="font-semibold text-foreground">Prestigia Assistant</h3>
                    <p className="text-xs text-muted-foreground">En ligne & Prêt à aider</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowQuoteModal(true)}
                    className="p-1.5 hover:bg-accent/20 rounded-lg transition-colors text-accent hover:text-accent/80 group"
                    title="Demander un devis"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1.5 hover:bg-accent/20 rounded-lg transition-colors"
                  >
                    {isMinimized ? (
                      <Maximize2 className="w-4 h-4 text-foreground" />
                    ) : (
                      <Minimize2 className="w-4 h-4 text-foreground" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-accent/20 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-foreground" />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-2"
                      >
                        <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-xs px-4 py-3 rounded-2xl whitespace-pre-wrap break-words text-sm ${
                              message.sender === "user"
                                ? "bg-accent text-background rounded-br-none"
                                : "bg-muted text-foreground rounded-bl-none"
                            }`}
                          >
                            {message.text}
                          </div>
                        </div>

                        {message.sender === "bot" && message.quickReplies && (
                          <div className="flex flex-wrap gap-2 justify-start mt-1">
                            {message.quickReplies.map((reply) => (
                              <button
                                key={reply.value}
                                onClick={() => {
                                  addUserMessage(reply.value)
                                  setIsTyping(true)
                                  setTimeout(
                                    () => {
                                      const { response, quickReplies } = findBestMatch(reply.value)
                                      addBotMessage(response, quickReplies)
                                    },
                                    1000 + Math.random() * 600,
                                  )
                                }}
                                className="px-3 py-1.5 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-full text-xs font-medium text-foreground transition-all duration-200 hover:scale-105 whitespace-nowrap"
                              >
                                {reply.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-1 items-center"
                      >
                        <div className="flex gap-1 px-4 py-3 bg-muted rounded-2xl rounded-bl-none">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
                            className="w-2 h-2 bg-foreground/60 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.1 }}
                            className="w-2 h-2 bg-foreground/60 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                            className="w-2 h-2 bg-foreground/60 rounded-full"
                          />
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="border-t border-border/50 px-4 py-3 bg-card/50">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Votre question..."
                        className="flex-1 bg-muted/30 border border-border/50 rounded-full px-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent/50 transition-colors"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        className="p-2 bg-accent hover:bg-accent/90 disabled:bg-muted rounded-full transition-colors text-background"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
