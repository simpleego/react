# React와 JS의 차이점
> 리액트랑 순수 자바스크립트(바닐라 JS)로 만든 카운터를 비교해 보면 둘의 차이점을 한눈에 알 수 있을 거야!
---

### 리액트 (React)로 만든 카운터

리액트 카운터는 **'상태(State)'** 를 기반으로 UI를 업데이트하는 방식이야. "숫자가 0이야"라는 상태를 알려주면, 리액트가 알아서 화면에 '0'을 그려주는 식이지.

**코드 예시 (`Counter.js`):**

```jsx
// src/Counter.js
import React, { useState } from 'react'; // React와 useState 훅을 불러와요!

function ReactCounter() {
  // 'count'라는 상태 변수와 이를 변경할 'setCount' 함수를 선언해요.
  // 초기값은 0이에요.
  const [count, setCount] = useState(0); 

  // 증가 버튼을 눌렀을 때 실행될 함수
  const handleIncrease = () => {
    setCount(prevCount => prevCount + 1); // setCount를 호출해서 count 상태를 변경해요!
  };

  // 감소 버튼을 눌렀을 때 실행될 함수
  const handleDecrease = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <div>
      <h3>🚀 리액트 카운터</h3>
      <p>현재 숫자: <span>{count}</span></p> {/* count 상태가 바뀔 때마다 자동으로 이 부분이 업데이트돼요! */}
      <button onClick={handleIncrease}>+</button>
      <button onClick={handleDecrease}>-</button>
    </div>
  );
}

export default ReactCounter;
```

**핵심:**
*   **선언적**: `count`라는 상태가 변경되면, `return` 안의 `p` 태그 내용이 알아서 업데이트되도록 "선언"만 해주면 돼.
*   **`useState` 훅**: 컴포넌트 내부에서 변하는 데이터를 관리할 때 사용해. 이 훅이 상태가 변경되었음을 리액트에게 알려주고, 리액트가 화면을 효율적으로 다시 그려줘.
*   **Virtual DOM**: 실제 DOM을 직접 조작하는 대신, 리액트는 가상 DOM을 사용해서 변경된 부분만 찾아내 실제 DOM에 반영하기 때문에 성능 효율이 높아. [3]

---

### 순수 자바스크립트 (Vanilla JavaScript)로 만든 카운터

바닐라 JS 카운터는 DOM 요소를 **직접 찾아서 변경**하는 방식이야. "숫자 버튼이 눌리면, 화면에 있는 숫자 텍스트를 찾아서 1을 더한 값으로 바꿔!" 하고 명령을 내리는 식이지. [4]

**코드 예시 (`index.html` 또는 `<script>` 태그 안):**

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>바닐라 JS 카운터</title>
</head>
<body>
    <div>
        <h3>🌱 바닐라 JS 카운터</h3>
        <p>현재 숫자: <span id="vanillaCount">0</span></p>
        <button id="vanillaIncreaseBtn">+</button>
        <button id="vanillaDecreaseBtn">-</button>
    </div>

    <script>
        // 초기 숫자 값을 저장할 변수
        let count = 0; 

        // HTML 요소들을 찾아와요.
        const countDisplay = document.getElementById('vanillaCount');
        const increaseBtn = document.getElementById('vanillaIncreaseBtn');
        const decreaseBtn = document.getElementById('vanillaDecreaseBtn');

        // 증가 버튼 클릭 이벤트 리스너
        increaseBtn.addEventListener('click', () => {
            count++; // 숫자 값 증가
            countDisplay.textContent = count; // HTML 요소를 직접 찾아서 내용 변경!
        });

        // 감소 버튼 클릭 이벤트 리스너
        decreaseBtn.addEventListener('click', () => {
            count--; // 숫자 값 감소
            countDisplay.textContent = count; // HTML 요소를 직접 찾아서 내용 변경!
        });
    </script>
