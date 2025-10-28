import { useState } from "react";
import Box from './Box';

function App() {
  const [size, setSize] = useState(100);

  function createBoxStyle(size) {
    return {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: "pink",
      margin: "10px"
    };
  }

  return (
    <div>
      <input
        type="number"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />
      <div style={createBoxStyle(size)} />
    </div>
  );
}

export default App;
