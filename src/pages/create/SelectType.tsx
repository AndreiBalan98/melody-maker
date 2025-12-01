import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Music, Heart, Radio, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

type MusicType = "children" | "love" | "trap";

const SelectType = () => {
  const [selectedType, setSelectedType] = useState<MusicType | null>(null);
  const navigate = useNavigate();

  const musicTypes = [
    {
      id: "children" as MusicType,
      icon: Music,
      title: "Muzică pentru Copii",
      description: "Melodii vesele și educative pentru cei mici",
      color: "primary",
      gradient: "from-primary to-primary-glow"
    },
    {
      id: "love" as MusicType,
      icon: Heart,
      title: "Melodii de Dragoste",
      description: "Cadouri romantice și declarații muzicale",
      color: "tertiary",
      gradient: "from-tertiary to-pink-400"
    },
    {
      id: "trap" as MusicType,
      icon: Radio,
      title: "Trap & Manele",
      description: "Ritmuri moderne și energice",
      color: "accent",
      gradient: "from-accent to-blue-400"
    }
  ];

  const handleContinue = () => {
    if (selectedType) {
      navigate("/create/occasion", { state: { musicType: selectedType } });
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2" size={20} />
            Înapoi
          </Button>
        </Link>

        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
            Ce fel de <span className="bg-gradient-hero bg-clip-text text-transparent">melodie</span> vrei să creezi?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Alege categoria care se potrivește momentului tău special
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {musicTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;

            return (
              <Card
                key={type.id}
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "ring-4 ring-primary shadow-vibrant scale-105"
                    : "hover:shadow-card hover:-translate-y-1"
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <div className="p-8 space-y-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${type.gradient} flex items-center justify-center mx-auto`}>
                    <Icon className="text-white" size={40} />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="font-display font-bold text-2xl">{type.title}</h3>
                    <p className="text-muted-foreground">{type.description}</p>
                  </div>
                  {isSelected && (
                    <div className="flex justify-center">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            size="xl"
            disabled={!selectedType}
            onClick={handleContinue}
            className="bg-gradient-hero hover:shadow-vibrant hover:scale-105 transition-spring text-lg px-12"
          >
            Continuă
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectType;
