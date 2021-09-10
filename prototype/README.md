# Prototype

JS는 프로토타입 기반언어라고 불린다. 그러면 여기서 Prototype은 어떤것을 의미하며
어떻게 동작하는지 알아보자
MDN 내용 + 내가 정리한 것들 위주 입니다.

---

### 설명

js가 프로토타입 언어라는 의미는 js의 모든 객체는 prototype 객체를 가진다는 의미다. 이 prototype 객체는 상위의 prototype 객체로 부터 메소드와 프로퍼티를 상속받을 수 있고 다시 해당 prototype 객체는 상위의 객체로부터 상속 받을 수 있다.
이를 prototype 체이닝이라 하며 다른 객체에 정의된 프로퍼티와 메소드를 사용할 수 있게 하는 근간이다.

엄밀히 말하자면 각 객체에 정의된 속성과 메소드는 각 객체에 존재하는 것이 아닌 생성자의 prototype 객체에 존재한다.

JS에서는 객체 인스턴스와 prototype 간에 연결이 구성되며 이 연결을 따라 prototpye chain을 타고 올라가며 속성과 메소드를 탐색한다.

### 중요한 점

```
prototype 함수 또는 __proto__ 과
생성자의 prototype 속성의 차이를 인지하는게 중요하다.
prototype 함수 또는 __proto__ 는 개별객체의 속성이며
생성자의 prototype 속성은 말 그대로 생성장의 속성이다.


```

---

### 예제

한 번 예제를 살펴보자...

```javascript
function Person(first, last, age, gender, interests) {
  // 속성과 메소드 정의
  this.first = first;
  this.last = last;
  //... 나머지를 정의
}

var person1 = new Person("Bob", "Smith", 32, "male", ["music", "skiing"]);
```

만약 위와 같은 생성자를 정의하고 각 속성들을 정의해줬다고 하자.
그리고 person1을 Person 을 통해 인스턴스를 생성했다.

그러면 개발할 때 person1 이라는 변수를 입력하고 .(점)을 찍으면
`name, age, first, last gender, interests`
속성들이 나올 것이다.

위에서 주구장창 설명한 내용이 여기에 적용이 된다. 이 속성들은 person1 이라는 인스턴스에 있는 것 처럼 보이지만 실제로는 Person 이라는 생성자에 있는 속성이다. 하지만 `prototype chaining `에 의해서 person1 으로 접근이 가능한 것이다.

이때 위의 속성들은 person1의 프로토타입 객체(Person 생성자의 프로토타입)에 존재하는 것이다.

여기서 중요한 점에서 언급한 개념이 나온다.
객체의 프로토타입 객체와 생성자의 프로토타입은 동일하다.

```js
person1.__proto__; // Person {}
Person.prototype; // Person {}
```

둘의 값은 같지만 `__proto__`는 객체의 프로토타입 객체이고
`생성자.prototype`은 생성자의 프로토타입이기 때문에 차이가 있다.

---

prototype 객체는 또 다른 prototype 객체를 상속받을 수 있다고 위에서 설명했다.

person1에 (.)점을 찍으면 내가 정의한 속성과 메소드 뿐 아니라
`watch, valueOf` 와 같은 메소드에도 접근이 가능하다.
이는 Person 생성자의 prototype 객체가 Object에 정의된 메소드들에 prototype chaining이 걸려있어서 접근이 가능한 것이다.

그렇다면 한 번 ` person1.valueOf()` 를 호출헸을 때 어떻게 동작하는지 알아보자

```

1. 브라우저는 person1 이라는 객체가 valueOf 메소드를 가지오 있는지 검사

2. person1 에는 valueOf 라는 메소드가 없으므로
person1의 프로토타입 객체 (Person 생성자의 프로토타입)에 valueOf
라는 메소드가 존재하는지 검사한다. prototype chaining 에 의해
이러한 동작을 할 수 있음을 기억하자

3. person1의 프로토타입 객체(Person의 프로토타입)에도 존재하지 않으므로
Person의 프로토타입 객체(person1의 프로토타입 객체의 프로토타입 객체 === person1.__proto__.__proto__)를 검사한다.
즉, Obejct 생성자의 프로토타입에 valueOf 가 있는지 없는지 검사한다.

Obejct 생성자의 프로토타입에는 valueOf 가 있으므로
메소드를 호출한 후 종료한다.
```

### 중요한점

> 1. 위와 같이 탐색하는 객체의 속성과 메소드들은 복사가 되는 것이 아니라 prototype chaining 에 의해 탐색이 된다는 것을 명심하자.
> 2. 특정 객체의 프로토타입객체로 바로 접근할 수 있는 공식적인 방법은 없다. JS 표준 스펙에서 `[[prototype]]`으로 표현되는 프로로토타입에 대한 링크는 내부 속성으로 정의되어 있다.
> 3. ES6 에는 `Object.getPrototypeOf(객체)` 방식으로 해당 객체의 프로토타입 객체에 바로 접근이 가능하다.
