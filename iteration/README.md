# Iteration

---

여러가지 data type 은 iterable 로 평가 될 수 있다. 그러면 이 iterable 은 어떤 녀석이길래 꽤나 자주 등장하는 것일까?

iterable 의 의미는 반복가능한 객체를 의미한다.

### Iteration Protocol

특정 조건만 지키면 iterable 또는 iterator 로 평가되는 약속을 의미한다.

###### Iterable

- Iterable 조건

```
  Symbol.iterator() 메소드를 포함하고 있어야 함
```

###### Iterator

- Iterator 조건

```
객체 내에 next 메소드 존재
return 값은 IterableResult 객체를 반환
IterableResult = {
  value?: any;
  done: boolean
}
이전 next 호출의 return 으로 done 이 true 이면 앞으로 next 호출에 대한 return 값 또한 done === true 여야함
```

위와 같은 조건만 만족하면 iteration 으로 평가한다는 규약이다.

---

### well-formed Iterable
