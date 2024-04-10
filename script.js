let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let centerY = canvas.height / 2
let centerX = canvas.width / 2
// let main = prompt("vad är ditt namn?")

let player = {
    // name: main,
    x: centerX,
    y: centerY,
    dx: 10, 
    dy: 10,
    direction: {
        left: false,
        right: false,
        up: false,
        down: false
    },
    circleSize: 20
}

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

    
    if (player.direction.right && player.x + player.circleSize < canvas.width) {
        player.x += player.dx;
    } else if (player.direction.left && player.x - player.circleSize > 0) {
        player.x -= player.dx;
    }
    if (player.direction.down && player.y + player.circleSize < canvas.height) {
        player.y += player.dy;
    } else if (player.direction.up && player.y - player.circleSize > 0) {
        player.y -= player.dy;
    } 
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.circleSize, 0, Math.PI * 2, true);
    ctx.moveTo(player.x, player.y );
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();

    // --------------------------------------------------------------------------------

 
  }

  numberOfObjects = 10
  objectlist = []
for (let objectNumber = 0; objectNumber < numberOfObjects; objectNumber++) {
    
    
}

animate()
