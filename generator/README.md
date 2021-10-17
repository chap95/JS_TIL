# generator

---

일반적인 함수는 0개 또는 하나의 return 값을 가진다. 하지만 자바스크립트 generator는 여러 개의 값을 하나 씩 return 할 수 있다. 그래서 이터러블(반복가능한)객체를 통해서 데이터 스트림을 만들 수 있다.

제너레이터는 특별한 syntax를 사용한다. `function*` 와 같이 사용하는데 function 키워드에 Asterisk(별표)가 붙으면 제너레이터 함수를 사용한다는 의미이다.

아래의 예시를 보자

```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
```

앞서 설명에서 `function*` 은 설명이 충분히 되었다. 하지만 `yield` 키워드는 어떤 의미인지 그리고 제너레이터 함수는 어떻게 동작하는지 모른다.

지금까지 제너레이터가 어떤 역할을 하고 어떤 키워드로 사용하는지 알아보았다. 위에서 사용된 `yield` 가 어떤 의미인지 함수 동작은 어떻게 하는지 정리해보자.

---

### 제너레이터 함수의 동작

```js
function* generateSequence() {
  console.log("this is generator function!!");
  yield 1;
  yield 2;
  return 3;
}

// '제너레이터 함수'는 '제너레이터 객체'를 생성합니다.
let generator = generateSequence();
console.log(generator); // [object Generator]
```

일반적인 함수는 호출을 하면 내부 로직이 실행이된다. 하지만 제너레이터 함수는 내부 로직은 실행되지 않고 제너레이터 객체가 반환이 된다.

위 코드를 실행해 보면은 `this is generator function!!` 이라는 문구가 log로 찍힐 것 같지만 실제로는 아래에 있는 log 만 찍힌다.
제너레이터 함수 호출을 했을 때 내부 로직은 실행되지 않는다는 점을 기억해 두자.

---

그러면 이제 generator 내부 로직을 실행하는 방법을 알아보자.
제너레이터 객체는 `next()` 라는 메소드를 가지고 있는데 이 메소드는
제너레이터 함수 내부에서 `yield` 키워드를 만나기 전까지 실행이 되며 반환 값은 `yield <value>`에서 value 와 `done(제너레이터 함수 실행이 끝났는지)`을 객체 형태로 return 한다.

```js
function* generateSequence() {
  console.log("start generator function");
  yield 1;
  console.log("after first yield");
  yield 2;
  console.log("after second yield");
  return 3;
}

// '제너레이터 함수'는 '제너레이터 객체'를 생성합니다.
let generator = generateSequence();
let yieldOne = generator.next();
console.log("yieldOne => ", yieldOne);
let yieldTwo = generator.next();
console.log("yieldTwo => ", yieldTwo);
let lastOfGenerator = generator.next();
console.log("lastOfGenerator => ", lastOfGenerator);
let random = generator.next();
```

위 코드를 실행하면 아래와 같이 나온다.

```
start generator function
yieldOne =>  { value: 1, done: false }
after first yield
yieldTwo =>  { value: 2, done: false }
after second yield
lastOfGenerator =>  { value: 3, done: true }
random =>  { value: undefined, done: true }
```

yieldOne 을 출력하면은 yield 의 value 가 1 이고 함수는 끝이 아니니 done 은 false 가 된다.

`after first yield` 는 next() 의 return 값에 포함되지는 않는다. 하지만 제너레이터 함수의 내부로직이기 때문에 실행은 된다.

`after first yield` 의 실행시점은 `let yieldTwo = generator.next();` 로직을 실행할 때 제너레이터 함수 내부 로직 (마지막 next를 통해 반환된 yield 이후부터 그 다음 yield) 을 실행한다.

지속적으로 next를 실행하면 결국 제너레이터 함수 내부에서 return 키워드를 만나고 next 는 return 의 value 와 done 은 `true` 를 반환한다.

`random` 변수에 `return` 이 된 상태의 제너레이터 next 를 호출해 보았다. 그 결과 `value` 는 `undefined` 가 반환이 되었다.

> asterisk 는 `function* someFunc` 와 `function *someFunc` 형태 둘 다 가능하다. 하지만 asterisk 는 제너레이터 함수임을 선언하는 키워드 인 만큼 `function` 키워드에 붙여 사용하는게 선호된다.
