# TodoApp03  
>이번 단계에서는 다음 기능들을 추가
---

### ✅ 목표 기능

1. **실제 API에 POST 요청을 보내는 기능** (새로운 Todo 추가 시 서버에 전송)
2. **삭제 기능 추가**
3. **완료된 항목 필터링**
4. **스타일 개선 (Tailwind CSS 적용)**

---

## 📦 1. 프로젝트 설정

먼저 Tailwind CSS를 프로젝트에 설치해야 합니다.

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

`tailwind.config.js` 파일을 열고 다음과 같이 수정합니다:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

`src/index.css` 파일을 다음과 같이 수정합니다:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

그리고 `index.js`에서 이 CSS를 import합니다:

```js
import './index.css';
```

---

## 🧩 2. `TodoList.js` 전체 코드

```jsx
import React, { useEffect, useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, active

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => res.json())
      .then(data => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() === '') return;

    const newItem = {
      userId: 1,
      title: newTodo,
      completed: false,
    };

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const data = await res.json();
      setTodos(prev => [data, ...prev]);
      setNewTodo('');
    } catch (error) {
      console.error('추가 실패:', error);
    }
  };

  const toggleComplete = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  if (loading) return <p className="text-gray-500">로딩 중...</p>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">📋 Todo 목록</h2>

      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="새로운 할 일 입력"
          className="flex-grow border border-gray-300 rounded-l px-3 py-2"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          추가
        </button>
      </div>

      <div className="flex justify-between mb-4">
        <button onClick={() => setFilter('all')} className="text-sm text-blue-600">전체</button>
        <button onClick={() => setFilter('active')} className="text-sm text-blue-600">할 일</button>
        <button onClick={() => setFilter('completed')} className="text-sm text-blue-600">완료됨</button>
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center justify-between border-b py-2"
          >
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              <span className={todo.completed ? 'line-through text-gray-400' : ''}>
                {todo.title}
              </span>
            </label>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
```

---

## 🎨 스타일 미리보기

Tailwind CSS를 적용했기 때문에, 앱은 다음과 같은 스타일을 가집니다:

- 깔끔한 카드 형태의 Todo 목록
- 입력창과 버튼이 나란히 배치
- 필터 버튼으로 전체 / 할 일 / 완료됨 보기 전환
- 체크박스로 완료 표시
- 삭제 버튼으로 항목 제거

---

## ✅ 다음 단계 제안

- 로컬 스토리지에 저장하여 새로고침해도 유지되도록 하기
- Todo 항목 수정 기능 추가
- 날짜/시간 추가
- 애니메이션 효과 추가

---

필요하시면 이 프로젝트를 zip 파일로 만들어 드릴 수 있어요. 또는 GitHub에 업로드하는 방법도 도와드릴 수 있습니다. 어떤 방식이 좋으신가요? 😊
