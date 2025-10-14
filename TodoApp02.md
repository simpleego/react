# TodoApp02  
> 다음 두 가지 기능을 추가 

1. ✅ **체크박스를 통해 완료 여부 표시 및 토글**
2. ➕ **새로운 Todo 항목 추가 기능**

---

### 🔧 업데이트된 `TodoList.js`

```jsx
import React, { useEffect, useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
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

  const toggleComplete = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = () => {
    if (newTodo.trim() === '') return;

    const newItem = {
      userId: 1,
      id: todos.length + 1,
      title: newTodo,
      completed: false,
    };

    setTodos(prev => [newItem, ...prev]);
    setNewTodo('');
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="새로운 할 일 입력"
        />
        <button onClick={addTodo}>추가</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.title}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
```

---

### ✨ 주요 기능 설명

- `toggleComplete(id)` 함수로 체크박스를 클릭하면 완료 상태를 토글합니다.
- `addTodo()` 함수로 새로운 Todo를 입력하고 추가할 수 있습니다.
- 실제 API에 POST 요청은 하지 않고, 로컬 상태에서만 관리합니다 (학습용이므로).

---

### 💡 다음 단계 제안

- 실제 API에 POST 요청을 보내는 기능 추가
- 삭제 기능 추가
- 완료된 항목 필터링
- 스타일 개선 (예: CSS 또는 Tailwind 적용)

필요하시면 이 프로젝트를 zip 파일로 만들어 드릴 수도 있어요. 원하시나요? 😊
