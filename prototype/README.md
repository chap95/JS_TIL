# Prototype

JS는 프로토타입 기반언어라고 불린다. 그러면 여기서 Prototype은 어떤것을 의미하며
어떻게 동작하는지 알아보자

---

js가 프로토타입 언어라는 의미는 js의 모든 객체는 prototype 객체를 가진다는 의미다. 이 prototype 객체는 상위의 prototype 객체로 부터 메소드와 프로퍼티를 상속받을 수 있고 다시 해당 prototype 객체는 상위의 객체로부터 상속 받을 수 있다.
이를 prototype 체이닝이라 하며 다른 객체에 정의된 프로퍼티와 메소드를 사용할 수 있게 하는 근간이다.

엄밀히 말하자면 각 객체에 정의된 속성과 메소드는 각 객체에 존재하는 것이 아닌 생성자의 prototype 객체에 존재한다.

JS에서는 객체 인스턴스와 prototype 간에 연결이 구성되며 이 연결을 따라 prototpye chain을 타고 올라가며 속성과 메소드를 탐색한다.

중요한 점

```
prototype 함수 또는 __proto__ 과
생성자의 prototype 속성의 차이를 인지하는게 중요하다.
prototype 함수 또는 __proto__ 는 개별객체의 속성이며
생성자의 prototype 속성은 말 그대로 생성장의 속성이다.


```
