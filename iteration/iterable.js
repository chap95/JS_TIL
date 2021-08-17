// The condition of iterable is that object has a iterator function.
// Iterator return a next func what return a iteratorResult object.
//
const iterableTest = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        while (i < 10) {
          return { value: i++, done: false };
        }

        return { done: true };
      },
    };
  },
};

for (let value of iterableTest) {
  console.log("iterable -> ", value);
}
