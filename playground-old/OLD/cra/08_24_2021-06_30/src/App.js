import { useEffect } from "react";
import "./App.css";
import { CanvasSpace } from "pts";

let space;
function App() {
  useEffect(() => {
    if (!space) {
      space = new CanvasSpace("#hello").setup({ bgcolor: "#fff" });
      const form = space.getForm();
      space.add({
        start: () => {},
        animate: (t, ft) => {
          form.point(space.pointer, 5);
        },
      });
      space.bindMouse().bindTouch().play();
    }
  });
  return (
    <div className="App">
      <canvas id="hello"></canvas>
    </div>
  );
}

export default App;
