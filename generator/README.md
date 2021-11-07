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
function* generateSequence2() {
  console.log("start generator function");
  yield 1;
  console.log("after first yield");
  yield 2;
  console.log("after second yield");
  return 3;
}

// '제너레이터 함수'는 '제너레이터 객체'를 생성합니다.
let generator = generateSequence2();
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

---

### 이터러블한 제너레이터 객체

제너레이터 함수 호출을 통해 return 된 제너레이터 객체는 이터러블 하기 때문에 `for..of` 를 사용할 수 있다.

```js
function* generateSequence3() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence3();

for (let value of generator) {
  console.log("for..of => ", value); // value 만 log 에 찍힘
}
```

위 코드의 실행 결과를 예측해보자.

```
for..of =>  1
for..of =>  2
for..of =>  3
```

위와 같이 될 것이라 생각하겠지만 마지막 3은 log 에 찍히지 않는다.
`next()` 를 통해서 호출된 것과 다르게 `for..of` 는 `done === true` 일 때 value 를 생략해 버린다.

이에 따라 `for..of`를 사용할 때는 위에 처럼 제너레이터 함수 내부에 `return` 키워드를 사용하는 것보다는 모두 `yield` 로 제너레이터 함수로 구성해야한다.

```js
function* generateSequence4() {
  yield 1;
  yield 2;
  yield 3;
}
```

---

### iterable 과 generator

`for..of` 를 사용해서 객체를 반복하려면 `iterable(반복가능)` 해야한다. 여기서 `iterable` 하다는 의미는 `iterable protocol` 이 구현되어있다는 말이다. 이 때 `iterable protocol` 을 구현할 때 `generator` 를 사용하게 된다.

iterable 과 관련된 자세한 내용은 iteration 파트에 정리되어있다.

사실 위에서 예시로 들었던 `next()` 메소드와 `{done, value}` 객체는 `iterator protocol` 이다. 반환 되는 객체는 `iteratorResult` 객체이다.

generator 로 iteralbe 을 구현할 수 있음을 알았으니 한 번 만들어보자

`iterable` 이 되려면 `[Symbol.iterator]` 메소드를 가지고 있어야 하며 return 은 `iterator`가 되어야 한다.

이 때, `[Symbol.iterator]` 에 일반함수와 generator 함수가 들어갈 수 있다.

이 부분에서는 `iterable protocol`을 generator 함수로 구현해 보고 일반 함수로 구현했을때와의 차이점을 정리해 보겠다.

```js
let range = {
  from: 0,
  to: 5,
};

ragne[Symbol.iterator] = function* () {
  for (let i = this.form; i < this.to; i++) {
    yield i;
  }
};
```

위 예시는 `generator` 함수를 이용하여 iteralbe 을 구현한 예시이다.
generator 함수만 이해한다면 어려운 코드가 아니다. iteralbe 을 구현하는 가장 간단한 구조이며 `yield` 키워드가 `next()`를 반환하며 `next()`의 실행결과는 `iteratorResult` 객체를 반환하기 때문에 `iterable protocol` 을 만족한다.

이번에는 일반적인 함수로 구현한 예시를 보자

```js
let rangeGeneralFunc = {
  from: 1,
  to: 5,
};

rangeGeneralFunc[Symbol.iterator] = function () {
  return {
    current: this.from,
    last: this.to,

    next() {
      if (this.current >= this.last) {
        return { done: true };
      } else {
        return { done: false, value: this.current++ };
      }
    },
  };
};
```

`generator`로 구현한 예시보다는 복잡하며 직접 `next()` 메소드와 `iteratorResult 객체`를 구현했다. `generator` 패턴을 사용한 예시보다는 코드가 복잡하다.

---

지금까지 generator에 대해서 알아봤다. 개념적인 측면은 이해를 했지만 어떤 상황에서 generator를 사용하기 적합한지 느낌은 오지 않는다. generator에 대한 정리를 하면서 많은 예시 코드를 통해 느낀점은 있다.

제너레이터를 활용하면 어려운 구현을 쉽게 할 수 있다. 특히 return 을 해도 내부 상태를 기억하고 있다는 것이 강력한 장점이라고 생각된다.
