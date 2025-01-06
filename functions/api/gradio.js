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
