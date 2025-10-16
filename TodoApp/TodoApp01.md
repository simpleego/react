# 할일 앱 만들기
> **React로 간단한 Todo 목록 출력 앱**을 만드는 1단계 

---

### ✅ 목표
- `https://jsonplaceholder.typicode.com/todos` API에서 데이터를 가져와서
- Todo 목록을 화면에 출력하는 React 앱을 만든다.

---

### 📁 프로젝트 구조
```
todo-app/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── TodoList.js
│   └── index.js
├── package.json
```

---

### 1️⃣ `App.js`

```jsx
import React from 'react';
import TodoList from './TodoList';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Todo 목록</h1>
      <TodoList />
    </div>
  );
}

export default App;
```

---

### 2️⃣ `TodoList.js`

```jsx
import React, { useEffect, useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10') // 10개만 가져오기
      .then(response => response.json())
      .then(data => {
        setTodos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('데이터 가져오기 실패:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>로딩 중...</p>;

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
```

---

### 3️⃣ `index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

---

### 4️⃣ 설치 및 실행 방법

```bash
npx create-react-app todo-app
cd todo-app
# 위의 파일들로 교체한 후
npm start
```

---

이제 브라우저에서 `http://localhost:3000`으로 접속하면 JSONPlaceholder에서 가져온 Todo 목록이 출력됩니다!

---

다음 단계로는:
- 체크박스를 추가해서 완료 여부를 표시하거나
- 새로운 Todo를 추가하는 기능을 넣을 수 있어요.

원하시면 다음 단계도 도와드릴게요! 😊  
혹시 코드 파일로 받아보고 싶으신가요?
