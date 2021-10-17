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

지금까지 제너레이터의
