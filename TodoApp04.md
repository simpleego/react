# TodoApp04
>  이번 단계에서는 다음 기능들을 React Todo 앱에 추가

---

## ✅ 추가할 기능 요약

1. **로컬 스토리지 저장**: 새로고침해도 Todo 목록 유지
2. **Todo 항목 수정 기능**
3. **날짜/시간 추가**: Todo 생성 시 타임스탬프 표시
4. **애니메이션 효과**: 항목 추가/삭제 시 부드러운 전환

---

## 🧩 업데이트된 `TodoList.js` 코드

```jsx
import React, { useEffect, useState } from 'react';
import './TodoList.css'; // 애니메이션용 CSS

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // ✅ 로컬 스토리지에서 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    } else {
      fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then(res => res.json())
        .then(data => {
          const withDate = data.map(todo => ({
            ...todo,
            createdAt: new Date().toISOString(),
          }));
          setTodos(withDate);
        });
    }
  }, []);

  // ✅ 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = async () => {
    if (newTodo.trim() === '') return;

    const newItem = {
      userId: 1,
      title: newTodo,
      completed: false,
      createdAt: new Date().toISOString(),
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

  const startEdit = (id, title) => {
    setEditingId(id);
    setEditText(title);
  };

  const saveEdit = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, title: editText } : todo
      )
    );
    setEditingId(null);
    setEditText('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

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

      <ul className="space-y-2">
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center justify-between border-b py-2 fade-in"
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  className="border px-2 py-1"
                />
              ) : (
                <span className={todo.completed ? 'line-through text-gray-400' : ''}>
                  {todo.title}
                </span>
              )}
              <span className="text-xs text-gray-500">
                {new Date(todo.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="flex space-x-2">
              {editingId === todo.id ? (
                <button
                  onClick={() => saveEdit(todo.id)}
                  className="text-green-500 text-sm"
                >
                  저장
                </button>
              ) : (
                <button
                  onClick={() => startEdit(todo.id, todo.title)}
                  className="text-yellow-500 text-sm"
                >
                  수정
                </button>
              )}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 text-sm"
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
```

---

## 🎨 애니메이션용 CSS (`TodoList.css`)

```css
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 🧪 테스트 방법

1. 앱을 실행한 후 Todo를 추가하면 로컬 스토리지에 저장됩니다.
2. 새로고침해도 목록이 유지됩니다.
3. 수정 버튼을 누르면 텍스트를 편집할 수 있고 저장됩니다.
4. 생성 시간은 한국 시간 기준으로 표시됩니다.
5. 항목 추가/삭제 시 부드러운 애니메이션이 적용됩니다.

---

## 📦 다음 단계 제안

- 다크 모드 지원
- 사용자 인증 기능 (로그인/로그아웃)
- 백엔드 연동 (예: Firebase, Supabase)
- Todo 우선순위 설정

---

원하시면 이 프로젝트를 zip 파일로 만들어 드릴 수 있어요. 또는 GitHub에 업로드하는 방법도 도와드릴 수 있습니다. 어떤 방식이 좋으신가요? 😊