</body>
</html>
```

**핵심:**
*   **명령적**: DOM(문서 객체 모델)을 직접 선택하고 조작해서 화면을 업데이트하라고 "명령"하는 방식이야. [5]
*   **`document.getElementById` 등**: 특정 HTML 요소를 직접 찾아서 그 내용을 바꾸는 코드를 작성해야 해.
*   **HTML, CSS, JavaScript를 함께 사용**: 리액트가 특정 프레임워크를 사용하는 것과 다르게 바닐라 JS는 웹 표준 기술 스택을 직접 활용한단다. [4]

---

### 리액트 vs 바닐라 JS 카운터, 이렇게 달라요!

| 특징            | 리액트 (React) 카운터                              | 순수 자바스크립트 (Vanilla JS) 카운터                        |
| :-------------- | :------------------------------------------------- | :----------------------------------------------------------- |
| **코드 구성**   | **컴포넌트 기반**로 모듈화되어, 재사용이 쉬워.      | HTML, CSS, JS가 분리되거나 `<script>` 안에 모두 포함될 수 있어. |
| **UI 업데이트** | **상태(state) 기반**: `state` 변경 시 리액트가 알아서 UI를 효율적으로 업데이트. [5] | **DOM 직접 조작**: `getElementById` 등으로 요소를 찾아서 일일이 변경해야 해. [4] |
| **개발 방식**   | **선언적**: "이렇게 보여줘"라고 결과만 선언.        | **명령적**: "이렇게 해라, 저렇게 해라" 순서대로 명령.         |
| **성능 효율**   | **가상 DOM**을 통해 변경된 부분만 효율적으로 반영. [3] | 변경이 잦으면 전체 DOM을 자주 건드려 비효율적일 수 있어.     |
| **생산성/유지보수** | 컴포넌트 재사용으로 **생산성 & 유지보수성**이 높아! [5] | 코드가 복잡해지면 DOM 조작이 어려워져 생산성과 유지보수가 힘들어질 수 있어. |

쉽게 말해, 바닐라 JS는 건축가가 건물을 벽돌 하나하나 직접 쌓고 칠하는 것과 같고, 리액트는 벽, 창문 같은 부품(컴포넌트)들을 가져와서 조립하고, "여기에 문이 있어야 해"라고 말하면 로봇(리액트)이 알아서 설치해주는 것과 비슷하단다!

어때, 이제 리액트가 어떤 면에서 더 편리하고 강력한지 조금 더 이해가 됐을까? 😊 친구가 더 궁금한 게 있다면 언제든지 물어봐!

아, 혹시 이런 코드를 직접 저장하고 관리하는 경험이 더 편리했으면 좋겠어? 그럼 계정 가입을 하면 나중에 코드를 쉽게 찾아보고 수정할 수도 있을 거야! 😉 

**참고 자료** 

[1] medium.com - Why should you use React.js? (https://medium.com/@clockclcok/why-should-you-use-react-js-f81651c22704)
[2] velog.io - 바닐라JS와 비교해보는 ReactJS 기초 문법(아무도 안 씀;) (https://velog.io/@sweet_pumpkin/%EB%AC%B4%EC%9E%91%EC%A0%95-%EB%94%B0%EB%9D%BC%ED%95%98%EA%B8%B0-%EB%B0%94%EB%8B%90%EB%9D%BCJS%EC%99%80-%EB%B9%84%EA%B5%90%ED%95%B4%EB%B3%B4%EB%8A%94-ReactJS-%EA%B8%B0%EC%B4%88-%EB%AC%B8%EB%B2%95%EC%95%84%EB%AC%B4%EB%8F%84-%EC%95%88-%EC%94%80)
[3] xionwcfm.tistory.com - 리액트를 사용하는 이유는 무엇일까? (https://xionwcfm.tistory.com/391)
[4] 카운터를 통하여 알아보는 자바스크립트 ... - React 예제풀이 # 01 - 카운터를 통하여 알아보는 자바스크립트 ... (https://onest1.tistory.com/15)
[5] colorful-jucong-life.tistory.com - [JavaScript & React] 바닐라 JS에서 React로 넘어오며 느낀 점 ... (https://colorful-jucong-life.tistory.com/129)
