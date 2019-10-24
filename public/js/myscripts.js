// function changeColor() {
//     alert("Hello! I am an alert box!!");
// }


var res = [];
var final_queens = [];
var timeOut = [];


function boardCreate(n){
    if (document.getElementById("board") != null) {
        document.getElementById("board").remove();
    }
    var tbl  = document.createElement('table');
    var container = document.getElementById("boardContainer");
    tbl.id = "board";
    // tbl.className = "table";

    var size = Math.floor(container.offsetWidth / n - 1) + "px";

    var rows = n, cols = n;
    for(var i = 0; i < rows; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < cols; j++){
            var td = tr.insertCell();
            td.className = "unvisited";
            td.setAttribute("onclick", "myFunction(event);");
            td.id = i * rows + j;
            td.style.width = size;
            td.style.height = size;
        }
    }
    container.appendChild(tbl);
    stopFunc();
}

function nQueens(n) {
    if (document.getElementById("hint") == null) {
        var container = document.getElementById("inputContainer");
        var p  = document.createElement('h5');
        p.id = 'hint';
        p.innerHTML = "The White Cell represents the empty cells. The Pink Cell represents the occupied cells.<br>";
        container.appendChild(p);
    }


    res = [];
    final_queens = [];
    var queens = new Array(n);
    var board = Array(n);
    for (let i = 0; i < n; i ++) {
       board[i] = Array(n);
       for (let j = 0; j < n; j ++) {
           board[i][j] = 0;
       }
    }
    solve(queens, n, 0);
    // console.table(final_queens);

    // console.log(board);
    showSteps(res, board);


};

showQueens = function(row) {
    stopFunc();
    var queens = final_queens[row.id.substring(4)];
    console.log(queens);
    var n = queens.length;
    var index;
    // clear the board
    for (let i = 0; i < n; i ++) {
        for (let j = 0; j < n; j ++) {
            document.getElementById(i * n + j).className = "unvisited";
        }
    }
    // draw the queens
    for (let i = 0; i < queens.length; i ++) {
        document.getElementById(i * n + queens[i]).className = "queens";
    }

}


showResult = function(res, n) {
   if (document.getElementById("result") != null) {
       document.getElementById("result").remove();
   }
   console.log(n);
   var tbl  = document.createElement('table');
   tbl.className = "table table-dark";
   tbl.id = "result";
   var container = document.getElementById("inputContainer");
   var wid = Math.floor(container.offsetWidth / n / 2) + "px";
   var th = document.createElement('th');
   th.setAttribute("colspan", n);
   th.innerHTML = "Final Queens Positions (Click rows to show solutions)";
   th.className = "align-middle";
   tbl.createTHead().appendChild(th);
   // tbl.className = "table";
   var rows = res.length, cols = n;
   for(var i = 0; i < rows; i++){
       var tr = tbl.insertRow();
       tr.className = "resultRow";
       tr.id = "rows" + i.toString();
       tr.setAttribute("onclick", "showQueens(this);");
       for(var j = cols - 1; j >= 0; j--){
           var str = j.toString() + ", " + res[i][j].toString();
           var td = tr.insertCell(str);
           td.appendChild(document.createTextNode(str));
           td.className = "align-middle";
       }
   }
   container.appendChild(tbl);
};




showSteps = function(steps, board) {
   var timed = document.getElementById("time").value;
   var step;
   showResult(final_queens, board.length);

   for(let i = 0; i < steps.length; i++) {
      timeOut.push(setTimeout(() => {
          colorBoard(board, steps[i][0].toString(), steps[i][1]);
      }, i * timed));
      step = i;
    }

};

stopFunc = function() {
   for (let i = 0; i < timeOut.length; i ++) {
       clearTimeout(timeOut[i]);
   }
}

colorBoard = function(board, index, flag) {
   // document.getElementById(index).className = "visited";
   // console.log(flag);
   if (flag == 1) {
       document.getElementById(index).className = "queens";
   }
   else {
       document.getElementById(index).className = "unvisited";
   }

   const n = board.length;
   const row = ~~(index / n);
   const col = index % n;

   for (let i = 0; i < n; i ++) {
       for (let j = 0; j < n; j ++) {
           if (i == row && j == col) {
               continue;
           }
           if (i == row || j == col || i + j == row + col || i + col == row + j) {
               // console.log(row.toString() + col.toString() + i.toString() + j.toString());
               board[i][j] += flag;
               // console.log(board[i][j]);
               if (board[i][j] > 0) {
                   document.getElementById(i * n + j).className = "occupied";
               }
               else {
                   document.getElementById(i * n + j).className = "unvisited";
               }
           }
       }
       // console.table(board);
   }

};


function myFunction(event) {
    // alert(event.target);
    if (event.target.className == 'unvisited') {
        event.target.className = 'queens';
    }
    else {
        event.target.className = 'unvisited';
    }
}


var solve = function(queens, n, pos) {
    // console.log(n.toString() + pos.toString());
    if(pos == n) {
        console.log("queens");
        final_queens.push([...queens])
        return;
    }

    for(var i = 0; i < n; i++) {
        if(isValid(queens, pos, i)) {
            queens[pos] = i;

            // console.log(pos * n + i);
            res.push([pos * n + i, 1])
            solve(queens, n, pos + 1);
            res.push([pos * n + i, -1])

        }
    }
};

var isValid = function(queens, pos, col) {
    for(var i = 0; i < pos; i++) {
        var j = queens[i];
        if(j === col || (pos + col) === (i + j) || (pos + j) === (i + col)) {
            return false;
        }
    }
    return true;
};
