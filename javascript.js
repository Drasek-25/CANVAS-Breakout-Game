let canvas = document.getElementById("myCanvas");
//600x800
let ctx = canvas.getContext("2d");

let frameRate = 10;
let paddleElevation = 78;
let x = canvas.width / 2;
let y = canvas.height - paddleElevation;

let score = 0;
let livesRemaining = 3;
let ballSpeed = 4;
let ballx = ballSpeed;
let bally = -ballSpeed;
let ballRad = 8;

let paddleSpeed = 8;
let paddleWidth = 80;
let paddleHeight = 12;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleWidthHold = paddleWidth;

let blockWidth = 30;
let blockHeight = 15;
let blockGroupMargin = 30;
let blockArrayWidth = 16;
let blockArrayHeight = 16;
4;
let blockX;
let blockY;
let blockWidthSpacer =
   (canvas.width - blockGroupMargin * 2 - blockWidth * blockArrayWidth) /
   (blockArrayWidth - 1);
let blockHeightSpacer = blockHeight + blockWidthSpacer;
let blocksRemaining = 0;

const level1 = [
   [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
   [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
   [0, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0, 0],
   [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
   [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1],
   [1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
   [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 0],
   [0, 0, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
   [0, 0, 0, 0, 1, 1, 1, 1, 3, 1, 1, 1, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const level2 = [
   [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0],
   [0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0],
   [0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0],
   [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
   [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
   [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
   [0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 2, 0, 0],
   [0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 2, 0, 0, 0],
   [0, 0, 0, 0, 2, 0, 3, 3, 3, 3, 0, 2, 0, 0, 0, 0],
];
const level3 = [
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
];
let blockArray = level1.map((i) => {
   return i.slice();
});
blocksRemain();
function blocksRemain() {
   blocksRemaining = 0;
   for (a = 0; a < blockArray.length; a++) {
      for (b = 0; b < blockArray[a].length; b++) {
         if (blockArray[a][b] > 0) {
            blocksRemaining++;
         }
      }
   }
}

let spacePressed = false;
let rightPressed = false;
let leftPressed = false;
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
window.addEventListener("deviceorientation", handleOrientation);

function keyDownHandler(e) {
   if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
   } else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
   } else if (e.keyCode == "32" || e.key == "SpacePressed") {
      spacePressed = true;
   }
}
function keyUpHandler(e) {
   if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
   } else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
   } else if (e.keyCode == "32" || e.key == "SpacePressed") {
      spacePressed = false;
   }
}

function handleOrientation(e) {
   const mobileYRange = 3.5;
   let mobileY = e.alpha;
   if (mobileY < -mobileYRange) {
      leftPressed = true;
   } else if (mobileY > mobileYRange) {
      rightPressed = true;
   } else {
      leftPressed = false;
      rightPressed = false;
   }
}

function drawBall() {
   ctx.beginPath();
   ctx.arc(x, y, ballRad, 0, Math.PI * 2);
   ctx.fillStyle = "red";
   ctx.fill();
   ctx.closePath();
}

function drawPaddle() {
   ctx.beginPath();
   ctx.rect(
      paddleX,
      canvas.height - paddleElevation,
      paddleWidth,
      paddleHeight
   );
   ctx.fillStyle = "blue";
   ctx.fill();
   ctx.closePath();
}

function drawBlock() {
   ctx.beginPath();
   ctx.rect(blockX, blockY, blockWidth, blockHeight);
   ctx.fillStyle = "green";
   ctx.fill();
   ctx.closePath();
}

function startStop(elem) {
   paused = false;
   menuChange(0, elem.parentNode.id);
}
function menuChange(num, elem) {
   if (num === 0) {
      document.getElementById(elem).style.display = "none";
   } else if (num === 1) {
      document.getElementById(elem).style.display = "flex";
   }
}

function restartGame() {
   livesRemaining = 3;
   document.getElementById("lives").innerHTML = livesRemaining;
   blockArray.length = 0;
   blockArray = level1.map((i) => {
      return i.slice();
   });
   paddleWidth = paddleWidthHold;
   powerUpArray = [];
   score = 0;
   blocksRemain();
}

let powerUpSpeed = 2;
let powerUpArray = [];
let powerUpCounter = 0;
let powerUpRad = 12;
function powerUp(arr) {
   powerUpCounter++;
   powerUpArray.push([`powerUp${powerUpCounter}`, arr[0], arr[1], arr[2]]);
}

let laserBall = false;
function getPowerUp(num) {
   if (num === 2) {
      if (paddleWidth - 1 < paddleWidthHold) {
         paddleWidth += paddleWidth;
      }
      setTimeout(() => {
         paddleWidth = paddleWidthHold;
      }, 10000);
   } else if (num === 3) {
      laserBall = true;
      setTimeout(() => {
         laserBall = false;
      }, 10000);
   } else if (num === 4) {
   }
}

function drawPowerUp(a, b) {
   ctx.beginPath();
   ctx.arc(a + blockWidth / 2, b + blockWidth / 2, powerUpRad, 0, Math.PI * 2);
   ctx.fillStyle = "Blue";
   ctx.fill();
   ctx.closePath();
}

let currentLevel = 1;
function nextLevel() {
   menuChange(1, "pauseMenu");
   x = canvas.width / 2;
   y = canvas.height - paddleElevation - ballRad - ballSpeed;
   paddleX = (canvas.width - paddleWidth) / 2;
   paused = true;
   currentLevel += 1;
   if (currentLevel === 2) {
      blockArray = level2.map((i) => {
         return i.slice();
      });
   }
   if (currentLevel === 3) {
      blockArray = level3.map((i) => {
         return i.slice();
      });
   }
   blocksRemain();
}

//Primary Game Loop
let paused = true;
function draw() {
   function togglePause() {
      if (paused === true) {
         if (spacePressed === true) {
            paused = false;
         }
      } else if (paused === false) {
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         drawBall();
         drawPaddle();

         x += ballx;
         y += bally;

         //powerups draw loop
         //[0] is name [1] is powerup type [2] is x [3] is y
         powerUpArray.forEach((i, a) => {
            i[3] += powerUpSpeed;
            drawPowerUp(i[2], i[3]);
            if (
               i[3] + powerUpRad >= canvas.height - paddleElevation &&
               i[3] - powerUpRad <= canvas.height - paddleElevation &&
               i[2] + powerUpRad > paddleX &&
               i[2] - powerUpRad < paddleX + paddleWidth
            ) {
               getPowerUp(i[1]);
               powerUpArray.splice(a, 1);
            } else if (i[3] + powerUpRad > canvas.height) {
               powerUpArray.splice(a, 1);
            }
         });

         blockY = 10;
         let blockArrayExisting = [];
         //Block generator
         for (a = 0; blockArray.length - 1 >= a; a++) {
            blockX = blockGroupMargin - (blockWidth + blockWidthSpacer);
            blockY += blockHeightSpacer;
            blockArrayExisting.push([]);
            for (b = 0; blockArray[a].length - 1 >= b; b++) {
               if (b === 0 && blockArray[a][b] !== 0);
               blockX += blockWidth + blockWidthSpacer;
               blockArrayExisting[a].push([blockArray[a][b], blockX, blockY]);
               if (blockArray[a][b] !== 0) {
                  drawBlock();
               }
            }
         }
         //win condition

         if (blocksRemaining === 0) {
            nextLevel();
         }

         //brick Collision
         for (c = 0; c <= blockArrayExisting.length - 1; c++) {
            for (d = 0; d <= blockArrayExisting[c].length - 1; d++) {
               if (blockArrayExisting[c][d][0] !== 0) {
                  if (
                     y + ballRad >= blockArrayExisting[c][d][2] + blockHeight &&
                     y - ballRad <= blockArrayExisting[c][d][2] + blockHeight &&
                     x + ballRad >= blockArrayExisting[c][d][1] &&
                     x - ballRad <= blockArrayExisting[c][d][1] + blockWidth
                  ) {
                     //bottom side brick horizontal collision
                     if (laserBall === false) {
                        bally = -bally;
                     }
                     if (blockArrayExisting[c][d][0] > 1) {
                        powerUp(blockArrayExisting[c][d]);
                     }
                     blockArray[c].splice(d, 1, 0);
                     blocksRemaining--;
                     score++;
                     break;
                  } else if (
                     y + ballRad >= blockArrayExisting[c][d][2] &&
                     y - ballRad <= blockArrayExisting[c][d][2] &&
                     x + ballRad >= blockArrayExisting[c][d][1] &&
                     x - ballRad <= blockArrayExisting[c][d][1] + blockWidth
                  ) {
                     //top side brick horizontal collision
                     if (laserBall === false) {
                        bally = -bally;
                     }
                     if (blockArrayExisting[c][d][0] > 1) {
                        powerUp(blockArrayExisting[c][d]);
                     }
                     blockArray[c].splice(d, 1, 0);
                     blocksRemaining--;
                     score++;
                     break;
                  } else if (
                     y + ballRad >= blockArrayExisting[c][d][2] &&
                     y - ballRad <= blockArrayExisting[c][d][2] + blockHeight &&
                     x + ballRad >= blockArrayExisting[c][d][1] &&
                     x - ballRad <= blockArrayExisting[c][d][1]
                  ) {
                     //left side brick collision
                     if (laserBall === false) {
                        bally = -bally;
                     }
                     if (blockArrayExisting[c][d][0] > 1) {
                        powerUp(blockArrayExisting[c][d]);
                     }
                     blockArray[c].splice(d, 1, 0);
                     blocksRemaining--;
                     score++;
                     break;
                  } else if (
                     y + ballRad >= blockArrayExisting[c][d][2] &&
                     y - ballRad <= blockArrayExisting[c][d][2] + blockHeight &&
                     x + ballRad >= blockArrayExisting[c][d][1] + blockWidth &&
                     x - ballRad <= blockArrayExisting[c][d][1] + blockWidth
                  ) {
                     //right side brick collision
                     if (laserBall === false) {
                        bally = -bally;
                     }
                     if (blockArrayExisting[c][d][0] > 1) {
                        powerUp(blockArrayExisting[c][d]);
                     }
                     blockArray[c].splice(d, 1, 0);
                     blocksRemaining--;
                     score++;
                     break;
                  }
               }
            }
            document.getElementById("score").innerHTML = score;
         }

         // paddle controls
         if (rightPressed) {
            paddleX += paddleSpeed;
            if (paddleX + paddleWidth > canvas.width) {
               paddleX = canvas.width - paddleWidth;
            }
         } else if (leftPressed) {
            paddleX -= paddleSpeed;
            if (paddleX < 0) {
               paddleX = 0;
            }
         }

         //boundry collision
         if (x + ballx > canvas.width - ballRad || x + ballx < ballRad) {
            ballx = -ballx;
         } else if (
            y + bally > canvas.height - ballRad ||
            y + bally < ballRad
         ) {
            bally = -bally;
            //paddle collision
         } else if (
            y + bally == canvas.height - paddleElevation &&
            x + ballRad > paddleX &&
            x - ballRad < paddleX + paddleWidth
         ) {
            bally = -bally;
            //Not sure if i want to use the X changing paddle or not, it feels funny atm
            // if (rightPressed === true) {
            //     ballx>6 ? ballx = ballx : ballx +=1;
            // } else if (leftPressed === true){
            //     ballx<-6 ? ballx = ballx : ballx -=1;
            // }

            // -1 life below
         } else if (y + bally > canvas.height - paddleElevation + 20) {
            livesRemaining--;
            document.getElementById("lives").innerHTML = livesRemaining;
            x = canvas.width / 2;
            y = canvas.height - paddleElevation - ballRad - ballSpeed;
            paddleX = (canvas.width - paddleWidth) / 2;
            paused = true;
            powerUpArray = [];
            if (livesRemaining <= 0) {
               menuChange(1, "gameOverMenu");
               restartGame();
            } else {
               menuChange(1, "pauseMenu");
            }
         }
      }
   }
   togglePause();
}
setInterval(draw, frameRate);
