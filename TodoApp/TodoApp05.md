#  TodoApp05
> 이번 단계에서는 다음과 같은 고급 기능들을 React Todo 앱에 추가해보겠습니다:

---

## ✅ 목표 기능

1. 🌙 **다크 모드 지원**
2. 🔐 **사용자 인증 기능 (로그인/로그아웃)**
3. 🔗 **백엔드 연동 (Firebase 사용)**
4. ⭐ **Todo 우선순위 설정**

---

## 🧱 1. 다크 모드 지원 (Tailwind 기반)

Tailwind CSS는 다크 모드를 쉽게 지원합니다.

### 설정 (`tailwind.config.js`)

```js
module.exports = {
  darkMode: 'class', // 또는 'media'
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 다크 모드 토글 버튼 추가 (`App.js`)

```jsx
import React, { useState } from 'react';
import TodoList from './TodoList';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark bg-gray-900 text-white min-h-screen' : 'bg-gray-100 min-h-screen'}>
      <div className="p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded"
        >
          {darkMode ? '☀️ 라이트 모드' : '🌙 다크 모드'}
        </button>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
```

---

## 🔐 2. 사용자 인증 기능 (Firebase Auth)

### Firebase 설정

1. Firebase 콘솔에서 프로젝트 생성
2. Authentication → Email/Password 로그인 활성화
3. Firebase SDK 설치:

```bash
npm install firebase
```

### Firebase 초기화 (`firebase.js`)

```js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  // ... 나머지 설정
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### 로그인/로그아웃 컴포넌트 추가

```jsx
import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

function AuthPanel({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      onLogin(userCredential.user);
    } catch (error) {
      alert('로그인 실패');
    }
  };

  const logout = () => {
    signOut(auth);
    onLogin(null);
  };

  return (
    <div className="mb-4">
      <input type="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>로그인</button>
     button>
    </div>
  );
}
```

---

## 🔗 3. Firebase Firestore 연동 (Todo 저장)

```bash
npm install firebase
```

### Firestore 초기화 (`firebase.js`)

```js
import { getFirestore } from 'firebase/firestore';

export const db = getFirestore(app);
```

### Todo 저장/불러오기

```js
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

const todosRef = collection(db, 'todos');

const fetchTodos = async () => {
  const snapshot = await getDocs(todosRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const addTodo = async (todo) => {
  await addDoc(todosRef, todo);
};

const deleteTodo = async (id) => {
  await deleteDoc(doc(db, 'todos', id));
};

const updateTodo = async (id, updates) => {
  await updateDoc(doc(db, 'todos', id), updates);
};
```

---

## ⭐ 4. Todo 우선순위 설정

Todo 객체에 `priority` 필드를 추가하고, UI에서 선택할 수 있게 합니다.

```jsx
<select
  value={priority}
  onChange={e => setPriority(e.target.value)}
  className="border px-2 py-1"
>
  <option value="low">낮음</option>
  <option value="medium">중간</option>
  <option value="high">높음</option>
</select>
```

정렬은 다음과 같이 처리할 수 있습니다:

```js
const sortedTodos = [...filteredTodos].sort((a, b) => {
  const order = { high: 0, medium: 1, low: 2 };
  return order[a.priority] - order[b.priority];
});
```

---

## 🧪 테스트 및 배포

- Firebase 콘솔에서 인증 및 Firestore 확인
- Tailwind 다크 모드 확인
- 우선순위 정렬 확인
- 로그인 후 사용자별 Todo 관리 가능

---

## 📦 다음 단계 제안

- 사용자별 Todo 분리 (UID 기반)
- 알림 기능 추가
- PWA로 앱 설치 가능하게 만들기
- GitHub Actions로 자동 배포

---

이 프로젝트를 zip 파일로 만들어 드릴 수도 있고, GitHub에 업로드하는 방법도 도와드릴 수 있어요. 어떤 방식이 좋으신가요? 😊
