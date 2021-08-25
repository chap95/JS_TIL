function resolveAfter2s() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise is resolved");
    }, 2000);
  });
}

async function awaitFunc() {
  console.log("call resolve func");
  const result = await resolveAfter2s();
  console.log(result);
}

awaitFunc();


// console.log('Message no. 1: Sync');
// setTimeout(function() {
//    console.log('Message no. 2: setTimeout');
// }, 0);
// var promise = new Promise(function(resolve, reject) {
//    resolve();
// });
// promise.then(function(resolve) {
//    console.log('Message no. 3: 1st Promise');
// })
// .then(function(resolve) {
//    console.log('Message no. 4: 2nd Promise');
// });
// console.log('Message no. 5: Sync');

console.log('A');
setTimeout(function() {
   console.log('B');
}, 0);
var promise = new Promise(function(resolve, reject) {
   resolve();
});
promise.then(function(resolve) {
   console.log('C');
})
.then(function(resolve) {
   console.log('D');
});
console.log('E');