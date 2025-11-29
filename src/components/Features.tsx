import { Gift, Heart, PartyPopper, Baby } from "lucide-react";

const features = [
  {
    icon: PartyPopper,
    title: "Melodii de Ziua de Naștere",
    description: "Fă ziua lor specială și mai memorabilă cu o melodie personalizată",
  },
  {
    icon: Gift,
    title: "Cadouri Perfecte",
    description: "Oferă cadoul muzicii - melodii personalizate pentru orice ocazie",
  },
  {
    icon: Baby,
    title: "Distractie la Grădinița",
    description: "Melodii educative și distractive perfecte pentru cei mici",
  },
  {
    icon: Heart,
    title: "Momente Speciale",
    description: "Celebrează realizări, evenimente și magia din fiecare zi",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Melodii Pentru Fiecare
            <span className="bg-gradient-warm bg-clip-text text-transparent"> Ocazie</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fie că este o sărbătoare sau pur și simplu așa, creează melodia personalizată perfectă
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-warm transition-all duration-300 hover:-translate-y-2 border border-border"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-warm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
