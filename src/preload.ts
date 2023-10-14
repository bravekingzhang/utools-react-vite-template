/// <reference types="node" />

import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";

const openai = new OpenAI({
  apiKey: "pk-this-is-a-real-free-pool-token-for-everyone",
  baseURL: "https://ai.fakeopen.com/v1",
  dangerouslyAllowBrowser: true,
});

export async function getStreamResponseFromChatGpt(
  messages: Array<ChatCompletionMessageParam>,
  temperature: number
) {
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature,
    messages,
    stream: true,
  });
  return stream;
}
