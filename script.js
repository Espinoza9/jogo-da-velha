var canvas = document.getElementById("jogo");
var ctx = canvas.getContext('2d');

var boardSize = 600;
var block = 3;
var blockSize = boardSize / block;
var currentPlayer = 1;
game = [];
function initGame() {
    ctx.clearRect(0, 0, boardSize, boardSize);
    game = [];
    for (let x = 0; x < block; x++) {
        game.push([]);
        for (let y = 0; y < block; y++) {
            game[x].push(0);
        }
    }
}
function paintBoard() {
    initGame();
    ctx.lineWidth = 3;
    ctx.beginPath();


    for (var i = 1; i < block; i++) {
        ctx.moveTo(blockSize * i, 0);
        ctx.lineTo(blockSize * i, boardSize);

        ctx.moveTo(0, blockSize * i);
        ctx.lineTo(boardSize, blockSize * i);

    }
    ctx.stroke();

}

function drawX(x, y) {
    ctx.beginPath();
    ctx.lineWidth = 5;

    x = x * blockSize;
    y = y * blockSize;

    offset = 50;

    ctx.moveTo(x + offset, y + offset);
    ctx.lineTo(x + blockSize - offset, y + blockSize - offset);

    ctx.moveTo(x + offset, y + blockSize - offset);
    ctx.lineTo(x + blockSize - offset, y + offset);

    ctx.stroke();
}


function drawO(x, y) {
    ctx.beginPath();


    x = x * blockSize + blockSize / 2;
    y = y * blockSize + blockSize / 2;
    offset = 50;
    radius = (blockSize / 2) - offset;


    ctx.arc(x, y, radius, 0, 2 * Math.PI);

    ctx.stroke();

}
function checkWin() {
    let transversal = 0;
    let invertido = 0;
    for (let x = 0; x < block; x++) {
        let vertical = 0;
        let horinzontal = 0;
        transversal += game[x][x];
        invertido += game[x][block - 1 - x];

        for (let y = 0; y < block; y++) {
            vertical += game[x][y];
            horinzontal += game[y][x];
        }
        if (vertical == block || vertical == -block) {
            return true;
        }
        if (horinzontal == block || horinzontal == -block) {
            return true;
        }
    }
    if (transversal == block || transversal == -block) {
        return true;
    } if (invertido == block || invertido == -block) {
        return true;
    }

    return false;
}
function checklost() {
    for (let x = 0; x < block; x++) {
        for (let y = 0; y < block; y++) {
            if (game[x][y] == 0) {
                return false;
            }
        }
    }

    return true
}

function play({ x, y }) {
    if (currentPlayer == 0) {
        paintBoard();
        currentPlayer = 1;
    }
    if (game[x][y] != 0) {
        return;
    }
    if (currentPlayer == 1) {
        drawX(x, y);
    }
    else if (currentPlayer == -1) {
        drawO(x, y);
    }
    game[x][y] = currentPlayer;
    if (checkWin()) {
        alert(`${currentPlayer == 1 ? 'x' : 'O'} ganhou`);
        currentPlayer = 0;
    }
    else if (checklost()) {
        alert(`Deu velha`);
        currentPlayer = 0;
    }
    else {

        currentPlayer *= -1;
    }
}
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();

    const position = {
        x: Math.floor((event.clientX - rect.left) / blockSize),
        y: Math.floor((event.clientY - rect.top) / blockSize),

    }

    play(position);
})


paintBoard();