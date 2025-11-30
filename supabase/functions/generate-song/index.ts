import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { musicType, occasion, childDetails, suggestions } = await req.json();
    console.log("Received request:", { musicType, occasion, childDetails, suggestions });

    const SUNO_API_KEY = Deno.env.get('SUNO_API_KEY');
    if (!SUNO_API_KEY) {
      throw new Error('SUNO_API_KEY is not configured');
    }

    // Build prompt based on provided details
    let prompt = `Create a personalized children's song`;
    
    if (occasion) {
      const occasionText: Record<string, string> = {
        birthday: "for a birthday celebration",
        gift: "as a special gift",
        kindergarten: "for kindergarten activities"
      };
      prompt += ` ${occasionText[occasion] || ""}`;
    }

    if (childDetails?.name) {
      prompt += ` for ${childDetails.name}`;
    }

    if (childDetails?.age) {
      prompt += `, who is ${childDetails.age} years old`;
    }

    if (childDetails?.interests) {
      prompt += `. The child loves: ${childDetails.interests}`;
    }

    if (childDetails?.knowledge) {
      prompt += `. Special achievements: ${childDetails.knowledge}`;
    }

    if (childDetails?.other) {
      prompt += `. Additional details: ${childDetails.other}`;
    }

    if (suggestions) {
      prompt += `. Musical suggestions: ${suggestions}`;
    }

    prompt += ". Make it joyful, engaging, and age-appropriate with a catchy melody.";

    const title = `Melodie pentru ${childDetails?.name || "Copil"}`;

    console.log("Generated prompt:", prompt);
    console.log("Title:", title);

    // Call Suno API to generate song
    const sunoResponse = await fetch('https://api.sunoapi.org/api/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUNO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        title: title,
        make_instrumental: false,
        model: 'chirp-v3-5',
      }),
    });

    if (!sunoResponse.ok) {
      const errorText = await sunoResponse.text();
      console.error('Suno API error:', errorText);
      throw new Error(`Suno API returned ${sunoResponse.status}: ${errorText}`);
    }

    const sunoData = await sunoResponse.json();
    console.log("Suno response:", sunoData);

    const taskIds = sunoData.task_ids;
    if (!taskIds || taskIds.length === 0) {
      throw new Error('No task IDs returned from Suno API');
    }

    // Poll for completion
    const maxAttempts = 60;
    const pollInterval = 5000; // 5 seconds
    let attempts = 0;
    const songs: Array<{ audioUrl: string; title: string }> = [];

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, pollInterval));
      attempts++;

      const statusResponse = await fetch(`https://api.sunoapi.org/api/v1/query?task_ids=${taskIds.join(',')}`, {
        headers: {
          'Authorization': `Bearer ${SUNO_API_KEY}`,
        },
      });

      if (!statusResponse.ok) {
        console.error('Status check failed:', await statusResponse.text());
        continue;
      }

      const statusData = await statusResponse.json();
      console.log(`Attempt ${attempts}:`, statusData);

      // Check all tasks for completion
      for (const task of statusData) {
        if ((task.status === 'FIRST_SUCCESS' || task.status === 'SUCCESS') && task.audio_url) {
          const existingSong = songs.find(s => s.audioUrl === task.audio_url);
          if (!existingSong) {
            songs.push({
              audioUrl: task.audio_url,
              title: task.title || title
            });
          }
        }
      }

      // If we have 2 songs (or all tasks completed), return
      if (songs.length >= 2 || songs.length === taskIds.length) {
        console.log("Songs ready:", songs);
        return new Response(
          JSON.stringify({ songs }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // If we have at least one song after timeout, return it
    if (songs.length > 0) {
      console.log("Timeout reached but returning available songs:", songs);
      return new Response(
        JSON.stringify({ songs }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    throw new Error('Song generation timed out');

  } catch (error) {
    console.error('Error in generate-song function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
