# TodoApp  
> **인터랙티브한 '할 일 목록 (To-Do List)' 앱**
> 할 일 목록 앱은 아래 리액트의 핵심 기능들을 아주 잘 활용할 수 있음

1.  **컴포넌트 기반 구조**: 각 할 일 항목(`TodoItem`), 할 일 목록 전체(`TodoList`), 입력 폼(`TodoForm`) 등 각각을 독립적인 컴포넌트로 만들어서 재사용성과 유지보수성을 확 높일 수 있어.
2.  **State 관리**: 새로운 할 일을 추가하거나, 완료하거나, 삭제할 때마다 `state`가 변경되고, 리액트가 이 `state`에 따라 화면을 효율적으로 다시 그려주기 때문에 사용자 경험이 아주 부드러워.
3.  **선언적 UI**: "현재 할 일 목록은 이러이러하니, 이렇게 보여줘!"라고 코드에 선언만 해두면, 리액트가 알아서 데이터를 기반으로 UI를 업데이트해 주지.
4.  **Props 사용**: 부모 컴포넌트(`App`)에서 자식 컴포넌트(`TodoList`, `TodoItem`)로 데이터나 함수를 `props`로 전달해서 각 컴포넌트가 자신의 역할을 수행하도록 할 수 있어.

---

### 🌟 리액트로 만든 할 일 목록 (To-Do List) 앱 🌟

`create-react-app`으로 프로젝트를 생성했다고 가정하고, `src` 폴더 안에 아래 파일들을 만들어보자!

#### 1. `App.js` (메인 앱)

이 파일은 앱 전체의 할 일 목록 `state`를 관리하고, 모든 컴포넌트를 조합하는 역할을 해.

```jsx
// src/App.js
import React, { useState } from 'react';
import TodoForm from './TodoForm'; // 할 일 입력 폼
import TodoList from './TodoList'; // 할 일 목록

function App() {
  // 할 일 목록을 저장하는 state!
  // 각 할 일은 id, text, completed(완료 여부)를 가질 거야.
  const [todos, setTodos] = useState([
    { id: 1, text: '리액트 기초 다지기', completed: false },
    { id: 2, text: '코딩 운동 한 시간', completed: true },
    { id: 3, text: '맛있는 저녁 식사 준비', completed: false },
  ]);

  // 새 할 일을 추가하는 함수
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // 고유한 ID를 위해 현재 시간을 사용
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]); // 기존 목록에 새 할 일을 추가하고 state 업데이트!
  };

  // 할 일의 완료 여부를 토글하는 함수
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 할 일을 삭제하는 함수
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', padding: '20px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>⭐️ 나의 할 일 ⭐️</h1>
      {/* 새 할 일을 추가하는 폼 컴포넌트 */}
      <TodoForm onAddTodo={addTodo} />
      <hr style={{ margin: '20px 0', borderColor: '#eee' }} />
      {/* 할 일 목록을 보여주는 컴포넌트 */}
      <TodoList
        todos={todos} // 할 일 목록 state를 props로 전달
        onToggleTodo={toggleTodo} // 완료/미완료 토글 함수를 props로 전달
        onDeleteTodo={deleteTodo} // 삭제 함수를 props로 전달
      />
    </div>
  );
}

export default App;
```

#### 2. `TodoForm.js` (할 일 입력 폼)

새로운 할 일을 입력받고 `App` 컴포넌트로 전달하는 역할을 해.

```jsx
// src/TodoForm.js
import React, { useState } from 'react';

function TodoForm({ onAddTodo }) { // App.js에서 onAddTodo 함수를 props로 받아와요.
  const [inputText, setInputText] = useState(''); // 입력창의 텍스트를 관리하는 state

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 기본 동작(페이지 새로고침) 방지
    if (inputText.trim()) { // 입력값이 비어있지 않다면
      onAddTodo(inputText); // 부모로부터 받은 addTodo 함수를 호출해서 새 할 일을 추가해요!
      setInputText(''); // 입력창 비우기
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="새로운 할 일을 추가하세요!"
        value={inputText} // 입력창의 값과 inputText state를 연결
        onChange={(e) => setInputText(e.target.value)} // 입력값 변경 시 state 업데이트
        style={{ flexGrow: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#61dafb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        추가!
      </button>
    </form>
  );
}

export default TodoForm;
```

#### 3. `TodoList.js` (할 일 목록)

여러 개의 `TodoItem`을 묶어서 보여주는 역할을 해.

```jsx
// src/TodoList.js
import React from 'react';
import TodoItem from './TodoItem'; // 각 할 일 항목 컴포넌트

function TodoList({ todos, onToggleTodo, onDeleteTodo }) { // 할 일 목록과 함수들을 props로 받아와요.
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map((todo) => ( // todos 배열을 map 함수로 돌면서 각 할 일마다 TodoItem 컴포넌트를 렌더링!
        <TodoItem
          key={todo.id} // 리스트 렌더링 시에는 꼭 key prop을 넣어줘야 해!
          todo={todo} // 할 일 객체 전체를 props로 전달
          onToggle={onToggleTodo} // 토글 함수를 props로 전달
          onDelete={onDeleteTodo} // 삭제 함수를 props로 전달
        />
      ))}
    </ul>
  );
}

export default TodoList;
```

#### 4. `TodoItem.js` (개별 할 일 항목)

각 할 일의 내용을 표시하고, 완료/삭제 버튼을 제공해.

```jsx
// src/TodoItem.js
import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) { // 개별 할 일 객체와 함수들을 props로 받아와요.
  return (
    <li style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: '1px solid #eee',
      textDecoration: todo.completed ? 'line-through' : 'none', // 완료되면 취소선!
      color: todo.completed ? '#aaa' : '#333'
    }}>
      <span onClick={() => onToggle(todo.id)} style={{ cursor: 'pointer', flexGrow: 1 }}>
        {todo.text}
      </span>
      <div>
        <button onClick={() => onToggle(todo.id)} style={{
          padding: '5px 10px',
          marginRight: '5px',
          backgroundColor: todo.completed ? '#f0f0f0' : '#28a745', // 완료 여부에 따라 색상 변경
          color: todo.completed ? '#555' : 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          {todo.completed ? '미완료' : '완료!'}
        </button>
        <button onClick={() => onDelete(todo.id)} style={{
          padding: '5px 10px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          삭제
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
```

---

이렇게 코드를 짜면, 리액트가 얼마나 편리하고 효율적으로 복잡한 UI를 만들 수 있는지 체감할 수 있을 거야! 😎

1.  **할 일을 추가하면**: `TodoForm`에서 입력받아 `App`의 `todos` state를 업데이트 → 리액트가 `TodoList`를 거쳐 새로운 `TodoItem`을 효율적으로 추가!
2.  **할 일을 완료/미완료 토글하면**: 해당 `TodoItem`에서 `onToggle` 호출 → `App`의 `todos` state 업데이트 → 리액트가 해당 `TodoItem`만 다시 그려서 취소선 적용!
3.  **할 일을 삭제하면**: 해당 `TodoItem`에서 `onDelete` 호출 → `App`의 `todos` state에서 항목 제거 → 리액트가 `TodoList`를 효율적으로 업데이트해서 항목 삭제!
