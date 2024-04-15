let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let centerY = canvas.height / 2
let centerX = canvas.width / 2
// let main = prompt("vad är ditt namn?")

let player = {
    // name: main,
    x: centerX,
    y: centerY,
    dx: 1, 
    dy: 1,
    direction: {
        left: false,
        right: false,
        up: false,
        down: false
    },
    circleSize: 20
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

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height );


    if( player.direction.up == false && player.direction.down == false && player.direction.left == false && player.direction.right == false){
        ctx.drawImage(bild, 0 * spriteWidth, 0 * spriteHeight, spriteWidth, spriteHeight, player.x, player.y,  spriteWidth * scale, spriteHeight * scale) ;
    }
    if (player.direction.right && player.x + 100 < canvas.width) {
        player.x += player.dx;
        ctx.drawImage(bild, spriteWidth, spriteHeight, spriteWidth, spriteHeight, player.x, player.y,  spriteWidth * scale, spriteHeight * scale) ;
    } else if (player.direction.left && player.x - 100 > 0) {
        player.x -= player.dx;
        ctx.drawImage(bild, spriteWidth, 0 * spriteHeight, spriteWidth, spriteHeight, player.x, player.y,  spriteWidth * scale, spriteHeight * scale) ;
    }
    if (player.direction.down && player.y + 100 < canvas.height) {
        player.y += player.dy;
        ctx.drawImage(bild, 0 * spriteWidth, spriteHeight, spriteWidth,  spriteHeight, player.x, player.y,  spriteWidth * scale, spriteHeight * scale) ;
    } else if (player.direction.up && player.y - 100 > 0) {
        player.y -= player.dy;
        ctx.drawImage(bild, 0 * spriteWidth, 0 * spriteHeight, spriteWidth, spriteHeight, player.x, player.y,  spriteWidth * scale, spriteHeight * scale) ;
    } 

    }
    // --------------------------------------------------------------------------------

    frameIndex = (frameIndex + 1) % totalFrames

bild.onload = requestAnimationFrame(animate)

function fiender(){
    let enemies = {
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        dx: 5, 
        dy: 5,
        hp: 50, 
    }

    numberOfObjects = 10
    objectlist = []
  for (let objectNumber = 0; objectNumber < numberOfObjects; objectNumber++) {
    
    let object = objects[objectNumber]
    
    
    
    objectlist.push(object)

    ctx.beginPath();
    ctx.arc(500, 100, 20, 0, Math.PI * 2, true);
    ctx.moveTo(520, 200 );
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.stroke();
    
  }
  
}   
animate()