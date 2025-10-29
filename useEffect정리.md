# useEffect정리
## React useEffect의 3가지 사용법 💯

React의 `useEffect` 훅은 컴포넌트의 **생명주기(Lifecycle)** 와 관련된 부수 효과(Side Effects)를 처리하기 위해 사용됩니다. 
쉽게 말해, 렌더링 이후에 비동기 통신, DOM 조작, 구독(Subscription) 등과 같은 작업을 수행할 때 필요합니다. `useEffect`는 두 번째 인자인 \*\*의존성 배열(Dependency Array)\*\*을 어떻게 설정하느냐에 따라 세 가지 주요한 방식으로 동작합니다.

-----

### 1\. 렌더링될 때마다 실행 (의존성 배열 생략)

`useEffect`의 두 번째 인자인 의존성 배열을 생략하면, 컴포넌트가 **렌더링될 때마다** `useEffect`에 전달된 콜백 함수가 실행됩니다. 이는 컴포넌트가 처음 마운트될 때와 리렌더링될 때 모두 포함됩니다.

**사용 사례:**

  * 렌더링될 때마다 특정 값을 기록(log)하거나, 항상 최신 상태를 반영해야 하는 간단한 DOM 조작에 사용될 수 있습니다. 하지만 불필요한 재실행으로 인해 성능 문제를 일으킬 수 있어 주의해야 합니다.

**코드 예시:**

```javascript
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // 의존성 배열이 없으므로 렌더링될 때마다 실행됩니다.
  useEffect(() => {
    console.log(`컴포넌트가 렌더링되었습니다. 현재 값: ${count}`);
  });

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```

위 예시에서는 `count` 상태가 변경되어 리렌더링될 때마다 콘솔에 메시지가 출력됩니다.

-----

### 2\. 처음 한 번만 실행 (빈 의존성 배열 `[]`)

`useEffect`의 두 번째 인자로 \*\*빈 배열(`[]`)\*\*을 전달하면, 콜백 함수는 컴포넌트가 **처음 렌더링(마운트)될 때 단 한 번만** 실행됩니다. 리렌더링될 때는 실행되지 않습니다.

**사용 사례:**

  * **API 데이터 요청**: 컴포넌트가 처음 나타날 때 외부 데이터를 한 번만 가져올 경우
  * **이벤트 리스너 등록**: `window`나 `document`에 이벤트 리스너를 한 번만 등록할 경우
  * **타이머 설정**: `setTimeout`이나 `setInterval`을 한 번만 설정할 경우

**코드 예시:**

```javascript
import React, { useState, useEffect } from 'react';

function UserData() {
  const [user, setUser] = useState(null);

  // 빈 배열을 전달하여 처음 한 번만 실행됩니다.
  useEffect(() => {
    console.log('데이터를 가져옵니다...');
    fetch('https://api.example.com/user/1')
      .then(response => response.json())
      .then(data => setUser(data));
  }, []); // 빈 배열

  return (
    <div>
      {user ? <p>이름: {user.name}</p> : <p>로딩 중...</p>}
    </div>
  );
}
```

-----

### 3\. 특정 값이 변경될 때만 실행 (의존성 배열에 값 추가 `[value]`)

`useEffect`의 두 번째 인자인 **의존성 배열에 특정 값(state, props 등)을 넣으면**, 해당 값이 변경될 때만 콜백 함수가 실행됩니다. 컴포넌트가 처음 마운트될 때도 한 번 실행됩니다.

**사용 사례:**

  * 특정 `props`나 `state`가 변경될 때마다 관련 데이터를 새로 가져와야 할 경우
  * 특정 상태값에 따라 DOM을 업데이트하거나 다른 상태를 변경해야 할 경우

**코드 예시:**

```javascript
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // userId가 변경될 때마다 실행됩니다.
  useEffect(() => {
    console.log(`${userId} 사용자의 데이터를 가져옵니다.`);
    fetch(`https://api.example.com/users/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data));
  }, [userId]); // userId를 의존성 배열에 추가

  return (
    <div>
      {user ? <p>이름: {user.name}</p> : <p>로딩 중...</p>}
    </div>
  );
}
```

이 예시에서는 부모 컴포넌트로부터 받는 `userId`라는 `props`가 변경될 때마다 새로운 사용자 정보를 불러오는 API를 호출합니다.
