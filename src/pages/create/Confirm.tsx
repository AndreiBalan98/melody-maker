import { Button } from "@/components/ui/button";
import { Music, Sparkles, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Confirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { musicType, occasion, childDetails, suggestions } = location.state || {};

  const occasionLabels: Record<string, string> = {
    birthday: "Zi de Naștere",
    gift: "Cadou",
    kindergarten: "Grădiniță",
    anniversary: "Aniversare",
    proposal: "Cerere în Căsătorie",
    wedding: "Nuntă",
    party: "Petrecere",
    club: "Club",
    dedication: "Dedicație"
  };

  const handleGenerate = () => {
    navigate("/processing", {
      state: {
        musicType,
        occasion,
        childDetails,
        suggestions
      }
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link to="/create/suggestions">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2" size={20} />
            Înapoi
          </Button>
        </Link>

        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-card rounded-full shadow-soft mb-4">
            <Sparkles className="text-primary" size={20} />
            <span className="font-display font-semibold">Ultimul pas!</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            Confirmă <span className="bg-gradient-hero bg-clip-text text-transparent">detaliile</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Verifică informațiile și generează melodia ta personalizată
          </p>
        </div>

        <Card className="p-8 space-y-6 shadow-card mb-8">
          <div className="space-y-4">
            <div>
              <h3 className="font-display font-semibold text-sm text-muted-foreground mb-1">
                Ocazie
              </h3>
              <p className="text-lg">{occasionLabels[occasion] || occasion}</p>
            </div>

            <div className="h-px bg-border" />

            <div>
              <h3 className="font-display font-semibold text-sm text-muted-foreground mb-2">
                Detalii
              </h3>
              <div className="space-y-3">
                {childDetails?.name && (
                  <div>
                    <span className="font-semibold">Nume:</span> {childDetails.name}
                  </div>
                )}
                {childDetails?.age && (
                  <div>
                    <span className="font-semibold">Vârstă:</span> {childDetails.age}
                  </div>
                )}
                {childDetails?.interests && (
                  <div>
                    <span className="font-semibold">Interese:</span> {childDetails.interests}
                  </div>
                )}
                {childDetails?.knowledge && (
                  <div>
                    <span className="font-semibold">Cunoștințe:</span> {childDetails.knowledge}
                  </div>
                )}
                {childDetails?.other && (
                  <div>
                    <span className="font-semibold">Altele:</span> {childDetails.other}
                  </div>
                )}
              </div>
            </div>

            {suggestions && (
              <>
                <div className="h-px bg-border" />
                <div>
                  <h3 className="font-display font-semibold text-sm text-muted-foreground mb-2">
                    Sugestii
                  </h3>
                  <p className="text-foreground">{suggestions}</p>
                </div>
              </>
            )}
          </div>
        </Card>

        <div className="space-y-4">
          <Button
            size="xl"
            onClick={handleGenerate}
            className="w-full bg-gradient-hero hover:shadow-vibrant hover:scale-105 transition-spring text-lg group"
          >
            <Music className="group-hover:rotate-12 transition-transform" size={24} />
            Generează Melodia!
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Vei primi 2 variante ale melodiei tale în aproximativ 2-3 minute
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
