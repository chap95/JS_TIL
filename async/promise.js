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
