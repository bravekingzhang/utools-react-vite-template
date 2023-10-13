/// <reference types="node" />

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "pk-this-is-a-real-free-pool-token-for-everyone",
  baseURL: "https://ai.fakeopen.com/v1",
  dangerouslyAllowBrowser: true,
});

export async function getStreamResponseFromChatGpt() {
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "你是一个前端研发工程师，你会编写优秀的程序1",
      },
      { role: "user", content: "请你帮我写一个快速排序" },
    ],
    stream: true,
  });
  return stream;
}
