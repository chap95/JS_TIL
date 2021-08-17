# Iteration

---

여러가지 data type 은 iterable 로 평가 될 수 있다. 그러면 이 iterable 은 어떤 녀석이길래 꽤나 자주 등장하는 것일까?

iterable 의 의미는 반복가능한 객체를 의미한다.
for...each

### Iteration Protocol

특정 조건의 규약만 지키면 iterable 또는 iterator 로 평가되는 약속을 의미한다.

- Iterable 조건 ()

```
  Symbol.iterator() 메소드를 포함하고 있어야 함
```
