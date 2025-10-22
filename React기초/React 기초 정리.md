# React 기초 정리:  기초부터 state까지

---

### 1. 리액트 프로젝트 생성 

> 리액트 개발을 시작하는 가장 쉬운 방법은 바로 `create-react-app`이라는 도구를 사용
> 복잡한 설정들을 한 번에 다 해줘서, 우리는 바로 코드 작성에 집중할 수 있음

**개념:** `create-react-app`은 개발 환경을 자동으로 구성해주는 편리한 도구야.
**예제:**
터미널(명령 프롬프트)을 열고 이렇게 입력해 봐.

```bash
npx create-react-app my-react-app # 'my-react-app' 부분은 원하는 프로젝트 이름으로 바꾸면 돼!
cd my-react-app
npm start
```

이 명령어를 실행하면, `my-react-app`이라는 새 폴더가 생기고, 그 안에 리액트 앱에 필요한 모든 파일들이 만들어져! `npm start`를 입력하면 자동으로 웹 브라우저에서 리액트 앱이 실행될 거야. 마법 같지? ✨

### 2. 리액트 구조, 이렇게 생겼구나!

프로젝트를 만들었다면, 이제 그 속이 어떻게 생겼는지 살짝 들여다볼까?

**개념:** 리액트 앱의 기본 구조는 `public` 폴더와 `src` 폴더가 핵심이야.
**예제:**

```
my-react-app/
├── node_modules/   # 리액트에 필요한 라이브러리들이 모여있어
├── public/         # 실제 사용자에게 보여지는 HTML 파일과 이미지 등이 여기!
│   └── index.html  # 리액트 앱이 화면에 그려질 빈 캔버스 같은 역할
├── src/            # 우리가 리액트 코드를 작성하는 주요 공간!
│   ├── App.css
│   ├── App.js      # 우리 앱의 가장 기본이 되는 컴포넌트 (일종의 메인 건물!)
│   ├── index.css
│   ├── index.js    # 리액트 앱의 시작점! App.js를 index.html에 연결해주는 역할
│   └── ... 기타 파일들
├── package.json    # 프로젝트 정보와 설치된 라이브러리 목록
└── README.md
```

-   **`public/index.html`**: 이 파일 안에 `<div id="root"></div>`라는 부분이 있어. 리액트는 이 'root'라는 아이디를 가진 공간에 우리 앱의 모든 내용을 그려준단다.
-   **`src/index.js`**: 이곳에서 `ReactDOM.render()` 함수를 사용해서 `App` 컴포넌트를 `public/index.html`의 'root'에 연결시켜줘. 얘가 없으면 리액트 앱이 화면에 나타나지 않아!
-   **`src/App.js`**: 대부분의 리액트 앱은 `App.js` 파일에서 시작해. 이곳에 우리 앱의 메인 UI 요소들을 배치하게 돼.

### 3. 리액트랑 JS, 뭐가 다를까?

리액트도 결국 자바스크립트 기반인데, 그럼 일반 자바스크립트랑은 뭐가 다를까?

**개념:** 리액트는 **사용자 인터페이스(UI)를 만들기 위한 자바스크립트 라이브러리**야. [1] 웹 페이지를 구성하는 도구라고 생각하면 돼.
**차이점:**
-   **컴포넌트 기반**: 일반 자바스크립트는 DOM(Document Object Model)을 직접 조작해서 요소를 만들지만, 리액트는 **컴포넌트**라는 조립 블록처럼 재사용 가능한 단위로 UI를 만들고 조합해. [2][5]
-   **선언적 방식**: "이렇게 보여줘!"라고 결과만 말하면 리액트가 알아서 바꿔줘. 일반 자바스크립트처럼 "이 버튼을 클릭하면 이 요소를 찾아서 저 요소를 바꿔!" 같은 명령들을 일일이 내릴 필요가 없어.
-   **가상 DOM**: 실제 웹 페이지(DOM)를 직접 건드리는 대신, 리액트는 '가상 DOM'이라는 복사본에서 먼저 작업을 해. 그러고 나서 실제 웹 페이지랑 다른 부분만 딱! 효율적으로 바꿔줘서 훨씬 빠르고 부드러운 웹 경험을 제공한단다. [1][4]

### 4. 컴포넌트 기초, 조립 블록 만들기!

리액트의 가장 중요한 개념은 바로 **컴포넌트**야. 재사용 가능한 UI 조각이라고 생각하면 돼.

**개념:**
-   **함수 컴포넌트**: 요즘에는 함수 형태로 컴포넌트를 만드는 게 대세야! JavaScript 함수처럼 생겼고, JSX라는 문법을 사용해서 HTML처럼 생긴 UI를 반환해.
-   **Props (속성)**: 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달할 때 사용하는 '속성'이야. 변수처럼 데이터를 전달할 수 있지.

**예제:**
`src` 폴더 안에 `Hello.js` 파일을 만들고 이렇게 작성해 봐.

