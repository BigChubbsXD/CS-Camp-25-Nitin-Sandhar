const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let gameStarted = false;


const gravity = 0.5;
const jumpForce = -12;
const speed = 2;
let isPaused = false;

let score = 0;
let bestScore = 0;

let player = {
  x: 50,
  y: 0,
  width: 20,
  height: 20,
  dy: 0,
  onGround: false
};

document.addEventListener("keydown", e => {
  if (e.code === "Enter") {
    gameStarted = true;
  }

  if (!gameStarted) return;

  if (e.code === "KeyP") {
    isPaused = !isPaused;
  }

  if (e.code === "Space" && player.onGround) {
    player.dy = jumpForce;
    player.onGround = false;
    e.preventDefault(); // also prevents scroll
  }
});


let platforms = [];

function generatePlatform(x) {
  const y = 300 + Math.floor(Math.random() * 40) - 20;
  const width = 100 + Math.random() * 50;
  return { x, y, width, height: 10, counted: false };
}

// Initialize platforms with connected grace platforms
for (let i = 0; i < 10; i++) {
  if (i < 3) {
    platforms.push({ x: i * 150, y: 300, width: 150, height: 10, counted: false });
  } else {
    platforms.push(generatePlatform(i * 150));
  }
}

// Prevent spacebar from scrolling the page
window.addEventListener("keydown", e => {
  if (e.code === "Space" && e.target === document.body) {
    e.preventDefault();
  }
});

// Jump input
document.addEventListener("keydown", e => {
  if (e.code === "Space" && player.onGround) {
    player.dy = jumpForce;
    player.onGround = false;
  }
});

function update() {
  if (isPaused) return;

  const prevY = player.y;

  player.dy += gravity;
  player.y += player.dy;

  // Move platforms
  for (let plat of platforms) {
    plat.x -= speed;
  }

  // Score tracking for passed platforms
  for (let plat of platforms) {
    if (!plat.counted && plat.x + plat.width < player.x) {
      plat.counted = true;
      score += 100;
      if (score > bestScore) bestScore = score;
    }
  }

  // Generate new platform
  if (platforms[0].x + platforms[0].width < 0) {
    platforms.shift();
    const last = platforms[platforms.length - 1];
    platforms.push(generatePlatform(last.x + 150));
  }

  // Collision detection
  player.onGround = false;
  for (let plat of platforms) {
    const wasAbove = prevY + player.height <= plat.y;
    const nowBelow = player.y + player.height >= plat.y;

    const horizontallyAligned =
      player.x + player.width > plat.x && player.x < plat.x + plat.width;

    if (wasAbove && nowBelow && horizontallyAligned) {
      player.y = plat.y - player.height;
      player.dy = 0;
      player.onGround = true;
    }
  }

  // Respawn if player falls
  if (player.y > canvas.height) {
    player.x = 50;
    player.y = 0;
    player.dy = 0;
    score = 0;
    platforms = [];
    for (let i = 0; i < 10; i++) {
      if (i < 3) {
        platforms.push({ x: i * 150, y: 300, width: 150, height: 10, counted: false });
      } else {
        platforms.push(generatePlatform(i * 150));
      }
    }
  }
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw platforms
  ctx.fillStyle = "white";
  for (let plat of platforms) {
    ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
  }

  // Draw score
  ctx.fillStyle = "white";
  ctx.font = "16px monospace";
  ctx.textAlign = "left";
  ctx.fillText(`Score: ${score}`, 10, 20);
  ctx.fillText(`Best: ${bestScore}`, 10, 40);

  // Pause overlay
  if (isPaused) {
    ctx.fillStyle = "rgba(128,128,128,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "bold 30px monospace";
    ctx.textAlign = "center";
    ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
  }
  if (!gameStarted) {
  ctx.fillStyle = "white";
  ctx.font = "bold 24px monospace";
  ctx.textAlign = "center";
  ctx.fillText("Press Enter to Start", canvas.width / 2, canvas.height / 2);
}

}

function loop() {
    if (gameStarted) {
    update();
  }
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
