import { Music, Sparkles, Download, Clock } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Music,
      title: "Creație Simplă",
      description: "Alege tipul de melodie, completează câteva detalii și lasă magia să înceapă",
      color: "primary"
    },
    {
      icon: Sparkles,
      title: "Personalizare Completă",
      description: "Fiecare melodie este unică și adaptată exact la povestea ta",
      color: "accent"
    },
    {
      icon: Clock,
      title: "Rapid & Eficient",
      description: "Melodia ta personalizată va fi gata în doar 2-3 minute",
      color: "tertiary"
    },
    {
      icon: Download,
      title: "Descarcă & Păstrează",
      description: "Primești 2 variante ale melodiei tale, pe care le poți descărca instant",
      color: "highlight"
    }
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
            Cum funcționează
            <span className="bg-gradient-hero bg-clip-text text-transparent"> MyMusic</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Crearea melodiei tale perfecte este la doar câteva click-uri distanță
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-3xl p-8 shadow-card hover:shadow-vibrant transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-${feature.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`text-${feature.color}`} size={32} />
                </div>
                <h3 className="font-display font-semibold text-xl mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Process Steps */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-gradient-card rounded-3xl p-8 md:p-12 shadow-card">
            <h3 className="font-display font-bold text-2xl md:text-3xl mb-8 text-center">
              Pașii tăi către melodia perfectă
            </h3>
            <div className="space-y-6">
              {[
                { step: "1", text: "Alege tipul de melodie (Copii, Dragoste, Trap/Manele)" },
                { step: "2", text: "Selectează ocazia (pentru muzica pentru copii)" },
                { step: "3", text: "Completează detaliile personalizate" },
                { step: "4", text: "Adaugă sugestii suplimentare" },
                { step: "5", text: "Confirmă și primește 2 melodii unice!" }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0 text-white font-display font-bold">
                    {item.step}
                  </div>
                  <p className="text-lg text-foreground pt-1.5">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
