// /api/chat
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream,StreamingTextResponse  } from "ai";

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    });
const openai = new OpenAIApi(config)

export async function POST(req:Request) {
     // Extract the `messages` from the body of the request
  const { messages } = await req.json()

    // Generate a chat response using the GPT model
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo', // Choose the model
        messages,
        stream: true, // Enable streaming for real-time updates
      });

     // Convert the response into a friendly text-stream
    const stream =  OpenAIStream(response)
    // Respond with the stream
    return new StreamingTextResponse(stream)

}