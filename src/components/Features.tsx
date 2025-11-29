import { Gift, Heart, PartyPopper, Baby } from "lucide-react";

const features = [
  {
    icon: PartyPopper,
    title: "Birthday Songs",
    description: "Make their special day even more memorable with a custom birthday song",
  },
  {
    icon: Gift,
    title: "Perfect Gifts",
    description: "Give the gift of music - personalized songs for any occasion",
  },
  {
    icon: Baby,
    title: "Kindergarten Fun",
    description: "Educational and entertaining songs perfect for little learners",
  },
  {
    icon: Heart,
    title: "Special Moments",
    description: "Celebrate milestones, achievements, and everyday magic",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Songs for Every
            <span className="bg-gradient-warm bg-clip-text text-transparent"> Occasion</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether it's a celebration or just because, create the perfect personalized song
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
