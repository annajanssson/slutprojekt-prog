let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let centerY = canvas.height / 2;
let centerX = canvas.width / 2;
let healthpoints = document.getElementById("hp");
let scoreDisplay = document.getElementById("score");
let levelDisplay = document.getElementById("level");
let ammo = document.getElementById("ammo");

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
    down: false,
  },
  radius: 20,
  hp: 100,
  level: 1,
};

let weapon = {
  x: player.x + 70,
  y: player.y + 70,
  radius: 5,
  dx: 1,
  dy: 1,
  speed: 10,
  angle: 0,
};

let bild = document.createElement("img");
bild.src = "vapen.png";
bild.classList.add("image");

let frameIndex = 0;
const totalFrames = 2;
const spriteWidth = 100;
const spriteHeight = 100;
const scale = 1.4;
let score = 0;

document.addEventListener("keydown", (e) => {
  if (e.key == "d" || e.key == "ArrowRight") {
    player.direction.right = true;
  } else if (e.key == "a" || e.key == "ArrowLeft") {
    player.direction.left = true;
  } else if (e.key == "w" || e.key == "ArrowUp") {
    player.direction.up = true;
  } else if (e.key == "s" || e.key == "ArrowDown") {
    player.direction.down = true;
  } else if (e.key === " ") {
    console.log(`mouse x: ${mouseX}`);
    console.log(`mouse y: ${mouseY}`);
    spawnshot();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key == "d" || e.key == "ArrowRight") {
    player.direction.right = false;
  } else if (e.key == "a" || e.key == "ArrowLeft") {
    player.direction.left = false;
  } else if (e.key == "w" || e.key == "ArrowUp") {
    player.direction.up = false;
  } else if (e.key == "s" || e.key == "ArrowDown") {
    player.direction.down = false;
  }
});

let enemies = [];

function spawnEnemy() {
  let randomiser = Math.random();
  let randomX = 0;
  let randomY = 0;
  if (randomiser < 0.25) {
    randomX = -50;
    randomY = Math.random() * canvas.height;
  } else if (randomiser < 0.5) {
    randomX = canvas.width + 50;
    randomY = Math.random() * canvas.height;
  } else if (randomiser < 0.75) {
    randomY = -50;
    randomX = Math.random() * canvas.width;
  } else if (randomiser < 1) {
    randomY = canvas.height + 50;
    randomX = Math.random() * canvas.width;
  }
  let enemy = {
    x: randomX,
    y: randomY,
    dx:
      (player.level * (player.x + 70 - randomX)) /
      Math.sqrt(
        Math.pow(player.x - randomX, 2) + Math.pow(player.y - randomY, 2)
      ),
    dy:
      (player.level * (player.y + 70 - randomY)) /
      Math.sqrt(
        Math.pow(player.x - randomX, 2) + Math.pow(player.y - randomY, 2)
      ),
    radius: 20,
  };
  enemies.push(enemy);
}

for (let i = 0; i < player.level + 10; i++) {
  spawnEnemy();
}

let shotlist = [];

function spawnshot() {
  if (shotlist.length < 20) {
    let shot = {
      x: player.x + 70,
      y: player.y + 70,
      dx:
        (mouseX - (player.x + 70)) /
        Math.sqrt(
          Math.pow(player.x + 70 - mouseX, 2) +
            Math.pow(player.y + 70 - mouseY, 2)
        ),
      dy:
        (mouseY - (player.y + 70)) /
        Math.sqrt(
          Math.pow(player.x + 70 - mouseX, 2) +
            Math.pow(player.y + 70 - mouseY, 2)
        ),
      radius: 7,
    };
    shotlist.push(shot);
  }
}

let isGameRunning = true;
let intervalId;
let scoreIntervalId;

function startTimer() {
  intervalId = setInterval(levelUp, 30000);
  scoreIntervalId = setInterval(() => {
    score += 100;
  }, 10000);
}

function stopTimer() {
  clearInterval(intervalId);
  clearInterval(scoreIntervalId);
}

function restartGame() {
  isGameRunning = false;
  player.hp = 100;
  player.level = 1;
  score = 0;
  enemies = [];
  shotlist = [];
  for (let i = 0; i < player.level + 10; i++) {
    spawnEnemy();
  }

  document.getElementById("container").style.display = "block";
  stopTimer();
}

let restartButton = document.querySelector(".restartButton");

