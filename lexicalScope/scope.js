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