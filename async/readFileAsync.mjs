import { readFile } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const cache = new Map();

function inconsistentRead(fileName, callback) {
  if (cache.has(fileName)) {
    // proccess.nextTick 함수를 통해서 캐싱된 fileName을 가져오는 로직이
    // inconsistentRead 함수 바로 다음에 실행이 됨
    // process.nextTick은 현재 실행하는 함수 다음에 바로 nextTick 인자로 전달된 callback이 실행될 수 있게
    // Event Queue 맨 앞으로 callback 함수를 넣어버림
    // inconsistentRead 함수가 실행이 종료되면 제어권이 event loop로 반환이 되는데
    //
    process.nextTick(() => callback(cache.get(fileName)));
  } else {
    readFile(fileName, "utf-8", (err, data) => {
      console.log(
        "fileName => ",
        fileName,
        "\ndata => ",
        data,
        `\nerror => `,
        err,
        "\n==========="
      );
      cache.set(fileName, data);
      callback(data);
    });
  }
}

function createFileReader(fileName) {
  const listenerList = [];
  console.log("1");

  inconsistentRead(fileName, (value) => {
    console.log("2");
    listenerList.forEach((listener) => listener(value));
  });

  console.log("3");

  return {
    onDataReady: (listener) => {
      console.log("4");
      return listenerList.push(listener);
    },
  };
}

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);
const resolvedFilePath = path.resolve(__dirname + "/sample.txt");
const reader1 = createFileReader(resolvedFilePath);
console.log("5 - reader1");

reader1.onDataReady((data) => {
  console.log(`### First Call of Data => `, data);

  const reader2 = createFileReader(resolvedFilePath);
  console.log("5 - reader2");
  reader2.onDataReady((data) => {
    console.log(`### Second Call of Data => `, data);
  });
});
