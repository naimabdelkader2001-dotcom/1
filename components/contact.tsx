"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name")
    const email = formData.get("email")
    const phone = formData.get("phone")
    const subject = formData.get("subject")
    const messageText = formData.get("message")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message: messageText,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("✓ Message reçu ! Nous vous répondrons bientôt.")
        if (formRef.current) {
          formRef.current.reset()
        }
        setTimeout(() => setMessage(""), 3000)
      } else {
        setMessage(`✗ Erreur: ${data.error}`)
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error)
      setMessage("✗ Erreur serveur. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  const handleEmailClick = () => {
    window.open("https://mail.google.com/mail/?view=cm&fs=1&to=contact@prestigia-agency.com", "_blank")
  }

  const handlePhoneClick = () => {
    window.open("https://wa.me/212652768993", "_blank")
  }

  const handleLocationClick = () => {
    window.open("https://maps.google.com/?q=Casablanca+Ain+Chock+Bld+Qods+The+Gold+Center", "_blank")
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Parlons de Votre <span className="text-accent">Projet</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Contactez-nous pour une consultation gratuite et découvrez comment nous pouvons transformer votre vision.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div
            onClick={handleEmailClick}
            className="bg-background border border-accent/10 rounded-xl p-6 text-center hover:border-accent/50 transition-all duration-300 hover:bg-background/80 cursor-pointer"
          >
            <Mail className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="text-foreground font-bold mb-2">Email</h3>
            <p className="text-muted-foreground hover:text-accent transition-colors">contact@prestigia-agency.com</p>
            <p className="text-xs text-accent/60 mt-2">Ouvre Gmail</p>
          </div>

          <div
            onClick={handlePhoneClick}
            className="bg-background border border-accent/10 rounded-xl p-6 text-center hover:border-accent/50 transition-all duration-300 hover:bg-background/80 cursor-pointer"
          >
            <Phone className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="text-foreground font-bold mb-2">Téléphone</h3>
            <p className="text-muted-foreground hover:text-accent transition-colors">+212 652 768 993</p>
            <p className="text-xs text-accent/60 mt-2">Ouvre WhatsApp</p>
          </div>

          <div
            onClick={handleLocationClick}
            className="bg-background border border-accent/10 rounded-xl p-6 text-center hover:border-accent/50 transition-all duration-300 hover:bg-background/80 cursor-pointer"
          >
            <MapPin className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="text-foreground font-bold mb-2">Localisation</h3>
            <p className="text-muted-foreground hover:text-accent transition-colors">Voir la carte</p>
            <p className="text-xs text-accent/60 mt-2">Google Maps</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20 rounded-2xl p-8">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                required
                className="bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                required
                className="bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="tel"
                name="phone"
                placeholder="Votre téléphone"
                className="bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
              />
              <input
                type="text"
                name="subject"
                placeholder="Sujet"
                required
                className="bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <textarea
              name="message"
              placeholder="Votre message"
              rows={5}
              required
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
            ></textarea>

            {message && (
              <div
                className={`p-3 rounded-lg text-center font-semibold ${message.includes("✓") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-background py-3 rounded-lg hover:bg-accent/90 transition-all duration-300 font-semibold text-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Envoi..." : "Envoyer le Message"}
            </button>
          </form>
        </div>

        <div className="mt-12 text-center border-t border-border pt-8">
          <p className="text-muted-foreground">© 2025 Prestigia Agency. Tous droits réservés.</p>
        </div>
      </div>
    </section>
  )
}
