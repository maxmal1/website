export async function onRequest(context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    const { word } = await context.request.json();
    console.log('Submitting word:', word);

    // First request to submit the word and get event_id
    const response = await fetch('https://maxmal1-wordlebot.hf.space/gradio_api/call/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: [word],
        event_data: null
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gradio API error: ${errorText}`);
    }

    const { event_id } = await response.json();
    console.log('Received event_id:', event_id);

    // Now use the event_id to fetch the results in chunks
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          // Poll the event_id to get the results
          const resultResponse = await fetch(`https://maxmal1-wordlebot.hf.space/gradio_api/call/predict/${event_id}`);

          if (!resultResponse.ok) {
            throw new Error('Failed to fetch results');
          }

          const reader = resultResponse.body.getReader();
          const decoder = new TextDecoder();
          let buffer = ''; // To accumulate data chunks

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            console.log('Received chunk:', chunk);

            // Accumulate data in the buffer and process when full lines are available
            buffer += chunk;
            const lines = buffer.split('\n');
            buffer = lines.pop(); // Save incomplete line back to the buffer

            for (const line of lines) {
              if (line.startsWith('data:')) {
                const dataLine = line.replace(/^data:\s*/, '').trim();
                try {
                  const parsedData = JSON.parse(dataLine);
                  console.log('Sending parsed data:', parsedData);
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(parsedData)}\n\n`));
                } catch (err) {
                  console.error('Invalid JSON skipped:', dataLine, err);
                }
              }
            }
          }

          // Process any remaining buffer data
          if (buffer.trim()) {
            try {
              const parsedData = JSON.parse(buffer);
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(parsedData)}\n\n`));
            } catch (err) {
              console.error('Final invalid JSON skipped:', buffer, err);
            }
          }

          controller.close();
        } catch (error) {
          console.error('Error processing result stream:', error);
          controller.error(error);
        }
      }
    });

    return new Response(readable, { headers });

  } catch (error) {
    console.error('Error in Gradio API route:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        details: 'Error occurred in Gradio API route'
      }), 
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
}
