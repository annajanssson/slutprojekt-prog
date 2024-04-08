let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
<<<<<<< HEAD

// let main = prompt("vad är ditt namn?")

let player = {
    // name: main,
    x: 10,
    y:10,
    dx: 5, 
    dy: 5,
    direction: {
        left: false,
        right: false,
        up: false,
        down: false
    }
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
    ctx.clearRect(0, 0, 1200, 750 );

    
    if (player.direction.right == true) {
        player.x += player.dx;
        ctx.beginPath();
        ctx.arc(player.x, player.y, 20, 0, Math.PI * 2, true);
        ctx.moveTo(player.x, player.y );
        ctx.stroke();
    } else if (player.direction.left == true) {
        player.x -= player.dx;
        ctx.beginPath();
        ctx.arc(player.x, player.y, 20, 0, Math.PI * 2, true);
        ctx.moveTo(player.x, player.y );
        ctx.stroke();
    }
    if (player.direction.down == true) {
        player.y += player.dy;
        ctx.beginPath();
        ctx.arc(player.x, player.y, 20, 0, Math.PI * 2, true);
        ctx.moveTo(player.x, player.y );
        ctx.stroke();
    } else if (player.direction.up == true) {
        player.y -= player.dy;
        ctx.beginPath();
        ctx.arc(player.x, player.y, 20, 0, Math.PI * 2, true);
        ctx.moveTo(player.x, player.y );
        ctx.stroke();
    } 
    if (player.direction.up == false && player.direction.down == false && player.direction.left == false && player.direction.right == false)  {
        ctx.beginPath();
        ctx.arc(player.x, player.y, 20, 0, Math.PI * 2, true);
        ctx.moveTo(player.x, player.y );
        ctx.stroke();
    }

   
   


    
  }
animate()
=======
const canvasheight = 1000;
const canvaswidth = 800 ;


function animation()
>>>>>>> 417157d0c07a63cd7215c09a01dd73fa34c6999c
