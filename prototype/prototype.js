// 생성자 함수로 객체 생성하기
function Person(first, last, age, gender, interests) {
  this.first = first;
  this.last = last;
  this.age = age;
  this.gender = gender;
  this.interests = interests;
}
const person1 = new Person("Bob", "Smith", 32, "male", ["music", "skiing"]);

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
