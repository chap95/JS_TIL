# Iteration

---

`iteration`, 처음 이 단어를 접했을 때 너무 생소하고 어려운 개념처럼 느껴졌다. 개발 공부를 하면서 처음보는 단어가 나왔을 때 용어에 대한 감을 잡기 위해 영어사전에 뜻을 검색해본다.

> 반복

개발을 처음시작할 때 부터 `for` 문은 아무런 생각없이 사용해왔기 때문에 이런 용어가 왜 존재하는지 그리고 반복하는 행위가 중요한지에 대한 의문이 들었다.

그래서 내 나름대로 반복이 중요한 이유를 몇 가지 생각해 보았다.

> 자바스크립트의 배열은 진짜 배열이 아니고 `유사배열` 이기 때문에??

JS의 배열은 물리적을 연속된 공간에 데이터를 저장하고 있는 형태가 아니고 객체가 배열을 흉내내고 있다는 자료를 본적이 있다. 실제로 JS 배열은 객체이며 `length`,`map` 등 과 같은 메소드들은 객체의 메소드로 구현이 되있다고 알고 있다.

이 이유라면은 반복하는 행위가 중요할 수 도 있겠다는 생각을 해봤다. 하지만 이 이유가 명확하지 않기 때문에 우선적으로 `iteration` 에 대해서 알아보자.

---

### iteration protocols

`iteration protocols` 는 두 가지로 나뉜다. 이 두 가지 규칙만 충족한다면 어떠한 객체에서든지 `iteration` 구현이 가능하다.

> iterable protocol
> iterator protocol

---

### iterable protocol

객체가 `iterable` 하기 위해서는 `@@iterator` 메소드를 구현해야한다. 이 의미는 객체 자신 또는 `prototype chain`에서 상위 객체에 `@@iterator` 가 구현이 되어 있어야 한다는 의미이다.

위에 말만 봐서는 모르는 용어도 너무 많고 텍스트의 의미가 머릿 속에 정확히 박히지 않는다. 그래서 위 설명에 나온 용어들을 몇 개 정리해보았다.

##### @@iterator

객체에 대한 default iterator 를 반환하는 메소드이며`for..of` 문에 의해 호출이 된다. @@iterator는 일반함수도 될 수 있고 `generator`함수도 될 수 있다. generator 함수를 사용하면 `yield` 를 통해 값이 제공이 된다.

> @@iterator 는 Symbol.iterator 와 같다.

> @@iterator는 zero-argument 함수이다. zero-argument 함수가 호출될 때, iterable 객체의 메소드로써 실행이 되었다. 그러므로 반복을 하면서 무엇을 제공할지 결정하기 위해 this 키워드는 이 객체의 속성에 접근이 가능했었다.

> `@@` 에 대한 의미는 `Well-known Symbol` 인데 iteration 관련 내용과 벗어나는 주제인거 같아서 Symbol 파트에서 설명하겠다.

정리하자면 `iterable protocol` 은 @@iterator 메소드를 객체 또는 prototype chain 에서 상위 객체에 @@iterator 가 있어야 한다는 규칙정도로 이해하면된다.

배열은 Symbol.iterator 를 가지고 있기 때문에 `for..of` 로 순회가 가능하다.

```js
const sampleArray = [1, 2, 3];
console.log(Symbol.iterator in array); // true

for (const item of array) {
  console.log(item);
  // Symbol.iterator 가 있기 때문에 for..of 로 순회가 가능한 모습
}
```

하지만 객체는 Symbol.iterator 를 가지고 있지 않기 때문에 `for..of` 로 순회가 불가능하다.

```js
const sampleObject = { a: 1, b: 2 };

console.log(Symbol.iterator in sampleObject);

// TypeError: sampleObject is not iterable
for (const item of sampleObject) {
  console.log(item);
}
```

이렇게 이터러블 프로토콜을 지키지 않은 객체는 이터러블(반복가능) 하지 않은 모습을 볼 수 있다. 하지만 @@iterator를 구현해 준다면 객체또한 이터러블 할 수 있다.

---

### iterator protocol

`iterator protocol`은 `next()` 메소드를 가지고 있으며 이 메소드 호출을 통해 이터러블을 순회하여 `{value: any, done: boolean}` 형태의 `iteratorResult` 객체를 반환하는 규칙이다.

위에서 본 예시를 한 번더 가져오자

```js
const sampleArray = [1, 2, 3];
const iterator = sampleArray[Symbol.iterator]();
// Symbol.iterator 는 iterator 객체를 반환한다.
console.log("next" in iterator); // true
```

> MDN : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
> ECMA-iternatinal : https://262.ecma-international.org/12.0/#sec-well-known-symbols
> poiemaweb : https://poiemaweb.com/es6-iteration-for-of
