# 비동기

---

### JS 는 single-thread

자바스크립트는 싱글스레드 언어이다.
싱글스레드 언어라는 의미는 하나의 stack과 하나의 heap을 가진 형태를 말한다. 즉, 한 번에 한 동작만 실행할 수 있음을 의미한다.
그런데 어떻게 비동기 동작을 할 수 있을까?

지금부터 이 궁금증을 해결해보자

---

### How To

JS 를 실행할 수 있는 환경에는 여러가지 요소가 있다.

```
- call stack
- web APIs
- call back queue
  - job queue
- event loop
```

1. callStack
   JS 가 처리해야할 일을 담아둔 stack 이다. 인터프리터가 코드를 읽어나가면서 실행해야할 작업들을 쌓아두는 곳이다.
   그런데 ` setTimeout, ajax(), click 이벤트` 와 같은 작업이 들어오면 callStack에 쌓아두지 않고 callback queue 로 보내게 된다.

2. web APIs
   브라우저에서 제공하는 I/O 처리와 관련된 작업을 대신 수행한다. JS 에서 기본적으로 제공해주는 기능 외 기능들이 있다.

   대표적인 예로 setTimeout

3. callback queue
   비동기 동작과 관련된 작업들이 queue 에 push 된다.

   3-1. job queue
   이 job queue 는 callback queue의 일종이다. 이 queue 는 특이하게 new Promise() 함수 동작에만 동작한다. 즉 promise 에 .then() 으로 resolve 하게 되면 작업이 등록된다.
   이러한 thenable 메소드들이 추가되고 실행을 기다리게 된다.

4. event loop
   event loop 는 callStack 이 비었는지 계속해서 체크하는 역할을 한다. 만약 callback queue 에 비동기 실행을 할 작업이 존재하고 callStack이 비어 있는 경우에 비동기 동작이 callStack 에서 실행이 된다.
