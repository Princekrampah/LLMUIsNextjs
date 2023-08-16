import { OpenAIStream, OpenAIStreamPayload } from "@/app/utils/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

export async function POST(req: Request): Promise<Response> {
  const { session_id, message, bot_name } = await req.json();

  if (!session_id || !message || !bot_name) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = { session_id, message, bot_name };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}
