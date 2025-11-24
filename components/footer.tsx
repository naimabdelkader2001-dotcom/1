"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"
import dynamic from "next/dynamic"

const QuoteModal = dynamic(() => import("./quote-modal"), { ssr: false })

export default function Footer() {
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const currentYear = new Date().getFullYear()

  const navigationLinks = [
    { label: "Accueil", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Équipe", href: "#team" },
    { label: "Contact", href: "#contact" },
  ]

  const serviceLinks = [
    { label: "SEO & SEM", href: "#services" },
    { label: "Branding", href: "#services" },
    { label: "Développement Web", href: "#services" },
    { label: "Marketing Stratégique", href: "#services" },
  ]

  const legalLinks = [
    { label: "Mentions Légales", href: "#" },
    { label: "Politique de Confidentialité", href: "#" },
    { label: "Conditions d'Utilisation", href: "#" },
  ]

  const socialLinks = [
    { label: "Facebook", href: "https://facebook.com/prestigia" },
    { label: "Instagram", href: "https://instagram.com/prestigia" },
    { label: "LinkedIn", href: "https://linkedin.com/company/prestigia" },
    { label: "Twitter", href: "https://twitter.com/prestigia" },
  ]

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handlePhoneClick = () => {
    window.open("https://wa.me/212652768993", "_blank")
  }

  const handleEmailClick = () => {
    window.open("https://mail.google.com/mail/?view=cm&fs=1&to=contact@prestigia-agency.com", "_blank")
  }

  const handleLocationClick = () => {
    window.open("https://maps.google.com/?q=Casablanca+Ain+Chock+Bld+Qods+Gold+Center", "_blank")
  }

  return (
    <>
      <QuoteModal isOpen={showQuoteModal} onClose={() => setShowQuoteModal(false)} />

      <footer className="bg-gradient-to-t from-card to-background border-t border-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            <div className="lg:col-span-1 space-y-4">
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="text-center space-y-1">
                  <div className="text-3xl font-bold bg-gradient-to-r from-accent via-accent to-purple-400 bg-clip-text text-transparent">
                    Prestigia
                  </div>
                  <div className="text-xs font-light tracking-widest text-accent/70 uppercase border-t border-accent/30 pt-2">
                    Agency
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Transformez votre présence digitale avec notre expertise en marketing stratégique et développement web.
              </p>
              <div className="flex gap-3 pt-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-accent/10 hover:bg-accent hover:text-background transition-all duration-300 flex items-center justify-center text-accent hover:text-foreground text-sm font-medium"
                    title={link.label}
                  >
                    {link.label[0]}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-foreground text-lg">Navigation</h3>
              <ul className="space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-muted-foreground hover:text-accent transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-foreground text-lg">Services</h3>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-muted-foreground hover:text-accent transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-foreground text-lg">Contact</h3>
              <div className="space-y-4">
                <button
                  onClick={handlePhoneClick}
                  className="w-full flex gap-3 items-center p-3 rounded-lg hover:bg-accent/5 transition-colors group"
                >
                  <Phone className="w-5 h-5 text-accent flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="text-left flex-grow">
                    <p className="text-muted-foreground text-xs">Téléphone</p>
                    <p className="text-foreground text-sm hover:text-accent transition-colors">+212 652 768 993</p>
                  </div>
                </button>

                <button
                  onClick={handleEmailClick}
                  className="w-full flex gap-3 items-center p-3 rounded-lg hover:bg-accent/5 transition-colors group"
                >
                  <Mail className="w-5 h-5 text-accent flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="text-left flex-grow">
                    <p className="text-muted-foreground text-xs">Email</p>
                    <p className="text-foreground text-sm hover:text-accent transition-colors break-all">
                      contact@prestigia-agency.com
                    </p>
                  </div>
                </button>

                <button
                  onClick={handleLocationClick}
                  className="w-full flex gap-3 items-start p-3 rounded-lg hover:bg-accent/5 transition-colors group"
                >
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div className="text-left flex-grow">
                    <p className="text-muted-foreground text-xs">Localisation</p>
                    <p className="text-foreground text-sm hover:text-accent transition-colors">
                      Casablanca, Ain Chock
                      <br />
                      Bld Qods The Gold Center
                      <br />
                      Étage 1, Bureau 2
                    </p>
                  </div>
                </button>
              </div>
            </div>

            <div className="space-y-4 flex flex-col">
              <h3 className="font-bold text-foreground text-lg">Commencer</h3>
              <p className="text-muted-foreground text-sm flex-grow">Prêt à transformer votre présence digitale?</p>
              <button
                onClick={() => setShowQuoteModal(true)}
                className="bg-accent text-background px-6 py-3 rounded-full hover:bg-accent/90 transition-all duration-300 font-semibold hover:scale-105 w-full"
              >
                Demander un Devis
              </button>
            </div>
          </div>

          <div className="border-t border-border my-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-muted-foreground text-sm">
              <p>© {currentYear} Prestigia Agency. Tous droits réservés.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 sm:justify-end">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-accent transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
