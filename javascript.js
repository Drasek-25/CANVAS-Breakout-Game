let canvas = document.getElementById("myCanvas");
//600x800
let ctx = canvas.getContext("2d");

let frameRate = 1;
let paddleElevation = 78;
let x = canvas.width / 2;
let y = canvas.height - paddleElevation;


let ballSpeed = 1;
let ballx = ballSpeed;
let bally = -ballSpeed;
let ballRad = 8;


let paddleSpeed = 3;
let paddleWidth = 80;
let paddleHeight = 12;
let paddleX = (canvas.width - paddleWidth) / 2;

let blockWidth = 30;
let blockHeight = 15;
let blockGroupMargin = 30;
let blockArrayWidth = 16;
let blockArrayHeight = 16;
let blockX;
let blockY;
let blockWidthSpacer = (((canvas.width - (blockGroupMargin * 2)) - (blockWidth * blockArrayWidth)) / (blockArrayWidth - 1));
let blockHeightSpacer = blockHeight + blockWidthSpacer;
console.log(blockWidthSpacer);
let blockArray = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];




let rightPressed = false;
let leftPressed = false;
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRad, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}


function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleElevation, paddleWidth, paddleHeight);
    //(pos     w  h)(w  x  h  object)
    ctx.fillstyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function drawBlock() {
    ctx.beginPath();
    ctx.rect(blockX, blockY, blockWidth, blockHeight);
    ctx.fillstyle = "blue";
    ctx.fill();
    ctx.closePath();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    x += ballx;
    y += bally;


    blockY = 10;
    let blockArrayExisting = [];

    for (a = 0; blockArray.length - 1 >= a; a++) {
        blockX = blockGroupMargin - (blockWidth + blockWidthSpacer);
        blockY += blockHeightSpacer;
        blockArrayExisting.push([]);
        for (b = 0; blockArray[a].length - 1 >= b; b++) {
            if (b === 0 && blockArray[a][b] !== 0);
            blockX += (blockWidth + blockWidthSpacer);
            blockArrayExisting[a].push([blockArray[a][b], blockX, blockY]);
            if (blockArray[a][b] !== 0) {
                drawBlock();
            }
        }
    }

    for (c = 0; c <= blockArrayExisting.length - 1; c++) {
        for (d = 0; d <= blockArrayExisting[c].length - 1; d++) {
            if (blockArrayExisting[c][d][0] !== 0) {
                //bottom of brick horizontal collision
                if ((y - ballRad == blockArrayExisting[c][d][2] + blockArrayHeight) && (x + ballRad >= blockArrayExisting[c][d][1]) && (x - ballRad <= blockArrayExisting[c][d][1] + blockWidth)) {
                    bally = -bally;
                    blockArray[c].splice(d, 1, 0);
                    // } else if ((y + bally == blockArrayExisting[c][d][2] + blockArrayHeight) && ((x >= blockArrayExisting[c][d][1]) && (x < blockArrayExisting[c][d][1] + blockWidth))) {
                    //     ballx = -ballx;
                    //     blockArray[c].splice(d, 1, 0);
                    // }
                }
            }
        }
    }



    if (rightPressed) {
        paddleX += paddleSpeed;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    }

    else if (leftPressed) {
        paddleX -= paddleSpeed;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }

    if ((x + ballx > canvas.width - ballRad) || (x + ballx < ballRad)) {
        ballx = -ballx;
    } else if ((y + bally > canvas.height - ballRad) || (y + bally < ballRad)) {
        bally = -bally;
    } else if ((y + bally == canvas.height - paddleElevation) && ((x > paddleX) && (x < paddleX + paddleWidth))) {
        bally = -bally;
    } else if (y + bally > canvas.height - paddleElevation) {
        console.log('loser');
    }
}



setInterval(draw, frameRate);

