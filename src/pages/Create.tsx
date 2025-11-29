import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Loader2, Download, PlayCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const occasions = [
  { value: "birthday", label: "Birthday" },
  { value: "gift", label: "Special Gift" },
  { value: "kindergarten", label: "Kindergarten Song" },
  { value: "celebration", label: "Celebration" },
  { value: "bedtime", label: "Bedtime Lullaby" },
  { value: "learning", label: "Learning & Education" },
];

const Create = () => {
  const [childInfo, setChildInfo] = useState("");
  const [occasion, setOccasion] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSong, setGeneratedSong] = useState<{ audioUrl: string; title: string } | null>(null);

  const handleGenerate = async () => {
    if (!childInfo.trim() || !occasion) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("generate-song", {
        body: {
          childInfo,
          occasion,
        },
      });

      if (error) throw error;

      if (data?.audioUrl) {
        setGeneratedSong({
          audioUrl: data.audioUrl,
          title: data.title || "Your Personalized Song",
        });
        toast.success("Song created successfully!");
      }
    } catch (error: any) {
      console.error("Error generating song:", error);
      toast.error(error.message || "Failed to generate song. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft size={20} />
            <span className="font-display font-semibold">Back to Home</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              Create Your
              <span className="bg-gradient-warm bg-clip-text text-transparent"> Personalized Song</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Tell us about the special person and we'll create a unique song just for them
            </p>
          </div>

          {/* Form Card */}
          <Card className="shadow-warm border-2">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Song Details</CardTitle>
              <CardDescription>
                Share some information to help us create the perfect personalized song
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="childInfo" className="text-base font-semibold">
                  Tell us about them
                </Label>
                <Textarea
                  id="childInfo"
                  placeholder="Example: Emma loves dinosaurs and rainbow colors. She's turning 5 and enjoys playing with her dog Buddy..."
                  value={childInfo}
                  onChange={(e) => setChildInfo(e.target.value)}
                  rows={6}
                  className="resize-none text-base"
                />
                <p className="text-sm text-muted-foreground">
                  Include their name, age, interests, hobbies, or any special details
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occasion" className="text-base font-semibold">
                  What's the occasion?
                </Label>
                <Select value={occasion} onValueChange={setOccasion}>
                  <SelectTrigger id="occasion" className="text-base h-12">
                    <SelectValue placeholder="Select an occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    {occasions.map((occ) => (
                      <SelectItem key={occ.value} value={occ.value} className="text-base">
                        {occ.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="hero"
                size="xl"
                className="w-full mt-6"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Creating Your Song...
                  </>
                ) : (
                  <>
                    <Music />
                    Generate Song
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Song */}
          {generatedSong && (
            <Card className="shadow-warm border-2 animate-in fade-in slide-in-from-bottom duration-500">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <PlayCircle className="text-primary" />
                  {generatedSong.title}
                </CardTitle>
                <CardDescription>Your personalized song is ready!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <audio controls className="w-full" src={generatedSong.audioUrl}>
                  Your browser does not support the audio element.
                </audio>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <a href={generatedSong.audioUrl} download>
                    <Download />
                    Download Song
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
