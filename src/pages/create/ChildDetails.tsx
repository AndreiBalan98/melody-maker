import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";

const ChildDetails = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [interests, setInterests] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [other, setOther] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();
  const { musicType, occasion } = location.state || {};

  const handleContinue = () => {
    if (name.trim()) {
      navigate("/create/suggestions", {
        state: {
          musicType,
          occasion,
          childDetails: {
            name: name.trim(),
            age: age.trim(),
            interests: interests.trim(),
            knowledge: knowledge.trim(),
            other: other.trim()
          }
        }
      });
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link to="/create/occasion">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2" size={20} />
            Înapoi
          </Button>
        </Link>

        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            Spune-ne despre <span className="bg-gradient-hero bg-clip-text text-transparent">copil</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Cu cât oferi mai multe detalii, cu atât melodia va fi mai personalizată
          </p>
        </div>

        <Card className="p-8 space-y-8 shadow-card">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg font-display font-semibold">
              Numele copilului *
            </Label>
            <Input
              id="name"
              placeholder="ex: Ana Maria"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-lg py-6"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age" className="text-lg font-display font-semibold">
              Vârsta
            </Label>
            <Input
              id="age"
              placeholder="ex: 5 ani"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="text-lg py-6"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests" className="text-lg font-display font-semibold">
              Interese și pasiuni
            </Label>
            <Textarea
              id="interests"
              placeholder="ex: Îi place să danseze, să cânte, să deseneze. Adoră animalele și jocurile în aer liber..."
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="min-h-[100px] text-base resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="knowledge" className="text-lg font-display font-semibold">
              Cunoștințe și realizări
            </Label>
            <Textarea
              id="knowledge"
              placeholder="ex: Știe să numere până la 100, vorbește engleza, a învățat recent să înoate..."
              value={knowledge}
              onChange={(e) => setKnowledge(e.target.value)}
              className="min-h-[100px] text-base resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="other" className="text-lg font-display font-semibold">
              Altele (personalitate, preferințe)
            </Label>
            <Textarea
              id="other"
              placeholder="ex: Este veselă și sociabilă, iubește culorile vii, îi place muzica veselă..."
              value={other}
              onChange={(e) => setOther(e.target.value)}
              className="min-h-[100px] text-base resize-none"
            />
          </div>

          <div className="pt-4">
            <Button
              size="xl"
              disabled={!name.trim()}
              onClick={handleContinue}
              className="w-full bg-gradient-hero hover:shadow-vibrant hover:scale-105 transition-spring text-lg"
            >
              Continuă
            </Button>
          </div>
        </Card>

        <div className="mt-8 p-6 bg-muted/50 rounded-2xl">
          <p className="text-sm text-muted-foreground text-center">
            💡 <span className="font-semibold">Sfat:</span> Cu cât oferi mai multe detalii, cu atât melodia va fi mai personalizată și mai specială!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChildDetails;
