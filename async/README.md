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

다음 예시 코드를 한 번 살펴보자
(이 예제는 async.js 에 있는 코드)

```
console.log("start");

setTimeout(function foo() {
  console.log("this is foo func!!");
}, 3000);

let x = 1;

while(x < 10){
  console.log(`x === ${x}`);
  x++;
}
```

어떻게 동작이 될까?

1. start 가 callStack 에 등록이 됨
2. setTimeout 은 JS 기능이 아니고 web API 이기 때문에 setTimeout 함수는 실행이 되고 webAPI 에서 이 set 한 시간만큼을 계산하게 됨, setTimeout 실행 함수는 callback queue 에 등록됨
3. while loop 조건을 만족하는 함수들이 callStack에 등록되고 순차적으로 실행이 됨
4. eventloop 는 callback queue 에 실행할 목록들이 남아있기 때문에 callStack 을 지속적으로 체크함
5. while loop 를 다 돈후 set 한 시간만큼이 지나고 나서 `this is foo func!!` 가 실행이 됨
