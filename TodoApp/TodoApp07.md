# TodoApp07
> 이번 단계에서는 다음과 같은 고급 기능들을 React + Firebase 기반 Todo 앱에 추가해보겠습니다:

---

## ✅ 기능 요약

1. 🔄 **실시간 동기화 (Firestore `onSnapshot`)**
2. 🌐 **다국어 지원 (i18n)**
3. 📅 **캘린더 뷰 추가**
4. 🎙️ **음성 인식으로 Todo 추가**

---

## 1️⃣ 실시간 동기화 (`onSnapshot`)

Firestore의 `onSnapshot`을 사용하면 Todo 목록이 실시간으로 업데이트됩니다.

```js
import { onSnapshot, query, where, collection } from 'firebase/firestore';
import { db } from './firebase';

useEffect(() => {
  if (!user) return;

  const q = query(collection(db, 'todos'), where('uid', '==', user.uid));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const todos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTodos(todos);
  });

  return () => unsubscribe();
}, [user]);
```

---

## 2️⃣ 다국어 지원 (i18n)

### 설치

```bash
npm install react-i18next i18next
```

### 초기화 (`i18n.js`)

```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    ko: {
      translation: {
        "todo_list": "할 일 목록",
        "add": "추가",
        "delete": "삭제",
        "edit": "수정",
        "save": "저장",
        "completed": "완료됨",
        "active": "할 일",
        "all": "전체"
      }
    },
    en: {
      translation: {
        "todo_list": "Todo List",
        "add": "Add",
        "delete": "Delete",
        "edit": "Edit",
        "save": "Save",
        "completed": "Completed",
        "active": "Active",
        "all": "All"
      }
    }
  },
  lng: "ko",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});
```

### 사용 예시

```jsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

<h2>{t('todo_list')}</h2>
<button>{t('add')}</button>
```

---

## 3️⃣ 캘린더 뷰 추가

### 설치

```bash
npm install react-calendar
```

### 사용 예시

```jsx
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const [date, setDate] = useState(new Date());

<Calendar onChange={setDate} value={date} />
```

Todo 항목에 `createdAt` 날짜를 기준으로 필터링하거나, 날짜별로 그룹화할 수 있습니다.

---

## 4️⃣ 음성 인식으로 Todo 추가

### 브라우저 SpeechRecognition API 사용

```js
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'ko-KR';
recognition.interimResults = false;

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  setNewTodo(transcript);
};

const startListening = () => {
  recognition.start();
};
```

### 버튼 추가

```jsx
<button onClick={startListening} className="bg-green-500 text-white px-4 py-2 rounded">
  🎙️ 음성 입력
</button>
```

---

## 🧪 테스트 체크리스트

- [x] 실시간으로 Todo 목록이 자동 업데이트됨
- [x] 언어 변경 시 UI 텍스트가 변경됨
- [x] 캘린더에서 날짜 선택 가능
- [x] 음성으로 Todo 입력 가능

---

## 📦 다음 단계 제안

- Todo 항목을 날짜별로 그룹화하여 캘린더에 표시
- 음성 명령으로 완료/삭제 기능 추가
- 다국어 자동 감지 및 설정
- 모바일 최적화 및 반응형 디자인

---

이 기능들을 통합한 프로젝트를 zip 파일로 만들어 드릴 수도 있고, GitHub에 업로드하는 방법도 도와드릴 수 있어요. 원하시나요? 😊
