let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

let paddleHeight = 12;
let paddleWidth = 50;

let paddleX = (canvas.width - paddleWidth) / 2;


let rightPressed = false;
let leftPressed = false;

let brickRowCount = 4;
let brickColumnCount = 7;
let brickWidth = 72;
let brickHeight = 24;
let brickPadding = 12;
let brickOffsetTop = 32;
let brickOffsetLeft = 32;

let score = 0;


let bricks = [];
for (i = 0; i < brickColumnCount; i++) {
  bricks[i] = [];
  for (j=0; j < brickRowCount; j++) {
    bricks[i][j] = {x: 0, y: 0, status: 1};
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
    if(e.keyCode === 39){
        rightPressed = true;
    }
    else if (e.keyCode === 37){
        leftPressed = true;
    }
}
function keyUpHandler(e){
    if(e.keyCode === 39){
        rightPressed = false;
    }
    else if (e.keyCode === 37){
        leftPressed = false;
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function drawBricks(){
    for (i = 0; i < brickColumnCount; i++) {
        for (j=0; j < brickRowCount; j++) {
          if (bricks[i][j].status === 1) {
            let brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
            let brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[i][j].x = brickX;
            bricks[i][j].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#8500 cc";
            ctx.fill();
            ctx.closePath();
          }
        }
      }
}

function drawScore(){
    ctx.font = "20x Arial";
    ctx.fillStyle = "#brown";
    ctx.fillText("Score: "+ score, 8, 20);
}

function collisionDetection(){
    for (i = 0; i < brickColumnCount; i++) {
        for (j=0; j < brickRowCount; j++) {
          let b = bricks[i][j];
          if (b.status === 1) {
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                dy = -dy;
                b.status = 0;
                score++;
                if(score === brickRowCount * brickColumnCount){
                    alert("YOU WIN, CONGRATULATIONS!");
                    document.location.reload();
                }
            }
          }
        }
      }
}

function draw(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore();
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx;
    }
    if(y + dy < ballRadius){
        dy = -dy;
    }
    else if(y + dy > canvas.height - ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        }
        else{
            alert("GAME OVER");
            document.location.reload();
        }
    }

    if(y + dy > canvas.height - ballRadius || y + dy < ballRadius){
        dy = -dy;
    }
    if(rightPressed && paddleX < canvas.width - paddleWidth){
        paddleX += 4;
    }
    else if (leftPressed && paddleX > 0){
        paddleX -= 4;
    }

    x += dx;
    y += dy;
}


setInterval(draw, 6);
