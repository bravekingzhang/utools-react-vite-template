/// <reference types="vite/client" />
declare module "utools-api" {
  import utools from "utools-api-types";
  export = utools;
}

interface Window {
  preload: {
    // 增加一个异步function 的定义
    getStreamResponseFromChatGpt(): Promise;
  };
}
