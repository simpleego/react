import React, { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {

  // 컴포넌트가 초기화 될 때 함수컴포넌트 안에 존재하는
  // 모든 객체, 변수 등은 초기화된다.
  // 따라서 useState에 관리되는 변수가 변경되고-> 변경된 값을
  // 화면에 보여주기 위해서 화면이 렌더링 되기 위해서
  // 함수 컴포넌트를 호출하여 관련된 데이터 값과 화면을 다시 
  // 렌더링 하게 된다.
  const [number, setNumber] = useState(0);

  // step: 2
  const [toggle, setToggle] = useState(true);

  // 함수 객체는 주소를 갖고 있고
  // 컴포넌트 함수가 호출되면 함수 객체도 새로운 주소에
  // 객체를 생성하고 생성된 주소를 갖게 된다.

  // function someFunction() {
  //   alert(`The number is: ${number}`);
  // }

  // number값을 메모함으로 변경된 값을 출력하지 않음
  // 따라서 2번째 매개변수 배열에 값이 변경되면 메모된 값이
  // 아닌 변경된 값을 참조하도록 한다.
  const someFunction = useCallback(()=>{
    console.log(`someFunction: number: ${number}`);
    return;
  },[number]);

  useEffect(() => {
    //console.log(`someFunction: number: ${number}`);
    console.log(`someFunction이 변경되었습니다.`);
  }, [someFunction]);

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={()=>setToggle(!toggle)}>{toggle.toString()}</button>
      <button onClick={someFunction}>Call someFunction</button>
    </div>
  );
}

export default App;
