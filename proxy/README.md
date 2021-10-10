# Proxy

웹에서의 proxy 라는 말은 들어봤어도 JS 에서 proxy 라는 단어는 처음 들어본다.  
지금부터 알아보자!!

---

### 사전적 의미

개발자가 아니더라도 `proxy` 라는 단어는 많이 들어봤을 것이다.
프록시라는 단어자체보다는 `프록시 서버` 라는 단어가 많이 언급이 된다.

쓸데없는 행동일지는 몰라도 모르는 개발 단어(영어)가 나왔을 때 항상 그 의미를 사전에 검색해본다. 그 이유는 높은 확률로 개념과 단어를 연결지을 수 있기 때문이다.

그래서 오늘도 어깁없이 `proxy` 라는 단어를 사전에 검색해 보았다.

```
대리
```

proxy 는 대리 라는 뜻을 가지고 있는 단어다. 위에서 언급한 프록시 서버는 한국어로 대리 서버이다. 프록시 서버는 다른 서버에 간접적으로 접근할 수 있도록 해주는 서버를 의미한다.

개발에서 `proxy` 라는 단어가 들어가게 되면은 대충 대신해서 무언가를 해주는 기능이라 보면 될 것 같다.

### JS 에서 proxy 란??

`proxy` 객체는 객체의 기본적인 동작을 수정(재정의)할 수 있다.

프록시는 2개의 파라미터로 만들어진다.

```
target: 프록시로 사용할 원본 객체
handler: 재정의 하고 싶은 기능이 담긴 객체
```

두 가지의 파라미터는 아래와 같이 사용이 된다.

```js
const target = {
  message1: "hello",
  message2: "everyone",
};

const handler1 = {};

const proxy1 = new Proxy(target, handler1);
console.log(proxy1.message1); // hello
console.log(proxy1.message2); // everyone
```

위 코드 `handler1` 이 비어있는 객체이기 때문에 원본과 같은 동작을 한다.

객체를 커스터마이즈 하기 위해서는 handler1 에 함수를 정의하면 된다.

```js
const target = {
  message1: "hello",
  message2: "everyone",
};

const handler2 = {
  get: function (target, prop, receiver) {
    return "world";
  },
};

const proxy2 = new Proxy(target, handler2);
console.log(proxy2.message1); // world
console.log(proxy2.message1); // world
```

위의 예시를 통해서 `get()` 메소드를 통하여 target 객체에 있는 속성들을 모두 재정의 된 것을 알 수 있다.

핸들러 객체에 들어가는 함수를 `traps` 라고 한다. 이는 객체에 특정 동작을 할 때 객체를 가로채어 트랩에 정의된 동작을 수행한다.

위에서 사용한 `get()` 은 target 객체의 속성을 읽을 때 인터셉트하고 `set()` 트렙은 쓸 때 인터셉트한다.

자바스크립트 proxy 핸들러 함수에는 다양한 메소드가 올 수 있는데 아래는 이 메소드를 정리해 놓은 목록이다.

```
get
set
has
defineProperty
deleteProperty
construct
apply
getPrototypeOf
setPrototypeOf
isExtensible
preventExtensions
getOwnPropertyDescriptor
ownKeys
```

| 내부 메소드             | 핸들러메소드(트랩)  | 작동시점                                               |
| ----------------------- | ------------------- | ------------------------------------------------------ |
| `[[Get]] `              | `get `              | 속성을 읽을때                                          |
| `[[Set]]`               | `set`               | 속성을 쓸때                                            |
| `[[HasProperty]]`       | `has`               | `in` 연산자가 동작할 때                                |
| `[[Delete]]`            | `deleteProperty`    | `delete` 연산자가 동작할 때                            |
| `[[Call]]`              | `call`              | 함수 호출할 때                                         |
| `[[Construct]]`         | `construct`         | `new` 연산자가 동작할 때                               |
| `[[GetPropertyOf]]`     | `getPropertyOf`     | `Obejct.getPropertyOf`                                 |
| `[[SetPropertyOf]]`     | `setPropertyOf`     | `Object.setPropertyOf`                                 |
| `[[IsExtensible]]`      | `isExtensible`      | `Object.isExtensible`                                  |
| `[[PreventExtensions]]` | `preventExtensions` | `Object.preventExtensions`                             |
| `[[DefineOwnProperty]]` | `defineOwnProperty` | `Object.defineProperty`<br />`Object.defineProperties` |

---

### Reflect

```js
const target = {
  message1: "hello",
  message2: "everyone",
};

const handler3 = {
  get: function (target, prop, receiver) {
    if (prop === "message2") {
      return "world";
    }
    return Reflect.get(...arguments);
  },
};

const proxy3 = new Proxy(target, handler3);

console.log(proxy3.message1); // hello
console.log(proxy3.message2); // world
```

---

### proxy는 왜 사용할까?

---

> 참고
> https://javascript.plainenglish.io/why-proxies-in-javascript-are-fantastic-db100ddc10a0 > https://blog.woolta.com/categories/3/posts/144 > https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy

```

```
