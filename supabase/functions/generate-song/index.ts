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
    let prompt = "";
    
    if (musicType === "children") {
      prompt = `Create a personalized children's song`;
    } else if (musicType === "love") {
      prompt = `Create a romantic love song`;
    } else if (musicType === "trap") {
      prompt = `Create a personalized trap/manele song`;
    }
    
    if (occasion) {
      const occasionText: Record<string, string> = {
        birthday: "for a birthday celebration",
        gift: "as a special gift",
        kindergarten: "for kindergarten activities",
        anniversary: "for an anniversary celebration",
        proposal: "for a marriage proposal",
        wedding: "for a wedding celebration",
        party: "for a party",
        club: "for the club",
        dedication: "as a dedication"
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

    // Determine style based on music type and occasion
    let style = "children's music, playful, joyful, upbeat";
    if (musicType === "children") {
      if (occasion === "birthday") {
        style = "children's birthday song, cheerful, celebratory, fun";
      } else if (occasion === "kindergarten") {
        style = "educational children's song, learning, engaging, playful";
      } else {
        style = "children's music, sweet, heartwarming, melodic";
      }
    } else if (musicType === "love") {
      if (occasion === "anniversary") {
        style = "romantic ballad, love song, emotional, heartfelt";
      } else if (occasion === "proposal") {
        style = "romantic proposal song, passionate, dreamy, special";
      } else {
        style = "love song, romantic, tender, meaningful";
      }
    } else if (musicType === "trap") {
      if (occasion === "party") {
        style = "manele party, upbeat, energetic, celebratory, romanian manele";
      } else if (occasion === "club") {
        style = "trap beat, club music, bass-heavy, modern, energetic";
      } else {
        style = "manele, romanian trap, emotional, dedication, modern";
      }
    }

    // Call Suno API to generate song
    const sunoResponse = await fetch('https://api.sunoapi.org/api/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUNO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customMode: true,
        instrumental: false,
        model: 'V3_5',
        prompt: prompt,
        style: style,
        title: title,
        callBackUrl: 'https://example.com/callback',
      }),
    });

    if (!sunoResponse.ok) {
      const errorText = await sunoResponse.text();
      console.error('Suno API error:', errorText);
      throw new Error(`Suno API returned ${sunoResponse.status}: ${errorText}`);
    }

    const sunoData = await sunoResponse.json();
    console.log("Suno response:", sunoData);

    const taskIds: string[] = [];

    // New API response shape: { code, msg, data: { taskId } }
    if (sunoData?.data?.taskId) {
      taskIds.push(sunoData.data.taskId);
    } else if (Array.isArray(sunoData?.data)) {
      for (const item of sunoData.data) {
        if (item?.taskId) taskIds.push(item.taskId);
      }
    } else if (Array.isArray(sunoData?.task_ids)) {
      // Backward compatibility with older API shape
      taskIds.push(...sunoData.task_ids);
    }

    if (taskIds.length === 0) {
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

      const statusResponse = await fetch(
        `https://api.sunoapi.org/api/v1/generate/record-info?taskId=${encodeURIComponent(taskIds[0])}`,
        {
          headers: {
            'Authorization': `Bearer ${SUNO_API_KEY}`,
          },
        }
      );

      if (!statusResponse.ok) {
        console.error('Status check failed:', await statusResponse.text());
        continue;
      }

      const statusData = await statusResponse.json();
      console.log(`Attempt ${attempts}:`, statusData);

      // Extract songs from new Suno API response shape first (data.response.sunoData)
      const responseSongs = Array.isArray(statusData?.data?.response?.sunoData)
        ? statusData.data.response.sunoData
        : [];

      if (responseSongs.length > 0) {
        for (const song of responseSongs) {
          const audioUrl =
            song.audioUrl ??
            song.audio_url ??
            song.streamAudioUrl ??
            song.stream_audio_url;
          const songTitle =
            song.title ??
            song.song_name ??
            song.name ??
            title;

          if (audioUrl) {
            const existingSong = songs.find((s) => s.audioUrl === audioUrl);
            if (!existingSong) {
              songs.push({
                audioUrl,
                title: songTitle,
              });
            }
          }
        }
      } else {
        // Fallback: normalize possible response shapes into a flat array of task objects
        const tasks: any[] = Array.isArray(statusData)
          ? statusData
          : Array.isArray(statusData?.data)
            ? statusData.data
            : Array.isArray(statusData?.records)
              ? statusData.records
              : Array.isArray(statusData?.data?.records)
                ? statusData.data.records
                : statusData?.data
                  ? [statusData.data]
                  : [];

        // Check all tasks for completion
        for (const task of tasks) {
          const status = task.status ?? task.state;
          const taskSongs = Array.isArray(task.sunoData)
            ? task.sunoData
            : Array.isArray(task.response?.sunoData)
              ? task.response.sunoData
              : [task];

          if (status === 'FIRST_SUCCESS' || status === 'SUCCESS') {
            for (const song of taskSongs) {
              const audioUrl =
                song.audioUrl ??
                song.audio_url ??
                song.streamAudioUrl ??
                song.stream_audio_url;
              const songTitle =
                song.title ??
                song.song_name ??
                song.name ??
                title;

              if (audioUrl) {
                const existingSong = songs.find((s) => s.audioUrl === audioUrl);
                if (!existingSong) {
                  songs.push({
                    audioUrl,
                    title: songTitle,
                  });
                }
              }
            }
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
