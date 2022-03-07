import { useEffect, useRef } from "react";
import styled from "styled-components";
import * as d3 from "d3";

let data = [];

for (let i = 0; i < 30; i++) {
  data.push(Math.random());
}

data = data.sort((a, b) => a < b);
console.log(data);

const Wrapper = styled.div`
  circle {
  }
`;

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

function App() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref?.current;
    if (el) {
      const svg = d3
        .select("svg")
        .attr("width", WIDTH)
        .attr("height", HEIGHT * 5);

      const s = d3
        .scaleLinear()
        .domain([data[data.length - 1], data[0]])
        .range([1, 0]);

      const rSize = d3.scaleLinear().domain([0, 1]).range([0, 100]);
      const colSize = 200;
      const rowSize = 200;

      const totalColumns = Math.floor(WIDTH / colSize);
      let currentRow = 0;

      svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("fill", (d) => d3.interpolateSpectral(s(d)))
        .attr("r", (d) => rSize(d))
        .attr("cx", (d, idx) => {
          const col = idx % totalColumns;
          return col * colSize;
        })
        .attr("cy", (d, idx) => {
          if (idx % totalColumns === 0) {
            currentRow += rowSize;
          }

          return currentRow;
        });
    }
  }, [ref]);

  return (
    <Wrapper ref={ref}>
      <svg></svg>
    </Wrapper>
  );
}

export default App;
