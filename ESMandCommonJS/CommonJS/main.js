const a = require("./a");
const b = require("./b");
console.log("### module a => ", JSON.stringify(a, null, 2));
console.log("### module b => ", JSON.stringify(b, null, 2));

// ### 실행순서 ###
// 1. 모듈 a를 불러옴
// 2. a.js에서 처음으로 exports 되는 값인 loaded를 false로 설정
// 3. a.js에서 b를 불러옴
// 4. b.js에서 처음으로 exports 되는 값인 loaded를 false로 설정
// 5. b.js에서 a를 불러옴
// 6. a.js는 처리가 되었으므로 내보내지는 값들은 b에 복사 (아마 a에서 처음으로 exports되는 loaded 값으로 추정)
// 7. b.js에서 마지막으로 loaded를 true로 변경
// 8. b.js는 끝났으니 a.js로 제어권이 돌아옴. 현재의 b.js의 상태 값을 복사하여 a.js로 가져옴
// 9. a.js에서 마지막으로 loaded를 true로 변경
// 10. a.js는 실행완료, 제어권은 main.js로 넘어옴, a.js의 상태를 main.js 내부로 가져옴
// 11. b.js를 불러오는데 캐싱된 것이 있으니 캐싱된 데이터를 사용
// 12. b.js의 현재 상태를 main.js 내부로 가져옴
