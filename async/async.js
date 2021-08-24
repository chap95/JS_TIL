console.log("start");

setTimeout(function foo() {
  console.log("this is foo func!!");
}, 3000);

let x = 1;

while(x < 10){
  console.log(`x === ${x}`);
  x++;
}

// while 문을 돌면서 callStack 에 while loop 조건을
// 만족하는 console.log 함수가 등록이 되었고 
// setTimeout 은 callback queue 에 등록이 되어서
// while 문이 종료되어 callStack 이 비어 있게 되지 않는 이상
// setTimeout 안에 있는 함수 실행을 eventLoop 가 허가하지 않는다.