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

---

그렇다면 Object에 있는 모든 것들이 Person에 상속되고 Person의 모든것들이 person1 인스턴스 객체에 상속이 되는 걸까?

위 질문에 대한 답은 prototype 속성에 있다.
Object의 모든 속성이 상속이 되지는 않는다. 그러나 상속을 하고 싶은 속성이나 메소드들은 prototype 속성에 넣어버린다. prototype 속성은 하나의 객체이자 프로토타입 체이닝을 통해 상속하고 싶은 것들을 담아두는 버킷정도로 이해하면 된다.

그래서 Object로 부터 상속받은 것들은 `Object.` 으로 시작하는 것이 아니라 `Object.prototype.`으로 시작하게 된다.

### create object

객체를 생성하는데는 여러가지 방법이 있습니다.

- 객체 리터럴 `const x = {};`
- Object 생성자 함수

```js
const person = new Object();
```

- function Person(); 위 예시에서 사용
- Object.create()
- 클래스를 통해 생성

각 생성방식은 사용하는 상황이나 세부적인 로직은 차이가 있으나 위 방법으로 객체를 생성했을 때 추상 연산 동작을 하는
`OrdinaryObjectCrete(proto[, addtionalInternalSlotsList])`
를 통해 객체들이 생성이 된다.

> - proto
>   proto 에는 객체 또는 null 이 올 수 있다.
> - additonalInternalSlotsList
>   추가적인 객체의 속성이나 메소드를 넘겨준다.

> ##### abstract operation
>
> 위에서 언급된 추상연산에 대한 정리를 간단히 한다.

> ##### internal slot 그리고 internal method
>
> 위에서 언급된 슬롯에 대한 개념이 없어서 정리를 한다.
> internal slot과 method는 JS 엔진에서 구현되지만 런타임에서는 추상화 되어 노출되지 않기 때문에 일반 개체의 속성처럼 접근할 수가 없다.
>
> ###### \[[ StringData ]] internal slot
>
> 예를 들어 `new String("whatever");` 라고 코드를 작성했을 때,
> \[[ StringData ]] internal slot 은 `whatever` 을 가리킨다.
> 하지만 internal slot은 위에서 설명했듯이 개발자가 code 상에서 접근하지 못한다.

### 생성자

생성자 함수로 만들어낸 인스턴스 객체에는 `constructor` 라는 속성이 존재한다.
위에서 만들어둔 `person1` 인스턴스 객체의 `constructor` 을 콘솔에 출력하면은 `Person` 생성자 함수가 나온다. 그렇다면 `Person.constructor`을 실행시키면 어떤 것이 나올까?

아래 예제를 한 번 실행해보자

```js
function Person(first, last, age, gender, interests) {
  // 속성과 메소드 정의
  this.first = first;
  this.last = last;
  //... 나머지를 정의
}

var person1 = new Person("Bob", "Smith", 32, "male", ["music", "skiing"]);

console.log(Person.constructor); // [Function: Function]
console.log(person1.constructor); // [Function: Person]
console.log(person1.constructor.name); // Person
```

Person 생성자 함수의 constructor를 찍었을 때는 Function이 나왔다.

---

### prototype 장점 (사용이유)

프로토타입 체이닝이 없다고 가정했을 때, 위에서 만든 Person 생성자를 통해서 만든 인스턴스들은 각기 다른 메모리에 메소드들을 저장한다.
하지만 프로토타입 테이닝을 통해 Person.prototype 에 단 하나의 메소드를 저장하고 각각의 인스턴스 객체들은 이를 참조하기만 하면된다.

다음 예시를 보자

```js
function Person(first, last, age, gender, interests, onBye) {
  // 속성과 메소드 정의
  this.first = first;
  this.last = last;
  this.onBye = onBye;
  //... 나머지를 정의
}

Person.prototype.sayName = function () {
  console.log(`hello my name is ${this.first}`);
};

var person1 = new Person(
  "Bob",
  "Smith",
  32,
  "male",
  ["music", "skiing"],
  () => {
    console.log("bye bye");
  }
);
var person2 = new Person("Tom", "Eden", 30, "male", ["soccer", "game"], () => {
  console.log("bye bye");
});

console.log("person1 : ", person1);
console.log("person2 : ", person2);

// onBye는 메소드로 찍히지만 sayName 은 메소드로 찍히지 않는다.
```

이렇게 설명하고 보니 prototype은 원형이라는 의미를 가지고 있는데 이러한 방식이 프로토타입 체이닝이라 불리는지 이해가간다.

> 참고
>
> - https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Object_prototypes
> - https://ko.javascript.info/function-prototype
> - https://tc39.es/ecma262/#sec-ordinaryobjectcreate
> - https://stackoverflow.com/questions/33075262/what-is-an-internal-slot-of-an-object-in-javascript
> - https://morioh.com/p/4569c4dd3364
