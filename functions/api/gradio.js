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
    console.log('Processing word:', word);

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

    const encoder = new TextEncoder();
    let resultSent = false;

    const readable = new ReadableStream({
      async start(controller) {
        try {
          const data = await response.json();
          if (data && !resultSent) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
            resultSent = true;
          }
          controller.close();
        } catch (error) {
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