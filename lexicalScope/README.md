# Lexical Scope

---

lexical scope 는 도대체 무슨 뜻일까? 사전에 검색을 해봤다.

### Lexical 의 사전적 의미

```
어휘의
```

아무리 생각해도 어떤 뜻인지 감이 오지 않아서 자료조사를 진행했다.

#### 1. 단어의 의미

사전적의미는 '어휘의' 지만 조금 더 어울리는 표현은 '문맥의, 흐름의' 라는 표현이 더 자연스러웠다.

개인적으로 제일 자연스러운 표현은 '문맥상 유효범위' 라 생각한다.

#### 2. Scope

scope 는 저격수가 총을 쏠 때 총에 달린 망원경을 scope 라고 한다.

저격수는 이 망원경을 통해 목표를 찾게 되는데 이 때, scope 에 벗어난 물체는 보지 못한다. 한 마디로 scope 에 벗어난 물체는 저격수의 '유효 범위' 를 벗어나 있다고 생각하면 된다.

프로그래밍에도 scope 라는 개념이 존재하는데 위에서 언급한 저격수의 유효범위와 유사하다.

예를 들어 블록-scope 라고 하면 유효 범위가 블록 '{}' 으로 한정이 된다.
함수-scope 라고 하면 유효 범위는 함수가 된다.

이 개념을 잘 숙지하고 아래 예시를 통해 scope 를 이해해보자

JS 에 변수 선언을 할 때 사용하는 keyword 는 3 가지 존재한다.

```
var
let
const
```

이 3 가지는 서로 다른 특징을 가지고 있으며 그 특징 중 하나가 바로 scope 이다.
scope 의 개념을 이 3 가지 keyword 로 알아보자

다음 예제를 보자

```
var x = 0;
if(true){
  var x = 1;
  console.log(x); // 1
}
console.log(x); // 1

let b;
b = 2;
if(true){
  let b;
  b = 3;
  console.log(b); // 3
}
console.log(b); // 2
b = 'cool'
console.log(b); // cool

const c = 4;
if(true){
  const c = 5;
  console.log(c); // 5
}
console.log(c); // 4
```

var : 함수 스코프
let, const : 블록 스코프

let - 선언 후 할당 가능, 재할당 가능
const - 선언과 할당을 동시에 재할당 불가

---

### Lexical scope

```
var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // 1
bar(); // 1
```

위와 같은 예제를 Lexical scope 라고 한다.
var 는 함수 스코프인 변수 keyword 다 x 가 var 이므로
foo 함수의 실행 결과는 10이라고 예상이 된다.

하지만 실제 코드를 실행해 보면 1 그리고 1 이 나오게 된다.
어떤 이유 때문에 그럴까?

자바스크립트는 렉시컬 스코프를 가지고 있다고 한다. 위에서 설명했듯이
렉시컬 스코프는 문맥상 유효범위이다.

코드를 실행했을 때의 관점으로 보는 것이 아닌 문맥상, 개발적으로는 선언했을 때 시점으로 코드를 바라보자

bar 함수는 스코프를 파일 전체로 가져가고 있다. 이는 실행 컨텍스트와 관련이 있다.
실행 컨텍스틑 scopeChain 을 가지고 있는데 이는 해당 컨텍스트가 가지고 있는 scope의 연결이라고 보면된다.

bar 컨텍스트의 scopeChain은 어떻게 될까?

```
[global,bar]
```

이렇게 2가지가 된다. bar 함수 내부에서 사용된 변수는 x 이다. 하지만 bar scope 에서는 x 에 대한 값을 찾을 수 없다.

그러면 체이닝으로 인해 global 을 찾아본다. x는 파일 시작부에 정의되어있으므로 해당 x 값을 사용한다.
