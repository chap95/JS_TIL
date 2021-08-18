const sym = Symbol("a");
const sym2 = Symbol("a");

console.log("sym === sym2 : ", sym === sym2); // false
console.log("sym == sym2 : ", sym == sym2); // false
const testObj = {
  name: "test",
  [sym]: "a",
};
console.log("testObj -> ", testObj);

console.log("Object.keys(testObj) : ", Object.keys(testObj)); // ['name']
console.log("Object.values(testObj): ", Object.values(testObj)); // ['test']
console.log("Object.entries(testObj) : ", Object.entries(testObj)); // [['name', 'test']]
for (let key in testObj) {
  console.log(`testObj key: ${key}, value: ${testObj[key]}`); // name, test
}

// Symbol.for(); global symbol

const symFor = Symbol.for("a");
const symFor2 = Symbol.for("a");

console.log(symFor === symFor2); // true
console.log(symFor == symFor2); // true

// find key of global symbol
const keyOfASym = Symbol.keyFor(symFor);
console.log("Symbol.keyFor(symFor) -> ", keyOfASym); // a

// find key of general symbol
const keyofAGeneralSym = sym.description;
console.log(keyofAGeneralSym); // a

// getOwnPropertySymbols: only show symbol property
const symbolKey = Object.getOwnPropertySymbols(testObj);
console.log("getOwnPropertySymbols -> ", symbolKey); //[ Symbol(a) ];

// Reflect.ownKeys: get whole key of object with symbol key
const allKeys = Reflect.ownKeys(testObj);
console.log("Reflect.ownKeys -> ", allKeys); // [ 'name', Symbol(a) ]
