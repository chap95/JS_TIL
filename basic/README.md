### 기본

---

자바스크립트 기본 사항에 대해서 정리해둔 파일

### 1. 비교 연산자

우리가 아는 삼단논법에 의거하면

> A = B 이고  
> B = C 이면  
> A = C 이다.

위 명제가 성립해야하는데 JS 에서도 과연 적용이 될까?  
다음 코드를 보자

```js
console.log([] == 0); // A == B
console.log(0 == "0"); // B == C
console.log([] == "0"); // A == C
```

우리가 알고 있는 삼단논법에 의하면 위 코드의 실행결과는 모두 `true` 가 나와야 된다. 하지만 `true true false` 가 나온다. 이게 어떻게 된걸까?

javascript 에서 `==` 연산은 타입을 비교하지 않는다. 이 의미를 자세히 들여다보면은 `==` 연산자를 사용했을 때 자동으로 타입을 변환한다는 의미가 된다. 위에 나온 예시로 타입을 어떻게 변환하고 어떤 이유 때문에 마지막 문장이 `false` 가 되는지 알아보자.

<br />
<br />

앞으로 나올 내용은 `primitive 타입` 과 `reference 타입`, 추가적으로 `js 유사배열`에 관해서 알고 있어야 이해를 할 수 있다.

<br />

1. 예시에서 첫번째 문장을 보자. 빈 배열과 숫자를 비교하고 있다. `==` 연산자가 형변환을 자동으로 해주는 것을 감안한다면 두 피연산자의 타입을 알아볼 필요가 있다. `typeof` 연산자를 통해서 `숫자 0` 과 `[] 빈배열` 의 타입을 확인해 본 결과 `number` 와 `object` 가 나왔다. js 에서의 배열은 `유사배열` 이기 때문에 `object` 가 나온것이다.  
    <br />
   `number` 는 `primitive type`, `object`는 `reference type` 이다. 첫 번째 줄 연산은 원형타입과 참조타입 간의 비교다. 원형타입과 참조타입 간의 비교에는 참조타입이 피연산자의 원형타입으로 형변환이 되어야 한다는 rule 이 적용된다. 그래서 빈 배열은 Number() 로 캐스팅이 된다. 그 결과 `숫자 0` 이 되어서 같아진다. 결과는 `true`
   <br />
   <br />
2. 두번째 문장을 보자. 숫자0 과 문자0 의 비교 연산이다. 해당 타입 둘다 원형타입이다. 이런 경우는 아리송하다. 어떻게 형변환이 될까? `string` 과 `number` 타입의 경우 `number` type 으로 형변환이 이루어진다. `0 == 'abc'` 와 `0 == ''` 의 실행결과가 다름을 보면 알 수 있다. 그래서 위 예제의 실행결과는 `true`
   <br />
   <br />
3. 세번째 문장을 보자. 참조타입과 원향타입간의 비교다. 즉 `[] 빈 배열`이 `string` 으로 형변환 되어야 하는 상황이다. 마지막 수식을 고치면 `String([]) == '0'` 이 된다. 빈 배열을 문자열로 형변환 하면 빈 문자열이기 때문에 `'0'` 과 는 다르다 그래서 결과는 false
   <br />
   <br />
4. 추가적으로 `[] == ''` 연산을 하면 어떤 결과가 나올까?  
   정답은 바로 `true` 이다. 왜 인지는 위에 설명해 놓았으니 읽어보면 될 것이다.

---

### `==` type casting rule

MDN 문서를 기반으로 정리한 형변환 규칙이다.
`A == B` case  
|구분|number|string|boolean|object|피연산자(B)|  
|------|--------|---------|---------|---------|----------|-|  
|number|`A === B`|`A === Number(B)`|`A === Number(B)`| `A == Number(B)`||  
|string|`Number(A) === B`|`A === B`|`Number(A) === Boolean(B)`|`A == String(B)`||  
|boolean|`Number(A) === B`|`Number(A) === Number(B)`|`A === B`|`Number(A) == Number(B)`||  
|Object|`Number(A) == B`|`String(A) == B`| `Number(A) == Number(B)`| `A === B`||  
|피연산자(A)||||||

###### 참고자료

[MDN - 동치 비교 및 동일성](https://developer.mozilla.org/ko/docs/Web/JavaScript/Equality_comparisons_and_sameness)
