# TodoApp06
> 이번 단계에서는 다음과 같은 고급 기능들을 React + Firebase 기반 Todo 앱에 추가해보겠습니다:

---

## ✅ 기능 요약

1. 👤 **사용자별 Todo 분리 (UID 기반)**
2. 🔔 **알림 기능 추가 (브라우저 알림)**
3. 📱 **PWA로 앱 설치 가능하게 만들기**
4. 🚀 **GitHub Actions로 자동 배포**

---

## 1️⃣ 사용자별 Todo 분리 (UID 기반)

Firebase 인증을 통해 로그인한 사용자의 UID를 기준으로 Todo를 저장/조회합니다.

### Firestore 구조 예시

```plaintext
todos (collection)
├── todoId (document)
    ├── uid: "user123"
    ├── title: "할 일"
    ├── completed: false
    ├── createdAt: timestamp
```

### 저장 시 UID 포함

```js
await addDoc(collection(db, 'todos'), {
  uid: user.uid,
  title: newTodo,
  completed: false,
  createdAt: new Date().toISOString(),
});
```

### 불러올 때 로그인한 사용자만

```js
const q = query(collection(db, 'todos'), where('uid', '==', user.uid));
const snapshot = await getDocs(q);
```

---

## 2️⃣ 알림 기능 추가 (브라우저 Notification API)

### 권한 요청

```js
useEffect(() => {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
}, []);
```

### Todo 추가 시 알림

```js
if (Notification.permission === 'granted') {
  new Notification('새로운 할 일이 추가되었습니다!', {
    body: newTodo,
  });
}
```

---

## 3️⃣ PWA로 앱 설치 가능하게 만들기

### ① `public/manifest.json` 생성

```json
{
  "short_name": "TodoApp",
  "name": "React Todo App",
  "icons": [
    {
      "src": "icon-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "icon-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#ffffff",
  "background_color": "#ffffff"
}
```

### ② `public/service-worker.js` 추가 (CRA는 Workbox 사용 가능)

```js
self.addEventListener('install', () => {
  console.log('Service Worker 설치됨');
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
```

### ③ `index.js`에서 등록

```js
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
serviceWorkerRegistration.register();
```

---

## 4️⃣ GitHub Actions로 자동 배포 (예: Vercel, Firebase Hosting)

### `.github/workflows/deploy.yml` 예시 (Firebase Hosting)

```yaml
name: Deploy to Firebase

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: "${{ secrets.GITHUB_TOKEN }}"
          firebaseServiceAccount: "${{ secrets.FIREBASE_SERVICE_ACCOUNT }}"
          channelId: live
          projectId: your-project-id
```

---

## 🧪 테스트 체크리스트

- [x] 로그인 후 사용자별 Todo만 표시됨
- [x] Todo 추가 시 브라우저 알림 발생
- [x] 앱을 브라우저에서 설치 가능 (PWA)
- [x] GitHub에 push하면 자동 배포됨

---

## 📦 다음 단계 제안

- 실시간 동기화 (Firestore `onSnapshot`)
- 다국어 지원 (i18n)
- 캘린더 뷰 추가
- 음성 인식으로 Todo 추가

---

이 프로젝트를 zip 파일로 만들어 드릴 수도 있고, GitHub에 업로드하는 방법도 도와드릴 수 있어요. 어떤 방식이 좋으신가요? 😊
