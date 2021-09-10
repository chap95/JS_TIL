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
