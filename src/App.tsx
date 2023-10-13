import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/logo.png";
import { Input } from '@arco-design/web-react';
import "./App.css";

function App() {
  const [count] = useState(0);
  const [text, setText] = useState("");
  const TextArea = Input.TextArea;

  const askGpt = async () => {
    const stream = await window.preload.getStreamResponseFromChatGpt();
    for await (const chunk of stream) {
      console.log(chunk.choices[0].delta.content || "");
      setText((prev) => prev + chunk.choices[0].delta.content);
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={askGpt}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <TextArea value={text}></TextArea>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
