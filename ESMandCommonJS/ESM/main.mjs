import * as a from "./a.mjs";
import * as b from "./b.mjs";

console.log("### a => ", a);
console.log("### b => ", b);

// ESM의 모듈 resolution 방법
// 1. 파싱 : import 구문을 찾고 재귀적으로 각 파일로부터 모든 모듈의 내용을 적재 (재귀의 기준은 현재 파일)
// 2. 인스턴스화 : export 된 모든 개체들에 대해 명명된 참조를 메모리에 유지, 모든 import 와 export 에 대한
// 참조가 생성되어 이들 간의 종속성 관계를 추적, 이 떄 파일들은 실행되지 않음
// 3. 평가 : 파일들을 실행하여 실제 사용되는 값들을 알아냄

// ### 실행순서 ###
// 1단계 : 파싱
// 1. main.mjs에서 첫 번째 import문을 만나서 a.mjs로 곧바로 이동
// 2. a.mjs에서 첫 번째 import문을 만나서 b.mjs로 곧바로 이동
// 3. b.mjs에서 첫 번째 import문을 만났지만 이미 방문한 a.mjs 이기 때문에 skip, 더 이상 import 문이 없기 때문에 a.mjs로 돌아옴
// 4. a.mjs 또한 더 이상의 import문을 가지고 있지 않기 때문에 main.mjs로 돌아옴
// 5. main.mjs 두 번째 import문을 만났지만 이미 방문한 b.mjs 이기 때문에 skip, 더 이상 import 문이 없기 때문에 파싱 단계 종료

// 결과 : main.mjs -> a.mjs -> b.mjs 순으로 참조되는 선형적인 구조가 그려짐
// ===========

// 2단계 : 인스턴스화
// 파싱 단계 결과 값으로 나온 선형적인 결과 값의 역순으로 진행
// 1. b.mjs 에서 loaded 값과 a 를 export 하는 것을 포착
// 2. a.mjs 에서 loaded 값과 b 를 export 하는 것을 포착
// 3. main.mjs 에서 export 하는 것이 없음을 확인
// 4. export map 은 export 된 요소들의 이름만 기록, 아직 인스턴스화가 되지는 않음
// 5. b.mjs 는 export map 에서 aModule 이름으로 a.mjs 를 연결
// 6. a.mjs 는 export map 에서 bModule 이름으로 b.mjs 를 연결
// 7. main.mjs 는 a -> a.mjs / b -> b.mjs 를 연결
// 주의할 점 : 인스턴스화 단계에서는 모든 값이 인스턴스화 되지는 않음
// 평가 단계에서 파일을 실행함으로 실제로 사용하는 data를 인스턴스화 시킴
// 결과 : import 와 export 에 대한 참조가 생겨 main.mjs, a.mjs, b.mjs 간의 종속관계가 형성됨
// =====

// 3단계 : 평가
// 3단계는 따로 설명할 필요없이 파일들을 실행시켜서 실제 사용하는 값들의 평가를 진행한다.
// 이 때에도 1단계에서 형성된 선형 구조의 역순으로 평가가 진행된다.
