/// <reference types="vite/client" />

import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";
declare module "utools-api" {
  import utools from "utools-api-types";
  export = utools;
}
declare module "openai" {
  import openai from "openai";
  export = openai;
}
declare global {
  interface Window {
    preload: {
      getStreamResponseFromChatGpt(
        message: Array<ChatCompletionMessageParam>,
        temperature: number
      ): Promise;
    };
  }
}
