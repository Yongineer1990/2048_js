var table = document.getElementById("jsTable");
var data = [];
var score = document.getElementById("jsScore");

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
