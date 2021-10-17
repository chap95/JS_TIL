function* generateSequence() {
  console.log('this is generator function!!');
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
console.log('yieldOne => ', yieldOne);
let yieldTwo = generator2.next();
console.log("yieldTwo => ", yieldTwo);
let lastOfGenerator = generator2.next();
console.log("lastOfGenerator => ", lastOfGenerator);
let random = generator2.next();
console.log('random => ', random);