import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { musicType, occasion, childDetails } = location.state || {};

  const handleContinue = () => {
    navigate("/create/confirm", {
      state: {
        musicType,
        occasion,
        childDetails,
        suggestions: suggestions.trim()
      }
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link to="/create/details">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2" size={20} />
            Înapoi
          </Button>
        </Link>

        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            Sugestii pentru <span className="bg-gradient-hero bg-clip-text text-transparent">melodie</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Adaugă orice detalii suplimentare care te-ar ajuta să creăm melodia perfectă
          </p>
        </div>

        <Card className="p-8 space-y-8 shadow-card">
          <div className="space-y-2">
            <Label htmlFor="suggestions" className="text-lg font-display font-semibold">
              Sugestii generale (opțional)
            </Label>
            <Textarea
              id="suggestions"
              placeholder="ex: Vreau ca melodia să fie veselă și energică, cu multe instrumente. Poate să includă și zgomotele animalelor preferate sau referiri la desenele animate favorite..."
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
              className="min-h-[200px] text-base resize-none"
            />
            <p className="text-sm text-muted-foreground">
              Aici poți specifica stilul muzical dorit, instrumentele preferate, atmosfera melodiei, sau orice alte detalii care contează pentru tine
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <Button
              size="xl"
              onClick={handleContinue}
              className="w-full bg-gradient-hero hover:shadow-vibrant hover:scale-105 transition-spring text-lg"
            >
              Continuă la Confirmare
            </Button>
            <Button
              size="xl"
              variant="outline"
              onClick={handleContinue}
              className="w-full"
            >
              Sari peste acest pas
            </Button>
          </div>
        </Card>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20">
            <h3 className="font-display font-semibold mb-2 text-primary">💡 Idee de stil</h3>
            <p className="text-sm text-muted-foreground">
              "Vreau o melodie cu chitară și tobă, cu un ritm vesel și ușor de dansat"
            </p>
          </div>
          <div className="p-6 bg-accent/5 rounded-2xl border border-accent/20">
            <h3 className="font-display font-semibold mb-2 text-accent">🎵 Idee de atmosferă</h3>
            <p className="text-sm text-muted-foreground">
              "O melodie liniștitoare, perfectă pentru momentul culcării, cu sunete de natură"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
