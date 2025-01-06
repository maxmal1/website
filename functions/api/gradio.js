export async function onRequest(context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    const { word } = await context.request.json();
    console.log('Processing word:', word);

    // Step 1: Send POST request to get event_id
    const postResponse = await fetch('https://maxmal1-wordlebot.hf.space/gradio_api/call/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [word],
        event_data: null,
      }),
    });

    if (!postResponse.ok) {
      const errorText = await postResponse.text();
      throw new Error(`Gradio API POST error: ${errorText}`);
    }

    const { event_id } = await postResponse.json();
    console.log('Received event_id:', event_id);

    if (!event_id) {
      throw new Error('No event_id received from Gradio API');
    }

    // Step 2: Use event_id to poll the result
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          const getResponse = await fetch(`https://maxmal1-wordlebot.hf.space/gradio_api/call/predict/${event_id}`, {
            method: 'GET',
          });

          if (!getResponse.ok) {
            const errorText = await getResponse.text();
            throw new Error(`Gradio API GET error: ${errorText}`);
          }

          const reader = getResponse.body.getReader();
          const decoder = new TextDecoder();

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            console.log('Received chunk:', chunk);

            // Filter and parse valid JSON chunks
            const validData = chunk
              .split('\n')
              .filter((line) => line.startsWith('data:') && line.trim().length > 5) // Skip non-data lines and short lines
              .map((line) => line.replace(/^data:\s*/, '').trim()) // Remove the `data:` prefix
              .filter((json) => {
                try {
                  JSON.parse(json); // Validate JSON
                  return true;
                } catch {
                  return false;
                }
              });

            // Send valid JSON chunks to the client
            for (const data of validData) {
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }

          controller.close();
        } catch (error) {
          console.error('Error reading Gradio API result:', error);
          controller.error(error);
        }
      },
    });

    return new Response(readable, { headers });
  } catch (error) {
    console.error('Error in Gradio API route:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        details: 'Error occurred in Gradio API route',
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
}