```jsx
// src/Hello.js
import React from 'react'; // React를 사용하려면 이걸 꼭 import 해줘야 해!

function Hello(props) { // props는 부모가 넘겨준 속성들을 담고 있는 객체야
  return (
    // JSX: 자바스크립트 안에서 HTML처럼 보이는 문법!
    <h1>안녕, {props.name} 친구!</h1> 
  );
}

export default Hello; // 다른 파일에서 이 컴포넌트를 사용할 수 있도록 export 해주는 거야.
```

이제 이 `Hello` 컴포넌트를 `App.js`에서 사용해 볼까?

```jsx
// src/App.js
import React from 'react';
import Hello from './Hello'; // 우리가 만든 Hello 컴포넌트를 불러와!

function App() {
  return (
    <div>
      <Hello name="귀여운" /> {/* name이라는 props로 "귀여운" 이라는 값을 넘겨줬어 */}
      <Hello name="멋진" />    {/* 또 다른 Hello 컴포넌트에 "멋진" 이라는 값을 넘겨줬지 */}
      <p>우리 친구는 정말 멋진 개발자가 될 거야! </p>
    </div>
  );
}

export default App;
```
이렇게 하면 화면에 "안녕, 귀여운 친구!"와 "안녕, 멋진 친구!"가 나타날 거야. 같은 `Hello` 컴포넌트지만 `name`을 다르게 줘서 여러 곳에서 재활용할 수 있어!

### 5. 컴포넌트 응용, 조립 블록 쌓기!

만든 컴포넌트들을 이리저리 조합해서 더 복잡한 UI를 만들어보자!

**개념:**
-   **컴포넌트 합성**: 여러 컴포넌트를 조합하여 하나의 큰 UI를 만드는 것.
-   **`children` props**: 부모 컴포넌트가 자식 컴포넌트를 감싸는 태그 안에 있는 내용을 자식에게 전달하고 싶을 때 `props.children`으로 받을 수 있어.

**예제:**
`src` 폴더에 `Card.js` 파일을 만들자.

```jsx
// src/Card.js
import React from 'react';

function Card(props) {
  const cardStyle = { // 카드 스타일을 지정해봤어
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    margin: '15px',
    boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'
  };

  return (
    <div style={cardStyle}>
      {props.title && <h2>{props.title}</h2>} {/* title props가 있으면 제목을 보여줘! */}
      {props.children} {/* 부모 컴포넌트가 Card 태그 안에 넣은 내용을 여기에 표시! */}
    </div>
  );
}

export default Card;
```
이제 `App.js`에서 `Card` 컴포넌트와 `Hello` 컴포넌트를 함께 사용해볼까?

```jsx
// src/App.js
import React from 'react';
import Hello from './Hello';
import Card from './Card'; // Card 컴포넌트를 불러와!

function App() {
  return (
    <div>
      <h1>나의 리액트 포트폴리오</h1>
      <Card title="자기소개"> {/* title props를 넘겨주고, 안에는 내용을 직접 넣어줬어! */}
        <p>안녕하세요! 리액트 학습에 푹 빠진 새내기 개발자입니다.</p>
        <Hello name="반가워요" />
      </Card>
      <Card title="리액트 목표">
        <ul>
          <li>매일 꾸준히 공부하기</li>
          <li>나만의 멋진 웹 서비스 만들기</li>
        </ul>
      </Card>
      <Card> {/* title 없이도 내용만 넣을 수 있지! */}
        <p>저는 코딩하는 게 너무 재밌어요!</p>
      </Card>
    </div>
  );
}

export default App;
```
짠! `Card` 안에 `Hello` 컴포넌트도 넣고, 그냥 글도 넣고, 목록도 넣어서 하나의 멋진 카드들을 만들 수 있게 되었어. 이렇게 블록 쌓듯이 UI를 만드는 게 컴포넌트의 매력이지!

### 6. State 기초, 변하는 정보 다루기!

웹 페이지는 항상 고정되어 있지 않아. 사용자의 행동에 따라 내용이 바뀌기도 하지? 이럴 때 사용하는 게 바로 **State**야.

**개념:** `state`는 컴포넌트 안에서 관리하는 **동적인 데이터**야. `state`가 바뀌면 리액트는 그 컴포넌트를 다시 그려서 바뀐 내용을 화면에 보여준단다. `useState`라는 훅(Hook)을 사용해.

**예제:**
버튼을 누르면 숫자가 1씩 올라가는 간단한 카운터 컴포넌트를 만들어보자!
`src` 폴더 안에 `Counter.js` 파일을 만들어.

