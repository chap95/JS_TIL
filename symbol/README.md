# Symbol

---

여러 사람들과 같이 작업을 하게 되면은 하나의 리소스를 공유하는 경우가 있다. 이 때, mutable 한 리소스들은 여러 사람들이 접근하여 상태를 바꿔 놓을 수 있기 떄문에 어떤 시점에 어떠한 상태인지 알기 어렵다.

object 의 경우 object를 const 로 선언을 해도 key-value 쌍은 추가가 가능하기 때문에 mutable 하다.

object 중 symbol 로 생성한 key를 사용하면 반복문에도 key가 loop 에 포함되지 않는다. 이로써 다른 사람과 공유하는 리소스에 다른 환경을 크게 고려하지 않고 부담없이 값을 변경할 수 있다.

---

### 특징

- 유일성 보장

---

### 생성

Symbol은 new 키워드를 사용하지 않는다.

```
const symbol1 = Symbol(key);
```

위와 같은 방식으로 생성하고 Symbol 함수에 key 값은 optional 이다.

---

### 사용

```
const symbol1 = Symbol('c');

const testObj = {
  a: 1,
  b: 2,
}

testObj[symbol1] = 3;

```

위와 같이 object에 할당이 가능하다.
하지만 loop를 돌거나 Object 메소드로 접근하면 나오지 않는다.

```
console.log('Object.keys(testObj) : ', Object.keys(testObj)); // ['name']
console.log('Object.values(testObj): ', Object.values(testObj)); // ['test']
console.log('Object.entries(testObj) : ', Object.entries(testObj)); // [['name', 'test']]

for(let key in testObj){
  console.log(`testObj key: ${key}, value: ${testObj[key]}`); // name, test
}
```

---

### 접근방법

Symbol 을 완전히 숨길 수 있는 방법은 없다.

```
const symbolKey = Object.getOwnPropertySymbols(testObj);
console.log(symbolKey); //[ Symbol(a) ]

```
