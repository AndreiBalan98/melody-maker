import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Music, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const [childInfo, setChildInfo] = useState("");
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (!childInfo.trim()) {
      return;
    }
    
    // Navigate to processing page with the child info
    navigate("/processing", { state: { childInfo } });
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2" size={20} />
            Înapoi
          </Button>
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-warm mb-4">
              <Music className="text-white" size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              Creează <span className="bg-gradient-warm bg-clip-text text-transparent">Melodia Ta</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Spune-ne despre copil și vom crea o melodie specială
            </p>
          </div>

          <div className="bg-card rounded-3xl p-8 shadow-warm border border-border space-y-8">
            <div className="space-y-4">
              <Label htmlFor="childInfo" className="text-lg font-display font-semibold">
                Informații despre Copil
              </Label>
              <Textarea
                id="childInfo"
                placeholder="Exemplu: Numele copilului este Ana, are 5 ani, îi place să danseze și să cânte. Vrea o melodie veselă pentru ziua ei de naștere..."
                value={childInfo}
                onChange={(e) => setChildInfo(e.target.value)}
                className="min-h-[200px] text-base resize-none"
              />
              <p className="text-sm text-muted-foreground">
                Cu cât oferi mai multe detalii, cu atât melodia va fi mai personalizată
              </p>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!childInfo.trim()}
              variant="hero"
              size="xl"
              className="w-full"
            >
              <Music className="mr-2" size={20} />
              Generează Melodia
            </Button>
          </div>

          <div className="mt-8 p-6 bg-accent/10 rounded-2xl border border-accent/20">
            <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
              <span className="text-2xl">💡</span> Sfaturi pentru o melodie perfectă:
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Include numele copilului și vârsta</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Menționează lucrurile preferate (jucării, animale, activități)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Adaugă detalii despre personalitate și caracter</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Descrie atmosfera dorită (veselă, liniștită, energică)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
