var table = document.getElementById("jsTable");
var data = [];
var score = document.getElementById("jsScore");

//테이블 초기화
function init() {
  // DocumentFragment : 메모리상에만 존재하는 빈 문서 템플릿
  var fragment = document.createDocumentFragment();
  // [].forEach(callbackfn, thisArg) : thisArg을 참조하여 callbackfc을 array 요소 각각에 대해 실행함
  [1, 2, 3, 4].forEach(function () {
    var col = [];
    data.push(col); //배열 끝에 요소 추가
    var tr = document.createElement("tr");
    [1, 2, 3, 4].forEach(function () {
      col.push(0);
      var td = document.createElement("td");
      tr.appendChild(td); // appendChild : 선택한 요소 안에 자식 요소 추가
    });
    fragment.appendChild(tr);
  });
  table.appendChild(fragment);
}

//블럭 랜덤 생성
function randomCreateBlock() {
  var emptySpace = [];
  data.forEach(function (col, i) {
    col.forEach(function (row, j) {
      if (!row) {
        emptySpace.push([i, j]);
      }
    });
  });
  if (emptySpace.length === 0) {
    alert("Game Over: " + score.textContent);
    table.innerHTML = "";
    init();
  } else {
    var randomSpace = emptySpace[Math.floor(Math.random() * emptySpace.length)];
    data[randomSpace[0]][randomSpace[1]];
    paintingBlock();
  }
}

//블럭배치
function paintingBlock() {
  data.forEach(function (col, i) {
    col.forEach(function (row, j) {
      if (col > 0) {
        table.children[i].children[j].textContent = row;
      } else {
        table.children[i].children[j].textContent = "";
      }
    });
  });
}

init();
randomCreateBlock();
paintingBlock();

var dragStart = false;
var dragStatus = false;
var startPoint;
var endPoint;

//window : 브라우저의 요소들과 자바스크립트 엔진, 그리고 모든 변수를 담고 있는 객체

//브라우저에서 클릭했다면 dragStart변수의 값을 참으로 저장하고 브라우저의 좌표값을 startPoint 변수에 저장
window.addEventListener("mousedown", function (e) {
  dragStart = true;
  // clientX(Y) : 브라우저 페이지에서의 X(Y)좌표 위치를 반환, 스크롤해도 좌표값은 변하지 않음
  startPoint = [e.clientX, e.clientY];
});

//브라우저에서 마우스를 움직였고 dragStart변수값이 참이라면 dragStatus변수의 값을 참으로 저장
window.addEventListener("mousemove", function (e) {
  if (dragStart) {
    dragStatus = true;
  }
});

window.addEventListener("mouseup", function (e) {
  endPoint = [e.clientX, e.clientY];
  if (dragStatus) {
    var direction;
    var xCalPoint = endPoint[0] - startPoint[0];
    var yCalPoint = endPoint[1] - startPoint[1];
  }
});
