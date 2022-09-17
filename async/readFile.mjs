import { readFile } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const cache = new Map();

function inconsistentRead(fileName, callback) {
  if (cache.has(fileName)) {
    callback(cache.get(fileName));
  } else {
    readFile(fileName, "utf-8", (err, data) => {
      console.log("data => ", data, `\nerror => `, err, "\n=======");
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

reader1.onDataReady((data) => {
  console.log(`### First Call of Data => `, data);

  // 아래 부분은 실행되지 않음
  // reader1 을 만들면서 캐싱된 값을 사용함
  // 캐싱된 부분을 가져오는 함수는 동기적으로 동작함
  // 그렇기 때문에 inconsistentRead 함수의 callback 이 먼저 실행이 됨
  // listenerList 아직 빈 배열이기 때문에 listener 에 아무것도 전달이 되지 않음
  // onDataReady, 즉 listenerList를 만들어 주는 함수는 inconsistenceRead 함수의 callback이 실행된 후에
  // 실행이 되기 때문에 두번째 data는 console 창에 찍히지 않음
  const reader2 = createFileReader(resolvedFilePath);
  console.log("5-reader2");
  reader2.onDataReady((data) => {
    console.log(`### Second Call of Data => `, data);
  });
});
