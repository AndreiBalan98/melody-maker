import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music, Download, Home, RefreshCw, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Processing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedSongs, setGeneratedSongs] = useState<Array<{ audioUrl: string; title: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const { musicType, occasion, childDetails, suggestions } = location.state || {};

  useEffect(() => {
    if (!childDetails) {
      navigate("/create/type");
      return;
    }

    const generateSong = async () => {
      try {
        setIsGenerating(true);
        setError(null);

        const requestData = {
          musicType,
          occasion,
          childDetails,
          suggestions,
        };

        console.log("Starting song generation with data:", requestData);

        // Adaugă timeout de 5 minute (300000 ms) pentru request
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Timeout")), 300000);
        });

        const invokePromise = supabase.functions.invoke("generate-song", {
          body: requestData,
        });

        const { data, error } = (await Promise.race([invokePromise, timeoutPromise])) as any;

        console.log("Response received:", { data, error });

        if (error) {
          console.error("Supabase function error:", error);
          throw new Error(error.message || "Eroare la generarea melodiei");
        }

        if (data?.error) {
          console.error("API error in response:", data.error);
          throw new Error(data.error);
        }

        if (data?.songs && Array.isArray(data.songs)) {
          console.log("Songs generated successfully:", data.songs.length);
          setGeneratedSongs(data.songs);
        } else if (data?.audioUrl) {
          // Backward compatibility
          console.log("Single song generated (legacy format)");
          setGeneratedSongs([{ audioUrl: data.audioUrl, title: data.title || "Melodia Ta" }]);
        } else {
          throw new Error("Format răspuns invalid - nu s-au primit melodii");
        }

        setIsGenerating(false);
      } catch (error: any) {
        console.error("Error generating song:", error);

        let errorMessage = "A apărut o eroare necunoscută";

        if (error.message === "Timeout") {
          errorMessage = "Generarea melodiei durează prea mult. Te rugăm să încerci din nou.";
        } else if (error.message?.includes("Failed to fetch")) {
          errorMessage = "Problemă de conexiune. Verifică conexiunea la internet.";
        } else if (error.message) {
          errorMessage = error.message;
        }

        setError(errorMessage);
        setIsGenerating(false);

        toast({
          variant: "destructive",
          title: "Eroare la generare",
          description: errorMessage,
        });
      }
    };

    generateSong();
  }, [childDetails, musicType, occasion, suggestions, navigate, toast, retryCount]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  const handleDownload = (audioUrl: string, title: string) => {
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `${title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Ecran de eroare
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="relative">
            <div className="w-32 h-32 mx-auto">
              <div className="relative w-full h-full rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="text-destructive" size={56} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              Oops! <span className="bg-gradient-hero bg-clip-text text-transparent">Ceva nu a mers bine</span>
            </h1>
            <p className="text-xl text-muted-foreground">{error}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              onClick={handleRetry}
              className="bg-gradient-hero hover:shadow-vibrant hover:scale-105 transition-spring"
            >
              <RefreshCw className="mr-2" size={20} />
              Încearcă din nou
            </Button>
            <Link to="/create/type">
              <Button variant="outline" size="lg">
                <Home className="mr-2" size={20} />
                Înapoi la început
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">Dacă problema persistă, te rugăm să ne contactezi.</p>
        </div>
      </div>
    );
  }

  // Ecran de loading
  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="relative">
            <div className="w-32 h-32 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-hero opacity-20 animate-ping" />
              <div className="relative w-full h-full rounded-full bg-gradient-hero flex items-center justify-center shadow-vibrant">
                <Music className="text-white animate-pulse" size={56} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              Creăm <span className="bg-gradient-hero bg-clip-text text-transparent">magia</span>...
            </h1>
            <p className="text-xl text-muted-foreground">Melodia ta personalizată va fi gata în câteva momente</p>
          </div>

          <div className="space-y-3">
            {["Pregătim instrumentele muzicale...", "Compunem melodia...", "Adăugăm detaliile personalizate..."].map(
              (message, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-3 text-muted-foreground animate-in fade-in slide-in-from-bottom duration-500"
                  style={{ animationDelay: `${index * 400}ms` }}
                >
                  <Loader2 className="animate-spin" size={20} />
                  <span>{message}</span>
                </div>
              ),
            )}
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground">⏱️ Timp estimat: 2-3 minute</p>
            <p className="text-xs text-muted-foreground mt-2">Te rugăm să nu închizi această pagină</p>
          </div>
        </div>
      </div>
    );
  }

  // Ecran de succes cu melodii
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 space-y-4 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-card rounded-full shadow-soft mb-4">
            <Music className="text-primary" size={20} />
            <span className="font-display font-semibold">Melodia ta este gata!</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            Melodiile tale <span className="bg-gradient-hero bg-clip-text text-transparent">personalizate</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Am creat {generatedSongs.length} variante speciale pentru tine
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          {generatedSongs.map((song, index) => (
            <div
              key={index}
              className="bg-card rounded-3xl p-8 shadow-card hover:shadow-vibrant transition-all animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0">
                  <Music className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="font-display font-bold text-2xl">Varianta {index + 1}</h2>
                  <p className="text-sm text-muted-foreground">{song.title}</p>
                </div>
              </div>

              <audio controls className="w-full mb-6 rounded-lg">
                <source src={song.audioUrl} type="audio/mpeg" />
                Browser-ul tău nu suportă redarea audio.
              </audio>

              <Button
                onClick={() => handleDownload(song.audioUrl, song.title)}
                variant="outline"
                size="lg"
                className="w-full"
              >
                <Download className="mr-2" size={20} />
                Descarcă MP3
              </Button>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/create/type">
            <Button size="lg" className="bg-gradient-hero hover:shadow-vibrant hover:scale-105 transition-spring">
              <RefreshCw className="mr-2" size={20} />
              Creează Altă Melodie
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="lg">
              <Home className="mr-2" size={20} />
              Înapoi Acasă
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Processing;
