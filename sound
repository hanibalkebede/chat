let musicMenu;
let musicGame;
let explosionSound;
let gameState = "menu";
let soundsLoaded = false;

function preload() {
  // Use uploaded asset names exactly
  musicMenu = loadSound("studiokolomna-risk-136788.mp3");
  musicGame = loadSound("alexgrohl-stylish-beat-478804.mp3");
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  textSize(30);
  background(0);
  fill(255);
  text("Click anywhere to start", width/2, height/2);
	musicMenu.play()
	
}

function draw() {
  background(0);
  fill(255);

  if (gameState === "menu") {
    text("MENU - Click to Start Game", width/2, height/2);
  } else if (gameState === "game") {
    text("GAME RUNNING - Press E for Explosion Sound", width/2, height/2);
  }
}

// MUST start sound after user click!
function mousePressed() {
  if (!soundsLoaded) {
    if (musicMenu.isLoaded()) {
      musicMenu.loop();  // start menu music
      soundsLoaded = true;
    }
  }

  if (gameState === "menu") {
    gameState = "game";
    if (musicMenu.isPlaying()) musicMenu.stop();
    if (musicGame.isLoaded() && !musicGame.isPlaying()) {
      musicGame.loop();   // start game music
    }
  }
}

function keyPressed() {
  if (key === 'E' || key === 'e') {
    if (explosionSound.isLoaded()) explosionSound.play();
  }
}