restartButton.onclick = function () {
  isGameRunning = true;
  document.getElementById("container").style.display = "none";
  requestAnimationFrame(animate);
  startTimer();
};

function levelUp() {
  player.level++;
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(-50, -50, canvas.width + 100, canvas.height + 100);
  if (!isGameRunning) {
    document.getElementById("container").style.display = "block";
    return;
  }

  if (
    player.direction.up == false &&
    player.direction.down == false &&
    player.direction.left == false &&
    player.direction.right == false
  ) {
    ctx.drawImage(
      bild,
      0 * spriteWidth,
      0 * spriteHeight,
      spriteWidth,
      spriteHeight,
      player.x,
      player.y,
      spriteWidth * scale,
      spriteHeight * scale
    );
  }
  if (player.direction.right && player.x + 100 < canvas.width) {
    player.x += player.dx;
    ctx.drawImage(
      bild,
      spriteWidth,
      spriteHeight,
      spriteWidth,
      spriteHeight,
      player.x,
      player.y,
      spriteWidth * scale,
      spriteHeight * scale
    );
  } else if (player.direction.left && player.x + 35 > 0) {
    player.x -= player.dx;
    ctx.drawImage(
      bild,
      spriteWidth,
      0 * spriteHeight,
      spriteWidth,
      spriteHeight,
      player.x,
      player.y,
      spriteWidth * scale,
      spriteHeight * scale
    );
  }
  if (player.direction.down && player.y + 100 < canvas.height) {
    player.y += player.dy;
    ctx.drawImage(
      bild,
      0 * spriteWidth,
      spriteHeight,
      spriteWidth,
      spriteHeight,
      player.x,
      player.y,
      spriteWidth * scale,
      spriteHeight * scale
    );
  } else if (player.direction.up && player.y + 35 > 0) {
    player.y -= player.dy;
    ctx.drawImage(
      bild,
      0 * spriteWidth,
      0 * spriteHeight,
      spriteWidth,
      spriteHeight,
      player.x,
      player.y,
      spriteWidth * scale,
      spriteHeight * scale
    );
  }

  for (let i = 0; i < enemies.length; i++) {
    //enemy funktionen, spawna, krocka, hamna utanför
    let enemy = enemies[i];
    enemy.x += enemy.dx;
    enemy.y += enemy.dy;
    if (
      enemy.x < -50 ||
      enemy.x > canvas.width + 50 ||
      enemy.y < -50 ||
      enemy.y > canvas.height + 50
    ) {
      enemies.splice(i, 1);
      spawnEnemy();
    }
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = "darkred";
    ctx.fill();
    ctx.closePath();

    if (
      Math.sqrt(
        Math.pow(player.x + 70 - enemy.x, 2) +
          Math.pow(player.y + 70 - enemy.y, 2)
      ) <=
      player.radius + enemy.radius
    ) {
      player.hp -= 10;
      enemies.splice(i, 1);
      spawnEnemy();
    }
  }

  for (let i = 0; i < shotlist.length; i++) {
    let shot = shotlist[i];
    shot.x += shot.dx;
    shot.y += shot.dy;
    ctx.beginPath();
    ctx.arc(shot.x, shot.y, shot.radius, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();

    for (let j = 0; j < enemies.length; j++) {
      let enemy = enemies[j];
      if (
        Math.sqrt(
          Math.pow(shot.x - enemy.x, 2) + Math.pow(shot.y - enemy.y, 2)
        ) <=
        shot.radius + enemy.radius
      ) {
        enemies.splice(j, 1);
        shotlist.splice(i, 1);
        score += 50;
        spawnEnemy();
        break;
      }
    }
  }

  if (ammo == 0) {
    setTimeout((ammo = 20), 5000);
  }

  frameIndex = (frameIndex + 1) % totalFrames;

  healthpoints.innerHTML = `HP: ${player.hp}`;
  levelDisplay.innerHTML = player.level;
  scoreDisplay.innerHTML = score;
  ammo.innerHTML = `Ammunition: ${ammo}`;

  if (player.hp <= 0) {
    restartGame();
    isGameRunning = false;
    document.getElementById("container").style.display = "block";
  }
}

canvas.addEventListener("mousemove", function (event) {
  mouseX = event.clientX - canvas.getBoundingClientRect().left;
  mouseY = event.clientY - canvas.getBoundingClientRect().top;
});

bild.onload = requestAnimationFrame(animate);
startTimer();
