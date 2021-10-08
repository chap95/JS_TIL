const target = {
  message1: "hello",
  message2: "everyone",
};

const handler3 = {
  get: function (target, prop, receiver) {
    if (prop === "message2") {
      return "world";
    }
    return Reflect.get(...arguments);
  },
};

const proxy3 = new Proxy(target, handler3);

console.log(target);
console.log(proxy3.message1);
console.log(proxy3.message2);
