import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { childInfo, occasion } = await req.json();

    if (!childInfo || !occasion) {
      throw new Error("Missing required fields: childInfo and occasion");
    }

    console.log("Generating song for:", { occasion, childInfoLength: childInfo.length });

    // Get Suno API key
    const SUNO_API_KEY = Deno.env.get("SUNO_API_KEY");
    if (!SUNO_API_KEY) {
      throw new Error("SUNO_API_KEY is not configured");
    }

    // Build the prompt based on the occasion and child info
    const promptMap: Record<string, string> = {
      birthday: `A cheerful, upbeat birthday song celebrating ${childInfo}. Happy and fun melody perfect for a birthday party.`,
      gift: `A heartfelt, warm song created as a special gift. ${childInfo}. Touching and memorable.`,
      kindergarten: `A fun, educational children's song for kindergarten. ${childInfo}. Simple, catchy, and age-appropriate.`,
      celebration: `An exciting, celebratory song for a special moment. ${childInfo}. Joyful and energetic.`,
      bedtime: `A gentle, soothing lullaby for bedtime. ${childInfo}. Calm, peaceful, and comforting.`,
      learning: `An engaging, educational song to help with learning. ${childInfo}. Fun and informative.`,
    };

    const prompt = promptMap[occasion] || `A personalized song about ${childInfo}. Warm and heartfelt.`;

    // Generate a title
    const titleMap: Record<string, string> = {
      birthday: "Happy Birthday Song",
      gift: "Special Gift Song",
      kindergarten: "Kindergarten Fun",
      celebration: "Celebration Time",
      bedtime: "Sweet Dreams Lullaby",
      learning: "Learning Adventure",
    };

    const title = titleMap[occasion] || "Your Personalized Song";

    console.log("Calling Suno API with prompt:", prompt);

    // Call Suno API to generate music
    const sunoResponse = await fetch("https://api.sunoapi.org/api/v1/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SUNO_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customMode: false,
        instrumental: false,
        prompt: prompt,
        title: title,
        model: "V3_5",
        // Suno requires a non-empty callback URL, but we rely on polling for the result.
        // Using a harmless placeholder URL that can safely receive callbacks.
        callBackUrl: "https://example.com/callback",
      }),
    });

    const sunoData = await sunoResponse.json();
    console.log("Suno API response:", JSON.stringify(sunoData));

    // New Suno API format: { code, msg, data: { task_id: string } }
    if (!sunoData || typeof sunoData !== "object") {
      throw new Error("Unexpected response format from Suno API");
    }

    if ("code" in sunoData && (sunoData as any).code !== 200) {
      const errorMessage = (sunoData as any).msg || `Suno API error code ${(sunoData as any).code}`;
      throw new Error(errorMessage);
    }

    const taskId =
      (sunoData as any).data?.task_id ||
      (sunoData as any).data?.taskId ||
      (sunoData as any).task_id ||
      (sunoData as any).taskId;

    if (!taskId) {
      throw new Error("No task ID returned from Suno API");
    }

    console.log("Suno task ID:", taskId);

    // Poll for song completion (max 60 seconds, check every 3 seconds)
    let attempts = 0;
    const maxAttempts = 20;
    let audioUrl: string | null = null;

    while (attempts < maxAttempts && !audioUrl) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      attempts++;

      console.log(`Polling attempt ${attempts}/${maxAttempts}`);

      const statusResponse = await fetch(
        `https://api.sunoapi.org/api/v1/generate/record-info?taskId=${taskId}`,
        {
          headers: {
            "Authorization": `Bearer ${SUNO_API_KEY}`,
          },
        }
      );

      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        console.log("Status check:", JSON.stringify(statusData));

        // Expected format: { code, msg, data: { status, data: [tracks] } }
        if (
          statusData &&
          typeof statusData === "object" &&
          (!("code" in statusData) || (statusData as any).code === 200) &&
          (statusData as any).data
        ) {
          const taskInfo = (statusData as any).data;
          const tracks =
            Array.isArray(taskInfo.data) ? taskInfo.data :
            Array.isArray((statusData as any).data) ? (statusData as any).data :
            [];

          if (tracks.length > 0) {
            const song = tracks[0];

            if (song.audio_url) {
              audioUrl = song.audio_url as string;
              console.log("Song generation complete! Audio URL:", audioUrl);
              break;
            }
          }

          if (taskInfo.status && typeof taskInfo.status === "string") {
            if (
              taskInfo.status === "CREATE_TASK_FAILED" ||
              taskInfo.status === "GENERATE_AUDIO_FAILED" ||
              taskInfo.status === "SENSITIVE_WORD_ERROR" ||
              taskInfo.status === "CALLBACK_EXCEPTION"
            ) {
              throw new Error(`Song generation failed: ${(statusData as any).msg || taskInfo.status}`);
            }
          }
        }
      }
    }

    if (!audioUrl) {
      throw new Error("Song generation timed out. Please try again.");
    }

    return new Response(
      JSON.stringify({
        audioUrl,
        title,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in generate-song function:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to generate song",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
