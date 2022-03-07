import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import "./App.css";

const Counter = styled.div`
  font-family: monospace;
`;

let previous;
function App() {
  const [n, setN] = useState(100);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    previous = el.innerText || 0;

    const up = n > previous;
    const diff = Math.abs(n - previous);
    const maxFrames = 75;
    const power = 5;
    const frames = diff < maxFrames ? diff : maxFrames;

    const nums = [];
    for (let i = 0; i < frames; i++) {
      const next = up ? n - (frames - i) : n + (frames - i);
      nums.push(up ? next + 1 : next - 1);
    }

    nums.forEach((v, idx) => {
      setTimeout(() => {
        el.textContent = v;
      }, idx * power);
    });
  }, [n, ref]);

  return (
    <div className="App">
      <header className="App-header">
        <Counter ref={ref}></Counter>
        <input type="button" onClick={() => setN(n + 131)} value="increment" />
        <input type="button" onClick={() => setN(n - 73)} value="decrease" />
      </header>
    </div>
  );
}

export default App;
