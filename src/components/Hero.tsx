import { Button } from "@/components/ui/button";
import { Music, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-music.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-soft -z-10" />
      
      {/* Floating musical notes decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 text-primary/20 animate-bounce" style={{ animationDelay: "0s", animationDuration: "3s" }}>
          <Music size={48} />
        </div>
        <div className="absolute top-40 right-20 text-accent/30 animate-bounce" style={{ animationDelay: "1s", animationDuration: "4s" }}>
          <Sparkles size={40} />
        </div>
        <div className="absolute bottom-32 left-1/4 text-primary/15 animate-bounce" style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}>
          <Music size={56} />
        </div>
        <div className="absolute bottom-20 right-1/3 text-accent/20 animate-bounce" style={{ animationDelay: "1.5s", animationDuration: "4.5s" }}>
          <Sparkles size={44} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className="text-center md:text-left space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-block px-4 py-2 bg-accent/20 rounded-full">
              <span className="text-accent-foreground font-semibold text-sm">
                ✨ Creează Magie cu Muzică
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              Melodii Personalizate
              <br />
              <span className="bg-gradient-warm bg-clip-text text-transparent">
                Create Special Pentru Tine
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl">
              Creează melodii personalizate pentru copii, zile de naștere, cadouri și momente speciale. 
              Fiecare melodie este unică, fiecare moment de neuitat.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/create">
                <Button variant="hero" size="xl" className="group">
                  <Music className="group-hover:rotate-12 transition-transform" />
                  Creează Melodia Ta
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="xl">
                  Cum Funcționează
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 justify-center md:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Gata în câteva minute</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>Complet personalizată</span>
              </div>
            </div>
          </div>

          {/* Right: Hero image */}
          <div className="relative animate-in fade-in slide-in-from-right duration-700 delay-300">
            <div className="relative rounded-3xl overflow-hidden shadow-warm">
              <img 
                src={heroImage} 
                alt="Instrumente muzicale colorate reprezentând crearea de muzică personalizată"
                className="w-full h-auto"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            </div>
            
            {/* Floating card decoration */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-soft border border-border animate-in fade-in zoom-in duration-500 delay-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-warm flex items-center justify-center">
                  <Music className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-display font-semibold">1000+ melodii</p>
                  <p className="text-sm text-muted-foreground">Create cu drag</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
