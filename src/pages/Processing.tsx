import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music, Download, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Processing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedSong, setGeneratedSong] = useState<string | null>(null);
  const childInfo = location.state?.childInfo;

  useEffect(() => {
    if (!childInfo) {
      navigate("/create");
      return;
    }

    const generateSong = async () => {
      try {
        setIsGenerating(true);
        
        const { data, error } = await supabase.functions.invoke("generate-song", {
          body: { childInfo },
        });

        if (error) throw error;

        if (data?.audioUrl) {
          setGeneratedSong(data.audioUrl);
          toast.success("Melodia ta este gata!");
        } else {
          throw new Error("Nu s-a putut genera melodia");
        }
      } catch (error) {
        console.error("Error generating song:", error);
        toast.error("A apărut o eroare la generarea melodiei. Te rugăm să încerci din nou.");
        navigate("/create");
      } finally {
        setIsGenerating(false);
      }
    };

    generateSong();
  }, [childInfo, navigate]);

  const handleDownload = () => {
    if (generatedSong) {
      const link = document.createElement("a");
      link.href = generatedSong;
      link.download = "my-music-song.mp3";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Melodia se descarcă!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-8">
            {isGenerating ? (
              <>
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full bg-gradient-warm flex items-center justify-center animate-pulse">
                    <Music className="text-white" size={64} />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-warm animate-ping opacity-20" />
                </div>
                
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-display font-bold">
                    Creăm <span className="bg-gradient-warm bg-clip-text text-transparent">Melodia Ta</span>
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Te rugăm să aștepți, magia se întâmplă...
                  </p>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Loader2 className="animate-spin" size={20} />
                    <span>Acest proces poate dura 1-2 minute</span>
                  </div>
                </div>

                <div className="bg-card rounded-3xl p-8 shadow-warm border border-border">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-muted-foreground">Analizăm informațiile...</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.3s" }} />
                      <span className="text-muted-foreground">Compunem melodia...</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.6s" }} />
                      <span className="text-muted-foreground">Adăugăm magic personalizat...</span>
                    </div>
                  </div>
                </div>
              </>
            ) : generatedSong ? (
              <>
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-warm animate-in zoom-in duration-500">
                  <Music className="text-white" size={64} />
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-display font-bold">
                    🎉 <span className="bg-gradient-warm bg-clip-text text-transparent">Gata!</span>
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Melodia ta personalizată este pregătită
                  </p>
                </div>

                <div className="bg-card rounded-3xl p-8 shadow-warm border border-border space-y-6">
                  <audio
                    src={generatedSong}
                    controls
                    className="w-full"
                    controlsList="nodownload"
                  />

                  <Button
                    onClick={handleDownload}
                    variant="hero"
                    size="xl"
                    className="w-full"
                  >
                    <Download className="mr-2" size={20} />
                    Descarcă Melodia
                  </Button>
                </div>

                <div className="flex gap-4 justify-center">
                  <Link to="/create">
                    <Button variant="outline" size="lg">
                      Creează Altă Melodie
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button variant="ghost" size="lg">
                      <ArrowLeft className="mr-2" size={20} />
                      Acasă
                    </Button>
                  </Link>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Processing;
