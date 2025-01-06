// functions/api/gradio.js
import { Client } from "@gradio/client";

export async function onRequest(context) {
  // Set CORS and SSE headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  };

  // Handle OPTIONS request for CORS preflight
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    const { word } = await context.request.json();

    // Connect to your Gradio space
    const client = await Client.connect("maxmal1/wordlebot");

    // Get the prediction stream
    const stream = client.submit("/predict", { word });

    // Create encoder for streaming
    const encoder = new TextEncoder();

    // Create a TransformStream to handle the data
    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        controller.enqueue(encoder.encode(JSON.stringify(chunk) + '\n'));
      }
    });

    // Create a readable stream from the Gradio events
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            controller.enqueue(event);
          }
          controller.close();
        } catch (error) {
          console.error('Error in stream processing:', error);
          controller.error(error);
        }
      }
    });

    // Pipe the readable stream through the transform stream
    const streamResponse = readable.pipeThrough(transformStream);

    // Return the streaming response
    return new Response(streamResponse, { headers });

  } catch (error) {
    console.error('Error in Gradio API route:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        stack: error.stack,
        details: 'Error occurred in Gradio API route'
      }), 
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
}