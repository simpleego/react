import React, { useState, useMemo } from 'react';

function ExampleComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // 1. 계산 비용이 높은 함수 (시뮬레이션)
  const calculateExpensiveValue = (num) => {
    console.log('계산 중... (useMemo가 없으면 count가 아닌 다른 상태가 변해도 실행됨)');
    // 실제 복잡한 계산을 시뮬레이션하기 위해 일부러 지연시킴
    let i = 0;
    while (i < 1000000000) {
      i++;
    }
    return num * 2;
  };

  // 2. useMemo를 사용하여 값 메모이제이션
  // 의존성 배열 [count]가 변경될 때만 calculateExpensiveValue를 다시 실행하고 값을 갱신합니다.
  const memoizedValue = useMemo(() => {
    return calculateExpensiveValue(count);
  }, [count]); // 의존성 배열: count가 변경될 때만 재계산

  return (
    <div>
      <h2>useMemo 예시</h2>
      
      {/* count 상태 변경 */}
      <button onClick={() => setCount(c => c + 1)}>
        Count 증가: {count}
      </button>
      
      <p>
        **메모이제이션된 값 (Count에만 의존):** {memoizedValue}
      </p>
      <hr/>

      {/* text 상태 변경 */}
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder="텍스트 입력"
      />
      <p>
        **다른 상태 (Text) :** {text}
      </p>
      <p style={{ color: 'red' }}>
        **💡 텍스트를 입력할 때마다 컴포넌트는 리렌더링되지만, '계산 중...' 로그는 count가 증가할 때만 출력되는 것을 확인해보세요.**
      </p>
    </div>
  );
}

export default ExampleComponent;