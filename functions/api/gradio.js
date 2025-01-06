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

    // Instead of using @gradio/client, we'll make direct fetch calls to the Gradio API
    const response = await fetch('https://maxmal1-wordlebot.hf.space/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: [word],
        event_data: null,
        fn_index: 0
      })
    });

    if (!response.ok) {
      throw new Error(`Gradio API responded with status: ${response.status}`);
    }

    // Create a transform stream to format the response
    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        const encoder = new TextEncoder();
        controller.enqueue(encoder.encode(JSON.stringify(chunk) + '\n'));
      }
    });

    return new Response(response.body?.pipeThrough(transformStream), { headers });

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