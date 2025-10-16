# react기초 자바스크립트
> React를 배우기 위한 JavaScript의 핵심 개념

---

## 🧠 1. 기본 문법과 구조

- **변수 선언**: `var`, `let`, `const`의 차이점
- **데이터 타입**: 문자열, 숫자, 불리언, 배열, 객체
- **조건문과 반복문**: `if`, `switch`, `for`, `while`, `forEach`, `map`
- **함수 선언**: 함수 선언식 vs 표현식, 화살표 함수 (`=>`)

---

## 🚀 2. ES6+ 문법 (React에서 자주 사용됨)

- **화살표 함수**: `const add = (a, b) => a + b`
- **템플릿 리터럴**: `` `Hello, ${name}` ``
- **구조 분해 할당**: `const { name } = props`
- **스프레드 연산자 (`...`)**: 배열/객체 복사 및 병합
- **디폴트 파라미터**: `function greet(name = 'Guest')`
- **모듈 시스템**: `import`, `export`

---

## 🧩 3. 배열과 객체 다루기

- 배열 메서드: `map`, `filter`, `reduce`, `find`, `some`, `every`
- 객체 속성 접근, 추가, 삭제
- 상태 불변성 유지: 직접 수정 대신 복사 후 변경

---

## 🔁 4. 비동기 처리

- **Promise**와 `.then()`, `.catch()`
- **async/await**
- **fetch API**: 외부 데이터 가져오기

---

## 🎯 5. 조건부 표현과 렌더링

- **삼항 연산자**: `isLoggedIn ? 'Welcome' : 'Please log in'`
- **논리 연산자**: `isVisible && <Component />`
- **Falsy/Truthy 값**: `false`, `null`, `undefined`, `0`, `''` 등

---

## 🧬 6. 함수형 프로그래밍 개념

- **고차 함수**: `map`, `filter` 등
- **불변성 유지**
- **콜백 함수**: 이벤트 핸들링, 비동기 처리에 자주 사용

---

## 📦 7. DOM과 이벤트

- React는 직접 DOM을 조작하지 않지만 개념은 알아야 함
- 이벤트 객체와 핸들러: `onClick`, `onChange` 등

---

## 🧠 8. this와 바인딩

- 클래스 컴포넌트에서 `this`의 의미
- 화살표 함수로 `this` 바인딩 문제 해결

---

## 🧪 9. JSX와 Babel 이해

- JSX는 JavaScript + XML 문법
- JSX는 Babel을 통해 일반 JS로 변환됨
- JSX에서 `{}`로 JS 표현식 사용

---

Sources:  
- [React를 배우는 데 알아야 할 JavaScript의 기본 개념](https://blog.naver.com/the_bible/223490681308)  
- [React 필수 지식 #1 - 벨로그](https://velog.io/@tjdgur/React-%ED%95%84%EC%88%98-%EC%A7%80%EC%8B%9D-1)  
- [React 공식 빠르게 시작하기](https://ko.react.dev/learn)
