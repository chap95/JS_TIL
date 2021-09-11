function Person(first, last, age, gender, interests){
  this.first = first;
  this.last = last;
  this.age = age;
  this.gender = gender;
  this.interests = interests;
}

const person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);

console.log('person1.__proto__ : ', person1.__proto__);
console.log('Person.prototype : ', Person.prototype);
console.log('Object.prototype : ', Object.prototype);
// 브라우저에서는 무엇이 뜨던데 여기에서는 왜 비어있을까?