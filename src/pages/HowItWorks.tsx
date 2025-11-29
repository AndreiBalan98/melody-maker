import { Button } from "@/components/ui/button";
import { Music, ArrowLeft, Sparkles, Download } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "1",
    icon: Sparkles,
    title: "Spune-ne Povestea",
    description: "Completează câteva detalii despre copil - nume, vârstă, preferințe și personalitate. Cu cât oferi mai multe informații, cu atât melodia va fi mai specială.",
  },
  {
    number: "2",
    icon: Music,
    title: "Creăm Melodia",
    description: "Tehnologia noastră avansată compune o melodie unică bazată pe informațiile tale. Procesul durează 1-2 minute, timp în care se întâmplă magia.",
  },
  {
    number: "3",
    icon: Download,
    title: "Descarcă și Bucură-te",
    description: "Primești melodia în format MP3 de înaltă calitate. Poți să o asculți direct în browser sau să o descarci pentru a o păstra pentru totdeauna.",
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2" size={20} />
            Înapoi
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-warm mb-4">
              <Music className="text-white" size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              Cum <span className="bg-gradient-warm bg-clip-text text-transparent">Funcționează?</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Crearea unei melodii personalizate este simplă și rapidă. Urmează acești pași:
            </p>
          </div>

          <div className="space-y-8 mb-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="bg-card rounded-3xl p-8 shadow-soft border border-border hover:shadow-warm transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-warm flex items-center justify-center">
                          <Icon className="text-white" size={32} />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center font-display font-bold text-accent-foreground">
                          {step.number}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="text-2xl font-display font-bold">{step.title}</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-warm rounded-3xl p-8 md:p-12 text-center text-white shadow-warm">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Gata să Creezi Prima Melodie?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Începe acum și creează o melodie unică care va aduce zâmbete și bucurie
            </p>
            <Link to="/create">
              <Button variant="secondary" size="xl" className="text-lg">
                <Music className="mr-2" size={24} />
                Începe Acum
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="text-4xl font-display font-bold text-primary">1-2 min</div>
              <p className="text-muted-foreground">Timp de generare</p>
            </div>
            <div className="text-center space-y-3">
              <div className="text-4xl font-display font-bold text-primary">100%</div>
              <p className="text-muted-foreground">Personalizat</p>
            </div>
            <div className="text-center space-y-3">
              <div className="text-4xl font-display font-bold text-primary">MP3</div>
              <p className="text-muted-foreground">Format de înaltă calitate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
