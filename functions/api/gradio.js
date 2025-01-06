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
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = ''; // To hold partial data for reconstruction

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        console.log('Received raw chunk:', chunk);

        // Append to buffer and split into lines
        buffer += chunk;
        const lines = buffer.split('\n');

        // Process all but the last line (which may be incomplete)
        buffer = lines.pop(); // Save the incomplete line back to the buffer

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const dataLine = line.replace(/^data:\s*/, '').trim();

            // Skip non-JSON entries like `event: generating`
            if (!dataLine.startsWith('[') && !dataLine.startsWith('{')) continue;

            try {
              // Validate and parse JSON
              const parsedData = JSON.parse(dataLine);
              console.log('Sending parsed data:', parsedData);

              controller.enqueue(encoder.encode(`data: ${JSON.stringify(parsedData)}\n\n`));
            } catch (err) {
              console.error('Invalid JSON skipped:', dataLine, err);
            }
          }
        }
      }

      // Process any remaining buffer data after loop exits
      if (buffer.trim() && buffer.startsWith('data:')) {
        const dataLine = buffer.replace(/^data:\s*/, '').trim();

        if (dataLine.startsWith('[') || dataLine.startsWith('{')) {
          try {
            const parsedData = JSON.parse(dataLine);
            console.log('Sending final parsed data:', parsedData);
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(parsedData)}\n\n`));
          } catch (err) {
            console.error('Final invalid JSON skipped:', dataLine, err);
          }
        }
      }

      controller.close();
    } catch (error) {
      console.error('Error processing stream:', error);
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
