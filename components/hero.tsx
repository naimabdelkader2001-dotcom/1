"use client"

export default function Hero() {
  const handleStartNow = () => {
    const phoneNumber = "212XXX" // À remplacer par votre numéro WhatsApp
    const message = "Bonjour, j'aimerais commencer maintenant avec vos services."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleLearnMore = () => {
    const element = document.querySelector("#services")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-card to-background"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-in-down">
            <div>
              <h2 className="text-6xl md:text-7xl font-bold text-foreground mb-4 text-balance leading-tight">
                Transformez Votre <span className="text-accent">Présence</span> Digitale
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Prestigia Agency est votre partenaire stratégique pour une excellence digitale. Nous créons des
                expériences mémorables qui convertissent vos visiteurs en clients fidèles.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleStartNow}
                className="bg-accent text-background px-8 py-3 rounded-full hover:bg-accent/90 transition-all duration-300 font-semibold text-lg hover:scale-105"
              >
                Commencer Maintenant
              </button>
              <button
                onClick={handleLearnMore}
                className="border-2 border-accent text-accent px-8 py-3 rounded-full hover:bg-accent hover:text-background transition-all duration-300 font-semibold text-lg"
              >
                En Savoir Plus
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div>
                <p className="text-3xl font-bold text-accent">150+</p>
                <p className="text-sm text-muted-foreground">Projets Réalisés</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">98%</p>
                <p className="text-sm text-muted-foreground">Clients Satisfaits</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">12+</p>
                <p className="text-sm text-muted-foreground">Années d'Expérience</p>
              </div>
            </div>
          </div>

          <div className="relative h-96 md:h-full animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl blur-3xl"></div>
            <div className="relative bg-card border border-accent/20 rounded-2xl p-8 h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">✨</div>
                <p className="text-foreground font-bold text-2xl">Innovation & Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
