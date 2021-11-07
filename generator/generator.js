

function* generateSequence() {
  console.log("this is generator function!!");
  yield 1;
  yield 2;
  return 3;
}

// '제너레이터 함수'는 '제너레이터 객체'를 생성합니다.
let generator = generateSequence();
console.log(generator); // [object Generator]

function* generateSequence2() {
  console.log("start generator function");
  yield 1;
  console.log("after first yield");
  yield 2;
  console.log("after second yield");
  return 3;
}

// '제너레이터 함수'는 '제너레이터 객체'를 생성합니다.
let generator2 = generateSequence2();
let yieldOne = generator2.next();
console.log("yieldOne => ", yieldOne);
let yieldTwo = generator2.next();
console.log("yieldTwo => ", yieldTwo);
let lastOfGenerator = generator2.next();
console.log("lastOfGenerator => ", lastOfGenerator);
let random = generator2.next();
console.log("random => ", random);

function* generateSequence3() {
  yield 1;
  yield 2;
  return 3;
}

let generator3 = generateSequence3();

for (let value of generator3) {
  console.log("for..of => ", value); // 1, 2가 출력됨
}

const someObj = {};

someObj.map = function*( ) {
  
}

let rangeGenerator = {
  from: 1,
  to:5 ,
}

rangeGenerator[Symbol.iterator] = function* () {
  for(let i = this.from; i < this.to; i++){
    yield i;
  }
}
console.log('[...rangeGenerator] => ',  [...rangeGenerator])
console.log('range[Symbole.iterator] => ', rangeGenerator[Symbol.iterator]())
let rangeGeneralFunc = {
  from: 1,
  to: 5,
}

rangeGeneralFunc[Symbol.iterator] = function () {
  return {
    current: this.from,
    last: this.to,

    next() {
      if(this.current >= this.last) {
        return { done: true }
      } else {
        return { done: false, value: this.current++}
      }
    }
  }
}

console.log('[...rangeGeneralFunc => ]', [...rangeGeneralFunc])