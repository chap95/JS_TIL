// 'use strict';
var obj = {a: 'Custom'};

// 변수를 선언하고 변수에 프로퍼티로 전역 window를 할당
var a = 'Global';

function whatsThis() {
  return this.a;  // 함수 호출 방식에 따라 값이 달라짐
}

console.log(whatsThis());          // this는 'Global'. 함수 내에서 설정되지 않았으므로 global/window 객체로 초기값을 설정한다.
console.log(whatsThis.call(obj));  // this는 'Custom'. 함수 내에서 obj로 설정한다.
console.log(whatsThis.apply(obj)); // this는 'Custom'. 함수 내에서 obj로 설정한다.