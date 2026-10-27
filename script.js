let ca = document.getElementById("canvas");
let ctx = ca.getContext('2d');

let score = 0;

let player1 = 200;
let player2 = 200;
let ball = {
    x: 355,
    y: 235,
    speedX: 3,
    speedY: -2,
}

let key = {}
document.addEventListener('keydown', e => key[e.key] = true);
document.addEventListener('keyup', e => key[e.key] = false);

draw();

let startIntervall;
function start(){

    startIntervall = setInterval(loop, 1000/60);
    document.getElementById("play").style.display = "none";
    document.getElementById("gameover").style.display = "none";
}
function loop(){

    if(key["ArrowUp"] || key["w"]){
        player1 -= 5;
    }
    if(key["ArrowDown"] || key["s"]){
        player1 += 5;
    }

    let ballMitte = ball.y + 5;
    let player2Mitte = player2 + 40;

    if(ballMitte < player2Mitte - 5){
        player2 -= 4;
    }else if(ballMitte > player2Mitte +5){
        player2 += 4;
    }

    player1 = Math.max(0, Math.min(player1, 400));
    player2 = Math.max(0, Math.min(player2, 400));

    ball.x += ball.speedX;
    ball.y += ball.speedY;
    if (
        ball.speedX < 0 &&
        ball.x <= 20 &&
        ball.x + 10 >= 10 &&
        ball.y + 10 >= player1 &&
        ball.y <= player1 + 80
    ){
        ball.x = 20;
        ball.speedX = Math.abs(ball.speedX);
        ball.speedX += 0.1;
        ball.speedX = Math.min(10, ball.speedX);
        abprallenVonSpieler(player1);
        score += 1;
        document.getElementById("score").textContent = score;   
    }
    if (
        ball.speedX > 0 &&
        ball.x + 10 >= 700 &&
        ball.x <= 710 &&
        ball.y + 10 >= player2 &&
        ball.y <= player2 + 80
    ){
        ball.x = 690;
        ball.speedX = -Math.abs(ball.speedX) - 0.1;
        ball.speedX = Math.max(-10, ball.speedX);
        abprallenVonSpieler(player2);
    }

    if(ball.y <= 0){
        
        ball.y = 0;
        ball.speedY = Math.abs(ball.speedY);
    } else if(ball.y +10 >= 480){

        ball.y = 470;
        ball.speedY= -Math.abs(ball.speedY)
    }

    if(ball.x < 0|| ball.x > 720){
        ball = {    
            x: 355,
            y: 235,
            speedX: 3,
            speedY: -2,
        }
        player1 = 200 ;
        player2 = 200;
        score = 0;
        document.getElementById("score").textContent = score;
        clearInterval(startIntervall);
        document.getElementById("play").style.display = "flex";
        document.getElementById("gameover").style.display = "flex";
    }
}
function abprallenVonSpieler(playerY){

    let paddleMitte = playerY + 40;
    let treffpunkt = (ball.y + 5 - paddleMitte) / 40;
    treffpunkt = Math.max (-1, Math.min(1, treffpunkt));
    ball.speedY = treffpunkt * 5;
}
function draw() {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, 720, 480);
    ctx.fillStyle = "white";
    ctx.fillRect(10, player1, 10, 80);
    ctx.fillRect(700, player2, 10, 80);    
    ctx.fillRect(ball.x, ball.y, 10, 10);
    requestAnimationFrame(draw);
}
document.getElementById("play").addEventListener("click", start);