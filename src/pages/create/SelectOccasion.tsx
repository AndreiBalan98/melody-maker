import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Cake, Gift, School, ArrowLeft, Heart, Radio } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";

type Occasion = "birthday" | "gift" | "kindergarten" | "anniversary" | "proposal" | "wedding" | "party" | "club" | "dedication";

const SelectOccasion = () => {
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const musicType = location.state?.musicType;

  const getOccasionsByType = () => {
    if (musicType === "children") {
      return [
        {
          id: "birthday" as Occasion,
          icon: Cake,
          title: "Zi de Naștere",
          description: "O melodie specială pentru ziua copilului",
          color: "primary"
        },
        {
          id: "gift" as Occasion,
          icon: Gift,
          title: "Cadou",
          description: "Un cadou muzical unic și memorabil",
          color: "tertiary"
        },
        {
          id: "kindergarten" as Occasion,
          icon: School,
          title: "Grădiniță",
          description: "Melodii educative pentru activități",
          color: "accent"
        }
      ];
    } else if (musicType === "love") {
      return [
        {
          id: "anniversary" as Occasion,
          icon: Heart,
          title: "Aniversare",
          description: "Sărbătorește dragostea voastră",
          color: "tertiary"
        },
        {
          id: "proposal" as Occasion,
          icon: Gift,
          title: "Cerere în Căsătorie",
          description: "Momentul perfect pentru DA-ul cel mare",
          color: "primary"
        },
        {
          id: "dedication" as Occasion,
          icon: Heart,
          title: "Dedicație",
          description: "Exprimă-ți sentimentele prin muzică",
          color: "accent"
        }
      ];
    } else if (musicType === "trap") {
      return [
        {
          id: "party" as Occasion,
          icon: Radio,
          title: "Petrecere",
          description: "Muzică pentru chef și distracție",
          color: "accent"
        },
        {
          id: "club" as Occasion,
          icon: Radio,
          title: "Club",
          description: "Ritmuri pentru ringul de dans",
          color: "primary"
        },
        {
          id: "dedication" as Occasion,
          icon: Heart,
          title: "Dedicație",
          description: "Manea personalizată pentru cineva special",
          color: "tertiary"
        }
      ];
    }
    return [];
  };

  const occasions = getOccasionsByType();

  const handleContinue = () => {
    if (selectedOccasion) {
      navigate("/create/details", { 
        state: { 
          musicType,
          occasion: selectedOccasion 
        } 
      });
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <Link to="/create/type">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2" size={20} />
            Înapoi
          </Button>
        </Link>

        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
            Pentru ce <span className="bg-gradient-hero bg-clip-text text-transparent">ocazie</span>?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Spune-ne pentru ce moment special vrei să creezi melodia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {occasions.map((occasion) => {
            const Icon = occasion.icon;
            const isSelected = selectedOccasion === occasion.id;

            return (
              <Card
                key={occasion.id}
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "ring-4 ring-primary shadow-vibrant scale-105"
                    : "hover:shadow-card hover:-translate-y-1"
                }`}
                onClick={() => setSelectedOccasion(occasion.id)}
              >
                <div className="p-8 space-y-6">
                  <div className={`w-20 h-20 rounded-2xl bg-${occasion.color}/10 flex items-center justify-center mx-auto`}>
                    <Icon className={`text-${occasion.color}`} size={40} />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="font-display font-bold text-2xl">{occasion.title}</h3>
                    <p className="text-muted-foreground">{occasion.description}</p>
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
            disabled={!selectedOccasion}
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

export default SelectOccasion;
