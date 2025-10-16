# JS 이벤트 처리 방법
>  JavaScript에서 이벤트를 처리하는 방법

---

## 🎯 1. 인라인 이벤트 핸들러 (HTML 속성)

HTML 요소에 직접 이벤트 속성을 지정하여 처리하는 방식입니다.

```html
<!DOCTYPE html>
<html>
<body>
  <button onclick="sayHello()">Click Me</button>

  <script>
    function sayHello() {
      alert("Hello from inline handler!");
    }
  </script>
</body>
</html>
```

---

## 🎯 2. DOM 속성 방식 (`element.onclick`)

JavaScript에서 DOM 요소를 선택한 후 이벤트 속성에 함수를 할당합니다.

```html
<!DOCTYPE html>
<html>
<body>
  <button id="btn">Click Me</button>

  <script>
    const btn = document.getElementById("btn");
    btn.onclick = function () {
      alert("Hello from DOM property!");
    };
  </script>
</body>
</html>
```

---

## 🎯 3. `addEventListener()` 방식

가장 권장되는 방식으로, 하나의 요소에 여러 이벤트 핸들러를 등록할 수 있습니다.

```html
<!DOCTYPE html>
<html>
<body>
  <button id="btn2">Click Me Too</button>

  <script>
    const btn2 = document.getElementById("btn2");
    btn2.addEventListener("click", () => {
      alert("Hello from addEventListener!");
    });
  </script>
</body>
</html>
```

---

## 🎯 4. 이벤트 객체 활용

이벤트 핸들러 함수에 전달되는 `event` 객체를 통해 다양한 정보에 접근할 수 있습니다.

```html
<!DOCTYPE html>
<html>
<body>
  <input type="text" id="inputBox" placeholder="Type something" />

  <script>
    const inputBox = document.getElementById("inputBox");
    inputBox.addEventListener("keydown", function (event) {
      console.log("Key pressed:", event.key);
    });
  </script>
</body>
</html>
```

---

## 🎯 5. 이벤트 제거 (`removeEventListener`)

등록된 이벤트 핸들러를 제거할 수 있습니다.

```html
<!DOCTYPE html>
<html>
<body>
  <button id="btn3">Click to Remove Handler</button>

  <script>
    const btn3 = document.getElementById("btn3");

    function showAlert() {
      alert("This will be removed.");
    }

    btn3.addEventListener("click", showAlert);

    // Remove after 5 seconds
    setTimeout(() => {
      btn3.removeEventListener("click", showAlert);
    }, 5000);
  </script>
</body>
</html>
```

---

## 🎯 6. 이벤트 전파 제어 (`stopPropagation`, `preventDefault`)

```html
<!DOCTYPE html>
<html>
<body>
  <div onclick="alert('Div clicked')">
    <button onclick="event.stopPropagation(); alert('Button clicked')">Click Me</button>
  </div>

  <a href="https://example.com" onclick="event.preventDefault(); alert('Link blocked')">Go to Example</a>
</body>
</html>
```

---

## 🎯 7. 이벤트 위임 (Event Delegation)

부모 요소에 이벤트를 등록하여 자식 요소의 이벤트를 처리합니다.

```html
<!DOCTYPE html>
<html>
<body>
  <ul id="list">
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>

  <script>
    const list = document.getElementById("list");
    list.addEventListener("click", function (event) {
      if (event.target.tagName === "LI") {
        alert("You clicked: " + event.target.textContent);
      }
    });
  </script>
</body>
</html>
```

---

이벤트 처리 방식은 상황에 따라 선택해야 해요. 예를 들어, 많은 자식 요소가 동적으로 생성되는 경우엔 **이벤트 위임**이 유리하고, 여러 핸들러를 등록해야 할 경우엔 **`addEventListener`**가 적합합니다.

원하시면 특정 방식에 대해 더 깊이 들어가거나 실습용 예제를 만들어드릴 수도 있어요!
