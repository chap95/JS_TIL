# 비동기

---

### JS 는 single-thread

자바스크립트는 싱글스레드 언어이다.
싱글스레드 언어라는 의미는 하나의 stack과 하나의 heap을 가진 형태를 말한다. 즉, 한 번에 한 동작만 실행할 수 있음을 의미한다.
그런데 어떻게 비동기 동작을 할 수 있을까?

지금부터 이 궁금증을 해결해보자

---

### How To

JS 를 실행할 수 있는 환경에는 4가지 요소가 있다.

```
- call stack
- web APIs
- call back queue
- event loop

```

1. callStack
   JS 가 처리해야할 일을 담아둔 stack

2. web APIs
   브라우저에서 제공하는 I/O 처리와 관련된 작업을 대신 수행한다. JS 에서 기본적으로 제공해주는 기능 외 기능들이 있다.
   대표적인 예로 setTimeout

3. callback queue
