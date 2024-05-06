let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let centerY = canvas.height / 2
let centerX = canvas.width / 2
let healthpoints = document.getElementById("hp")
let score = document.getElementById("score")
let level = document.getElementById("level")

let mouseX = 200;
let mouseY = 200;


let player = {
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
    radius: 20,
    hp: 100,
    level: 1,
}

let weapon = {
    x: player.x + 70,
    y: player.y + 70,
    radius: 5,
    dx: 1,
    dy: 1,
    speed: 10,
    angle: 0,
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
    else if (e.key = " "){
        console.log(`mouse x: ${mouseX}`) //det här la han till för att se om musens position loggades när man klickar space
        console.log(`mouse y: ${mouseY}`)
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key == "d" || e.key == "arrowRight") {
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
        dx: player.level*(player.x - randomX) / Math.sqrt(Math.pow(player.x,2) + Math.pow(randomX,2)),
        dy: player.level*(player.y - randomY) / Math.sqrt(Math.pow(player.y,2) + Math.pow(randomY,2)),
        radius: 20
    }
    enemies.push(enemy);
}

for (let i = 0; i < player.level + 10; i++) {
    spawnEnemy()
}

// let isGameRunning = true;

// function restartGame() {
//     isGameRunning = false;
//     player.hp = 100;
//     player.level = 1;
//     enemies = [];
//     for (let i = 0; i < player.level + 10 ; i++) {
//         spawnEnemy();
//     }
//     document.getElementById("container").style.display = 'block'; // Visa dödsmeddelandet
// }

// restartButton.onclick = function() {
//     isGameRunning = true;
//     document.getElementById("container").style.display = 'none'; // Dölj dödsmeddelandet
//     requestAnimationFrame(animate);
// };


function levelUp() {
    player.level++;
  }

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(-50, -50, canvas.width+100, canvas.height+100);
    if (!isGameRunning) return;
      
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
    
    
    for (let i = 0; i < enemies.length; i++) { //enemy funktionen, spawna, krocka, hamna utanför
        let enemy = enemies[i];
        enemy.x += enemy.dx;
        enemy.y += enemy.dy; 
        if (enemy.x < -50 || enemy.x > canvas.width + 50 || enemy.y < -50 || enemy.y > canvas.height + 50) {
            enemies.splice(i, 1);
            spawnEnemy()
        }
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y, 20, 0, Math.PI * 2);
            ctx.fillStyle = "darkred";
            ctx.fill();
            ctx.closePath();
            
            if (Math.sqrt(Math.pow(player.x + 70 - enemy.x, 2) + Math.pow(player.y + 70 - enemy.y, 2)) <= player.radius + enemy.radius) {
                player.hp -= 10 
                console.log(player.hp)
                enemies.splice(i, 1);
                spawnEnemy()
            }
        }

    canvas.addEventListener("onclick", function(event) {
        
    })

    

    weapon.dx = mouseX - player.x;
    weapon.dy = mouseY - player.y;

    weapon.angle = Math.atan2(weapon.dy, weapon.dx);
    
    weapon.x += Math.cos(weapon.angle) * weapon.speed
    weapon.y += Math.cos(weapon.angle) * weapon.speed

    frameIndex = (frameIndex + 1) % totalFrames
    
    healthpoints.innerHTML = (`HP: ${player.hp}`)
    level.innerHTML = (player.level)
    // score.innerHTML = (score)
    if (player.hp <= 0){
        restartGame()
    }
    }
    
canvas.addEventListener("mousemove", function(event) { 
    mouseX = event.clientX - canvas.getBoundingClientRect().left; 
    mouseY = event.clientY - canvas.getBoundingClientRect().top;
})


bild.onload = requestAnimationFrame(animate); 
setInterval(levelUp, 30000);