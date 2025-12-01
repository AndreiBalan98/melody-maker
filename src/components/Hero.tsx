import { Button } from "@/components/ui/button";
import { Music, Sparkles, Heart, Zap } from "lucide-react";
import { Link } from "react-router-dom";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-[10%] text-primary/20 animate-float" style={{
        animationDelay: "0s"
      }}>
          <Music size={64} />
        </div>
        <div className="absolute top-40 right-[15%] text-accent/30 animate-float" style={{
        animationDelay: "1s"
      }}>
          <Sparkles size={48} />
        </div>
        <div className="absolute bottom-32 left-[20%] text-tertiary/25 animate-float" style={{
        animationDelay: "0.5s"
      }}>
          <Heart size={56} />
        </div>
        <div className="absolute bottom-40 right-[25%] text-highlight/30 animate-float" style={{
        animationDelay: "1.5s"
      }}>
          <Zap size={52} />
        </div>
        <div className="absolute top-[60%] right-[8%] text-secondary/20 animate-float" style={{
        animationDelay: "2s"
      }}>
          <Music size={72} />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-card rounded-full shadow-soft animate-in fade-in zoom-in duration-500">
            <Sparkles className="text-primary" size={20} />
            <span className="font-display font-semibold text-foreground">
              Muzică personalizată pentru fiecare moment special
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-tight animate-in fade-in slide-in-from-bottom duration-700 delay-100">
            Creează magie cu
            <br />
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              MyMusic
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            Melodii personalizate pentru copii, zile de naștere, momente de dragoste și multe altele. 
            <span className="text-primary font-semibold">
Creată în câteva minute.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            <Link to="/create/type">
              <Button size="xl" className="text-lg px-8 py-6 bg-gradient-hero hover:shadow-vibrant hover:scale-105 transition-spring group shadow-card">
                <Music className="group-hover:rotate-12 transition-transform" size={24} />
                Începe Acum Gratuit
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="outline" size="xl" className="text-lg px-8 py-6 border-2 hover:bg-muted">
                Cum Funcționează
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm sm:text-base text-muted-foreground animate-in fade-in slide-in-from-bottom duration-700 delay-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-medium">1000+ melodii create</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-medium">Gata în 2-3 minute</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
              <span className="font-medium">100% personalizat</span>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto pt-8 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
            <div className="bg-gradient-card rounded-2xl p-6 shadow-card hover:shadow-vibrant transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Music className="text-primary" size={24} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Muzică pentru Copii</h3>
              <p className="text-sm text-muted-foreground">Melodii educative și vesele</p>
            </div>
            <div className="bg-gradient-card rounded-2xl p-6 shadow-card hover:shadow-vibrant transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center mb-4 mx-auto">
                <Heart className="text-tertiary" size={24} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Melodii de Dragoste</h3>
              <p className="text-sm text-muted-foreground">Cadouri romantice speciale</p>
            </div>
            <div className="bg-gradient-card rounded-2xl p-6 shadow-card hover:shadow-vibrant transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                <Zap className="text-accent" size={24} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Trap & Manele</h3>
              <p className="text-sm text-muted-foreground">Ritmuri moderne și energice</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;