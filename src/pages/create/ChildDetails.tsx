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

  const getLabels = () => {
    if (musicType === "children") {
      return {
        title: "copil",
        nameLabel: "Numele copilului",
        namePlaceholder: "ex: Ana Maria",
        ageLabel: "Vârsta",
        agePlaceholder: "ex: 5 ani",
        interestsLabel: "Interese și pasiuni",
        interestsPlaceholder: "ex: Îi place să danseze, să cânte, să deseneze. Adoră animalele și jocurile în aer liber...",
        knowledgeLabel: "Cunoștințe și realizări",
        knowledgePlaceholder: "ex: Știe să numere până la 100, vorbește engleza, a învățat recent să înoate...",
        otherLabel: "Altele (personalitate, preferințe)",
        otherPlaceholder: "ex: Este veselă și sociabilă, iubește culorile vii, îi place muzica veselă..."
      };
    } else if (musicType === "love") {
      return {
        title: "persoana iubită",
        nameLabel: "Numele persoanei",
        namePlaceholder: "ex: Maria",
        ageLabel: "Relația voastră",
        agePlaceholder: "ex: 3 ani împreună",
        interestsLabel: "Pasiuni și momente speciale",
        interestsPlaceholder: "ex: Iubește plimbările pe plajă, momentele la cafea dimineața, călătoriile...",
        knowledgeLabel: "Ce o/îl face special",
        knowledgePlaceholder: "ex: Zâmbetul ei luminează fiecare zi, are o inimă mare, mă susține mereu...",
        otherLabel: "Mesaj personal",
        otherPlaceholder: "ex: Vreau să îi spun cât de mult înseamnă pentru mine..."
      };
    } else if (musicType === "trap") {
      return {
        title: "persoana/ocazia",
        nameLabel: "Pentru cine sau ce",
        namePlaceholder: "ex: Andrei, Echipa, Petrecerea mea",
        ageLabel: "Context",
        agePlaceholder: "ex: Ziua mea de naștere, Succesul nostru",
        interestsLabel: "Vibe-ul dorit",
        interestsPlaceholder: "ex: Energie mare, atmosferă de party, ritmuri puternice, bass intens...",
        knowledgeLabel: "Mesaj sau temă",
        knowledgePlaceholder: "ex: Succes, bani, prietenie, distracție, respect...",
        otherLabel: "Detalii suplimentare",
        otherPlaceholder: "ex: Vreau să fie catchy, cu un refren memorabil..."
      };
    }
    return {
      title: "destinatar",
      nameLabel: "Nume",
      namePlaceholder: "ex: Numele",
      ageLabel: "Vârstă/Context",
      agePlaceholder: "ex: 25 ani",
      interestsLabel: "Interese",
      interestsPlaceholder: "ex: Interese și pasiuni...",
      knowledgeLabel: "Detalii",
      knowledgePlaceholder: "ex: Detalii importante...",
      otherLabel: "Altele",
      otherPlaceholder: "ex: Informații suplimentare..."
    };
  };

  const labels = getLabels();

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
            Spune-ne despre <span className="bg-gradient-hero bg-clip-text text-transparent">{labels.title}</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Cu cât oferi mai multe detalii, cu atât melodia va fi mai personalizată
          </p>
        </div>

        <Card className="p-8 space-y-8 shadow-card">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg font-display font-semibold">
              {labels.nameLabel} *
            </Label>
            <Input
              id="name"
              placeholder={labels.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-lg py-6"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age" className="text-lg font-display font-semibold">
              {labels.ageLabel}
            </Label>
            <Input
              id="age"
              placeholder={labels.agePlaceholder}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="text-lg py-6"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests" className="text-lg font-display font-semibold">
              {labels.interestsLabel}
            </Label>
            <Textarea
              id="interests"
              placeholder={labels.interestsPlaceholder}
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="min-h-[100px] text-base resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="knowledge" className="text-lg font-display font-semibold">
              {labels.knowledgeLabel}
            </Label>
            <Textarea
              id="knowledge"
              placeholder={labels.knowledgePlaceholder}
              value={knowledge}
              onChange={(e) => setKnowledge(e.target.value)}
              className="min-h-[100px] text-base resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="other" className="text-lg font-display font-semibold">
              {labels.otherLabel}
            </Label>
            <Textarea
              id="other"
              placeholder={labels.otherPlaceholder}
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
