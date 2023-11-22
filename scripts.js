document.addEventListener("DOMContentLoaded", function() {
    const ball = document.querySelector('.ball');
    const paddle = document.querySelector('.paddle');
    const bricksContainer = document.querySelector('.bricks');
    
    let ballX = 200;
    let ballY = 200;
    let ballSpeedX = 2;
    let ballSpeedY = 2;
    
    function updateBallPosition() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';
        
        // Check collision with walls
        if (ballX <= 0 || ballX + ball.offsetWidth >= 400) {
            ballSpeedX = -ballSpeedX;
        }
        if (ballY <= 0 || ballY + ball.offsetHeight >= 400) {
            ballSpeedY = -ballSpeedY;
        }

        // Check collision with paddle
        if (
            ballY + ball.offsetHeight >= paddle.offsetTop &&
            ballX + ball.offsetWidth >= paddle.offsetLeft &&
            ballX <= paddle.offsetLeft + paddle.offsetWidth
        ) {
            ballSpeedY = -ballSpeedY;
        }

        // Check collision with bricks
        const bricks = document.querySelectorAll('.brick');
        bricks.forEach(brick => {
            if (
                ballY <= brick.offsetTop + brick.offsetHeight &&
                ballY + ball.offsetHeight >= brick.offsetTop &&
                ballX + ball.offsetWidth >= brick.offsetLeft &&
                ballX <= brick.offsetLeft + brick.offsetWidth
            ) {
                brick.remove();
                ballSpeedY = -ballSpeedY;
            }
        });
    }

    function gameLoop() {
        updateBallPosition();
        requestAnimationFrame(gameLoop);
    }

    function initBricks() {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const brick = document.createElement('div');
                brick.classList.add('brick');
                brick.style.top = i * 30 + 'px';
                brick.style.left = j * 90 + 'px';
                bricksContainer.appendChild(brick);
            }
        }
    }

    function movePaddle(event) {
        const mouseX = event.clientX;
        paddle.style.left = mouseX - paddle.offsetWidth / 2 + 'px';
    }

    initBricks();
    gameLoop();

    document.addEventListener('mousemove', movePaddle);
});
