var table = document.getElementById("jsTable");
var block = [];
var score = document.getElementById("jsScore");

//테이블 초기화
function init() {
  // DocumentFragment : 메모리상에만 존재하는 빈 문서 템플릿
  var fragment = document.createDocumentFragment();
  // [].forEach(callbackfn, thisArg) : thisArg을 참조하여 callbackfc을 array 요소 각각에 대해 실행함
  [1, 2, 3, 4].forEach(function () {
    var col = [];
    block.push(col); //배열 끝에 요소 추가
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
  var emptyBlock = [];
  block.forEach(function (col, i) {
    col.forEach(function (row, j) {
      if (!row) {
        emptyBlock.push([i, j]);
      }
    });
  });
  if (emptyBlock.length === 0) {
    alert("Game Over: " + score.textContent);
    table.innerHTML = "";
    init();
  } else {
    var randomSpace = emptyBlock[Math.floor(Math.random() * emptyBlock.length)];
    block[randomSpace[0]][randomSpace[1]] = 2;
    paintingBlock();
  }
}

//블럭배치
function paintingBlock() {
  block.forEach(function (col, i) {
    col.forEach(function (row, j) {
      if (row > 0) {
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

//브라우저에서 마우스 버튼을 눌렀다면 dragStart변수의 값을 참으로 저장하고 브라우저의 좌표값을 startPoint 변수에 저장
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

// 브라우저에서 마우스 버튼을 뗏을때 좌표값을 endPoint변수에 저장하고
window.addEventListener("mouseup", function (e) {
  endPoint = [e.clientX, e.clientY];
  if (dragStatus) {
    var direction;

    // x,y의 끝지점과 시작지점의 차를 구함
    // x가 음수면 왼쪽 양수면 오른쪽
    // y가 음수면 위로 양수면 아래
    var xCalPoint = endPoint[0] - startPoint[0];
    var yCalPoint = endPoint[1] - startPoint[1];
    this.console.log("xcalpoint : ", xCalPoint);
    this.console.log("ycalpoint : ", yCalPoint);

    // x의 절대값을 피제수, y의 절대값을 제수로 하였을때 제수가 작을수록 몫은 무한대에 수렴하고 제수가 클수록 몫은 0에 수렴한다.
    // 따라서 1보다 작으면 상/하 방향, 1보다 크면 좌우 방향이라고 판단
    // Math.abs() : 절대값
    var degree = Math.abs(xCalPoint) / Math.abs(yCalPoint);
    this.console.log("degree : ", degree);

    // && : AND 연산자
    if (xCalPoint < 0 && degree > 1) {
      direction = "left";
    } else if (xCalPoint > 0 && degree > 1) {
      direction = "right";
    } else if (yCalPoint < 0 && degree < 1) {
      direction = "up";
    } else if (yCalPoint > 0 && degree < 1) {
      direction = "down";
    }
    this.console.log(direction);
  }
  dragStart = false;
  dragStatus = false;

  // 블럭의 값을 담고 비교할 2차원의 빈 배열을 생성 후 각 방향 끝에 있는 값과 더이상 합산이 불가능 할때까지 비교
  // 값이 참이라면 합산 후 점수(합산결과) 증가, 거짓이면 비교값을 배열에 할당 (합산하지 않음)
  // 입력값이 왼쪽일때 행 배열의 끝에 있는 블럭과 비교
  // 입력값이 오른쪽일때 행 배열의 시작에 있는 블럭과 비교
  // 입력값이 위쪽일때 열 배열의 끝에 있는 블럭과 비교
  // 입력값이 아래쪽일때 열 배열의 시작에 있는 블럭과 비교

  // 합산이 완료되면 결과를 블럭 배열 방향에 저장하고 blockContainer의 값이 없다면 0을 블럭 배열에 저장 (init함수와 같음)

  switch (direction) {
    case "left":
      var blockContainer = [[], [], [], []];
      block.forEach(function (col, i) {
        col.forEach(function (row, j) {
          if (row) {
            if (
              blockContainer[i][blockContainer[i].length - 1] &&
              blockContainer[i][blockContainer[i].length - 1] === row
            ) {
              blockContainer[i][blockContainer[i].length - 1] *= 2;
              var getScore = parseInt(score.textContent, 10); //parseInt(str, n) : string을 n진법으로 치환
              score.textContent =
                getScore + blockContainer[i][blockContainer.length - 1];
            } else {
              blockContainer[i].push(row);
            }
          }
        });
      });
      this.console.log(blockContainer);
      [1, 2, 3, 4].forEach(function (col, i) {
        [1, 2, 3, 4].forEach(function (row, j) {
          block[i][j] = blockContainer[i][j] || 0;
        });
      });
      break;
    case "right":
      var blockContainer = [[], [], [], []];
      block.forEach(function (col, i) {
        col.forEach(function (row, j) {
          if (row) {
            if (blockContainer[i][0] && blockContainer[i][0] === row) {
              blockContainer[i][0] *= 2;
              var getScore = parseInt(score.textContent, 10);
              score.textContent = getScore + blockContainer[i][0];
            } else {
              blockContainer[i].push(row);
            }
          }
        });
      });
      this.console.log(blockContainer);
      [1, 2, 3, 4].forEach(function (col, i) {
        [1, 2, 3, 4].forEach(function (row, j) {
          block[i][3 - j] = blockContainer[i][j] || 0;
        });
      });
      break;
    case "up":
      var blockContainer = [[], [], [], []];
      block.forEach(function (col, i) {
        col.forEach(function (row, j) {
          if (row) {
            if (
              blockContainer[j][blockContainer[j].length - 1] &&
              blockContainer[j][blockContainer[j].length - 1] === row
            ) {
              blockContainer[j][blockContainer[j].length] *= 2;
              var getScore = parseInt(score.textContent, 10);
              score.textContent =
                getScore + blockContainer[j][blockContainer[j].length - 1];
            } else {
              blockContainer[j].push(row);
            }
          }
        });
      });
      this.console.log(blockContainer);
      [1, 2, 3, 4].forEach(function (col, i) {
        [1, 2, 3, 4].forEach(function (row, j) {
          block[j][i] = blockContainer[i][j] || 0;
        });
      });
      break;
    case "down":
      var blockContainer = [[], [], [], []];
      block.forEach(function (col, i) {
        col.forEach(function (row, j) {
          if (row) {
            if (blockContainer[j][0] && blockContainer[j][0] === row) {
              blockContainer[j][0] *= 2;
              var getScore = parseInt(score.textContent, 10);
              score.textContent = getScore + blockContainer[j][0];
            } else {
              blockContainer[j].push(row);
            }
          }
        });
      });
      this.console.log(blockContainer);
      [1, 2, 3, 4].forEach(function (col, i) {
        [1, 2, 3, 4].forEach(function (row, j) {
          block[3 - j][i] = blockContainer[i][j] || 0;
        });
      });
      break;
  }
  paintingBlock();
  randomCreateBlock();
});
