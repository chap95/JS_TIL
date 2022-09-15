const person = {
  name: "john",
  age: 26,
  sex: "male",
};

exports = person;

// exports 는 CbR 로 module.exports 를 바라보고 있다.
// exports = module.exports 이기 때문에 exports에 person을 할당하는 순간
// module.exports 와의 연결이 끊어진다. 그래서 사용하는 곳에 가면 빈 객체가 오게 된다.
