import { useCallback, useState } from "react";
import Box from "./Box";
import "./App.css";

function App() {
  const [size, setSizes] = useState(50);
  // step 2:
  const [isDark, setIsDark] = useState(false);

  // const createBoxStyle = ()=> {
  //   return {
  //     backgroundColor: 'pink',
  //     width: `${size}px`,
  //     height: `${size}px`,
  //   };
  // };

  // step 2:
  // createBoxStyle 함수를 userCallback 함수의 매개변수로 처리
  // size가 변경될 경우에만 호출되도록 한다.
  // 컴포넌트가 호출될때 무조건 호출되지 않고 설정된 값이 변경되는 경우에만
  // 호출되도록 처리한다.
  const createBoxStyle = useCallback( () => {
    return {
      backgroundColor: "pink",
      width: `${size}px`,
      height: `${size}px`,
    };
  },[size]);

  return (
    <div style={{ background: isDark ? "black" : "white" }}>
      <input
        type="number"
        step={10}
        min={100}
        max={500}
        value={size}
        onChange={(e) => setSizes(e.target.value)}
      />
      <button onClick={() => setIsDark(!isDark)}>Change Theme</button>
      <Box createBoxStyle={createBoxStyle} />
    </div>
  );
}

export default App;