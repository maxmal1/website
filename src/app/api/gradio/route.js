
import { Client } from "@gradio/client";

export async function POST(request) {
  try {
    
    const { word } = await request.json();

    const client = await Client.connect("maxmal1/wordlebot");

    const stream = client.submit("/predict", { word });

    const encoder = new TextEncoder();
    const customReadable = new ReadableStream({
      async start(controller) {
        try {
          for await (let event of stream) {
            controller.enqueue(encoder.encode(JSON.stringify(event) + '\n'));
          }
          controller.close();
        } catch (error) {
          console.error('Error in stream processing:', error);
          controller.error(error);
        }
      },
    });

    return new Response(customReadable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in Gradio API route:', error);
    return Response.json({ 
      error: error.message,
      stack: error.stack,
      details: 'Error occurred in Gradio API route'
    }, { status: 500 });
  }
}