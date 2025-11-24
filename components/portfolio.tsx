"use client"

export default function Portfolio() {
  const projects = [
    { id: 1, title: "Plateforme E-commerce", category: "Développement", color: "from-accent/40 to-primary/40" },
    { id: 2, title: "Branding Luxury", category: "Design", color: "from-accent/30 to-accent/10" },
    { id: 3, title: "Stratégie Marketing", category: "Conseil", color: "from-primary/40 to-accent/20" },
    { id: 4, title: "Refonte Web", category: "Développement", color: "from-accent/35 to-primary/25" },
    { id: 5, title: "Identité Visuelle", category: "Design", color: "from-primary/30 to-accent/30" },
    { id: 6, title: "Campagne Digital", category: "Marketing", color: "from-accent/25 to-foreground/10" },
  ]

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Notre <span className="text-accent">Portfolio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos réalisations et projets d'excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group relative h-64 rounded-xl overflow-hidden cursor-pointer">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} group-hover:scale-110 transition-transform duration-500`}
              ></div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <p className="text-sm text-accent mb-2 font-semibold">{project.category}</p>
                <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
