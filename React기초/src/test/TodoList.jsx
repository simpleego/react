import React, { useEffect, useState, useMemo } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");

  // 데이터 불러오기
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  // 검색어에 따라 필터링
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [todos, search]);

  // 분석 데이터 계산 (useMemo로 최적화)
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    console.log("🔍 분석 연산 실행됨");
    const totalCount = filteredTodos.length;
    const doneCount = filteredTodos.filter((todo) => todo.completed).length;
    const notDoneCount = totalCount - doneCount;
    return { totalCount, doneCount, notDoneCount };
  }, [filteredTodos]);

  return (
    <div>
      <h2>📋 Todo List</h2>
      <input
        type="text"
        placeholder="검색어 입력"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <p>전체: {totalCount}</p>
        <p>완료: {doneCount}</p>
        <p>미완료: {notDoneCount}</p>
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.completed ? "✅" : "⬜️"}</strong> {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;