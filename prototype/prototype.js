// 생성자 함수로 객체 생성하기
function Person(first, last, age, gender, interests, onBye) {
  this.first = first;
  this.last = last;
  this.age = age;
  this.gender = gender;
  this.interests = interests;
  this.onBye = onBye;
}

Person.prototype.sayName = function () {
  console.log(`Hi, my name is ${this.first}`);
};
const person1 = new Person(
  "Bob",
  "Smith",
  32,
  "male",
  ["music", "skiing"],
  () => {
    console.log("bye bye!!");
  }
);
const person2 = new Person(
  "Tom",
  "Eden",
  30,
  "male",
  ["soccer", "game"],
  () => {
    console.log("bye bye!!");
  }
);
// Object.create 메소드로 객체 생성하기
const cat = {
  canBreatheInWater: false,
  onSay: () => {
    console.log("meow");
  },
};

const liveIntheWaterCat = Object.create(cat);
liveIntheWaterCat.canBreatheInWater = true;
liveIntheWaterCat.hasFur = false;

// Object() 생성자 함수로 객체 생성하기
var fish = new Object();
fish.name = "nimo";
fish.age = 3;
fish.canBreatheOntheGround = false;

console.log("fish : ", fish);

// 실제로 값 찍어보기
console.log("person1.__proto__ : ", person1.__proto__);
console.log("Person.prototype : ", Person.prototype);
console.log("Object.prototype : ", Object.prototype);
// 브라우저에서는 무엇이 뜨던데 여기에서는 왜 비어있을까?

console.log("Person.constructor : ", Person.constructor); // [Function: Function]
console.log("Person.prototype.constructor : ", Person.prototype.constructor); // [Function: Person]
console.log("person1.constructor : ", person1.constructor); // [Function: Person]
console.log("person1.__proto__.constructor : ", person1.__proto__.constructor); // [Function: Person]
console.log("person1.constructor.name : ", person1.constructor.name); // Person

// __proto__ : 자신에게 상속해준 객체의 prototype 을 가리킴
// prototype : 상속하고 싶은 속성이나 메소드를 가지고 있는 객체
// constructor : 자신을 만들어준 객체를 가리킴

console.log("person1 : ", person1);
console.log("person1.sayName() : ", person1.sayName());
console.log("person2 : ", person2);
console.log("person2.sayName() : ", person2.sayName());

// sayName 은 메소드로 찍히지 않음
// 대신 위쪽에 Person.prototype 을 찍어보면 sayName 메소드를 확인할 수 있다.
