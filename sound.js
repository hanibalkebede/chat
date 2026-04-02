let musicMenu;
let musicGame;
let explosionSound; // keep as in your original code
let gameState = "menu";
let soundsLoaded = false;

function preload() {
  // Your original preload
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

  // Start menu music at beginning
  if (musicMenu.isLoaded()) {
    musicMenu.loop();
  }
}

function draw() {
  background(0);
  fill(255);

  if (gameState === "menu") {
    text("MENU - Click to Start Game", width/2, height/2);
  } else if (gameState === "game") {
    text("GAME RUNNING", width/2, height/2);
  }
}

// Keep your original mousePressed
function mousePressed() {
  userStartAudio(); // needed to allow audio in browser

  if (!soundsLoaded) {
    if (musicMenu.isLoaded()) {
      musicMenu.loop(); // menu music already started
      soundsLoaded = true;
    }
  }

  if (gameState === "menu") {
    gameState = "game";

    // Stop menu music and play game music
    if (musicMenu.isPlaying()) musicMenu.stop();
    if (musicGame.isLoaded() && !musicGame.isPlaying()) {
      musicGame.loop();
    }
  }
}

function keyPressed() {
  if (key === 'E' || key === 'e') {
    if (explosionSound.isLoaded()) explosionSound.play();
  }

  // Game over (use G key for simplicity)
  if (key === 'G' || key === 'g') {
    gameState = "menu";

    // Stop game music, play menu music again
    if (musicGame.isPlaying()) musicGame.stop();
    if (musicMenu.isLoaded() && !musicMenu.isPlaying()) {
      musicMenu.loop();
    }
  }
}