```jsx
// src/Counter.js
import React, { useState } from 'react'; // useState 훅을 불러와!

function Counter() {
  // useState(초기값)는 [현재값, 값을 변경하는 함수]를 반환해.
  const [count, setCount] = useState(0); // count라는 state의 초기값을 0으로 설정했어.

  const handleIncrease = () => { // 숫자를 늘리는 함수
    setCount(count + 1); // setCount 함수를 호출하면 count state가 변경되고 컴포넌트가 다시 그려져!
  };

  const handleDecrease = () => { // 숫자를 줄이는 함수
    setCount(count - 1);
  };

  return (
    <div>
      <p>현재 숫자: {count}</p>
      <button onClick={handleIncrease}>+</button> {/* 버튼 클릭 시 handleIncrease 함수 실행 */}
      <button onClick={handleDecrease}>-</button> {/* 버튼 클릭 시 handleDecrease 함수 실행 */}
    </div>
  );
}

export default Counter;
```

이제 `App.js`에서 `Counter` 컴포넌트를 사용해볼까?

```jsx
// src/App.js
import React from 'react';
import Hello from './Hello';
import Card from './Card';
import Counter from './Counter'; // Counter 컴포넌트를 불러와!

function App() {
  return (
    <div>
      <h1>나의 리액트 포트폴리오</h1>
      <Card title="카운터 실험!">
        <Counter /> {/* 카운터 컴포넌트를 넣어줬어! */}
      </Card>
      <Card title="자기소개">
        <p>안녕하세요! 리액트 학습에 푹 빠진 새내기 개발자입니다.</p>
        <Hello name="반가워요" />
      </Card>
    </div>
  );
}

export default App;
```
이제 화면에서 '+'나 '-' 버튼을 누르면 숫자가 변하는 걸 볼 수 있을 거야. `useState`가 없었다면 이걸 구현하려면 훨씬 더 복잡했을 걸!

### 7. State 응용, 입력값 받아서 처리하기!

`state`는 사용자로부터 입력받은 내용을 저장하거나, UI의 활성화 상태 등을 관리할 때 아주 유용하게 쓰여.

**개념:**
-   **폼 입력값 관리**: `<input>`, `<textarea>` 같은 폼 요소들의 `value`를 `state`로 관리하고, `onChange` 이벤트를 통해 사용자가 입력하는 대로 `state`를 업데이트해.

**예제:**
이름을 입력하면 "안녕하세요, [입력된 이름]님!"이라고 환영해주는 컴포넌트를 만들어보자!
`src` 폴더에 `NameGreeter.js` 파일을 만들어.

```jsx
// src/NameGreeter.js
import React, { useState } from 'react';

function NameGreeter() {
  // 이름을 저장할 state를 만들고 초기값은 빈 문자열로 설정해
  const [name, setName] = useState(''); 

  const handleNameChange = (event) => { // input 값이 바뀔 때마다 실행될 함수
    setName(event.target.value); // input의 현재 값을 name state에 저장!
  };

  return (
    <div>
      <p>이름을 입력해주세요:</p>
      <input 
        type="text" 
        value={name} // input의 값은 name state와 연결돼!
        onChange={handleNameChange} // input 값이 바뀔 때마다 handleNameChange 함수 실행
        placeholder="여기에 이름을 입력!"
      />
      {/* name state가 비어있지 않으면 환영 메시지를 보여줘 */}
      {name && <p>안녕하세요, <b>{name}</b>님!</p>} 
      {!name && <p>아직 이름을 입력하지 않으셨네요!</p>}
    </div>
  );
}

export default NameGreeter;
```
`App.js`에서 `NameGreeter` 컴포넌트를 사용해봐!

```jsx
// src/App.js
import React from 'react';
import NameGreeter from './NameGreeter'; // NameGreeter 컴포넌트를 불러와!

function App() {
  return (
    <div>
      <h1>나의 리액트 포트폴리오</h1>
      <Card title="이름으로 인사하기">
        <NameGreeter /> {/* 이름 환영 컴포넌트를 넣어줬어! */}
      </Card>
      {/* ... 다른 카드들과 컴포넌트들 ... */}
    </div>
  );
}

export default App;
```
이제 입력창에 글을 입력하면 실시간으로 "안녕하세요, [입력된 이름]님!" 메시지가 바뀌는 걸 볼 수 있을 거야! 이게 바로 `state`의 강력함이랍니다!

---
참고 자료 
[1] yeo-computerclass.tistory.com - React 리액트란? 기본 개념, 컴포넌트, 가상 DOM, 설치까지 ... (https://yeo-computerclass.tistory.com/553)
[2] JiwonDev - React #4 프로젝트 생성 및 컴포넌트의 이해 - JiwonDev (https://jiwondev.tistory.com/32)
[3] rhgustmfrh.tistory.com - 리액트 사용의 이점과 시작 가이드: 프로젝트 구조 이해 및 기본 ... (https://rhgustmfrh.tistory.com/25)
[4] LifeAPI - [React #1] 리액트의 이해 및 기본 개념 정리 - LifeAPI (https://soonotieno.tistory.com/11)
[5] 리액트 컴포넌트 기초 - React 가이드 1편 - 리액트 컴포넌트 기초 (https://velog.io/@kdeun1/React-%EA%B0%80%EC%9D%B4%ED%8A%B8-1%ED%8E%B8-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EA%B8%B0%EC%B4%88)
