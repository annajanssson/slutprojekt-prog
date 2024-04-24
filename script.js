let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let centerY = canvas.height / 2
let centerX = canvas.width / 2
// let main = prompt("vad är ditt namn?")

let player = {
    // name: main,
    x: centerX - 70,
    y: centerY - 70,
    dx: 3, 
    dy: 3,
    direction: {
        left: false,
        right: false,
        up: false,
        down: false
    },
    circleSize: 20,
    hp: 100
}

bild = document.createElement("img");
bild.src = "vapen.png";
bild.classList.add("image");

let frameIndex = 0
const totalFrames = 2
const spriteWidth = 100
const spriteHeight = 100
const scale = 1.4

document.addEventListener("keydown", (e) => {
    if (e.key == "d") {
        player.direction.right = true;
    } 
    else if (e.key == "a") {
        player.direction.left = true;
    } 
    else if (e.key =="w") {
        player.direction.up = true;
    } 
    else if (e.key == "s") {
        player.direction.down = true;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key == "d") {
        player.direction.right = false;
    } else if (e.key == "a") {
        player.direction.left = false;
    } else if (e.key == "w") {
        player.direction.up = false;
    } else if (e.key == "s") {
        player.direction.down = false;
    }
});
let enemies = [];

function spawnEnemy() {
        let randomiser = Math.random()
        let randomX = 0
        let randomY = 0
    if (randomiser < 0.25){
        randomX = -50;
        randomY = Math.random() * canvas.height;
    } else if (randomiser < 0.5) {
        randomX = canvas.width + 50;
        randomY = Math.random() * canvas.height;
    } else if (randomiser < 0.75) {
        randomY = -50
        randomX = Math.random() * canvas.width;
    } else if (randomiser < 1) {
        randomY = canvas.height + 50;
        randomX = Math.random() * canvas.width;
    }
    let enemy = {
        x: randomX,
        y: randomY,
        dx: 2*(player.x - randomX) / Math.sqrt(Math.pow(player.x,2) + Math.pow(randomX,2)),
        dy: 2*(player.y - randomY) / Math.sqrt(Math.pow(player.y,2) + Math.pow(randomY,2)),
    }
    enemies.push(enemy);
}
    
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(-50, -50, canvas.width+100, canvas.height+100);


    if( player.direction.up == false && player.direction.down == false && player.direction.left == false && player.direction.right == false){
        ctx.drawImage(bild, 0 * spriteWidth, 0 * spriteHeight, spriteWidth, spriteHeight, player.x, player.y,  spriteWidth * scale, spriteHeight * scale) ;
    }
    if (player.direction.right && player.x + 100 < canvas.width) {
        player.x += player.dx;
        ctx.drawImage(bild, spriteWidth, spriteHeight, spriteWidth, spriteHeight, player.x, player.y,  spriteWidth * scale, spriteHeight * scale) ;
    } else if (player.direction.left && player.x + 35 > 0) {
        player.x -= player.dx;
        ctx.drawImage(bild, spriteWidth, 0 * spriteHeight, spriteWidth, spriteHeight, player.x, player.y,  spriteWidth * scale, spriteHeight * scale) ;
    }
    if (player.direction.down && player.y + 100 < canvas.height) {
        player.y += player.dy;
        ctx.drawImage(bild, 0 * spriteWidth, spriteHeight, spriteWidth,  spriteHeight, player.x, player.y,  spriteWidth * scale, spriteHeight * scale) ;
    } else if (player.direction.up && player.y + 35 > 0) {
        player.y -= player.dy;
        ctx.drawImage(bild, 0 * spriteWidth, 0 * spriteHeight, spriteWidth, spriteHeight, player.x, player.y,  spriteWidth * scale, spriteHeight * scale) ;
    } 


    for (let i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];
        enemy.x += enemy.dx;
        enemy.y += enemy.dy; 
        if (enemy.x < -50 || enemy.x > canvas.width + 50) {
            enemies.splice(i, 1);
            i--;
        }
        else {
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y, 20, 0, Math.PI * 2);
            ctx.fillStyle = "darkred";
            ctx.fill();
            ctx.closePath();
        }
    }
    frameIndex = (frameIndex + 1) % totalFrames
    }

bild.onload = requestAnimationFrame(animate)
setInterval(spawnEnemy, 3000); 
