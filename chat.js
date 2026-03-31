// Define the various screens that the game has
const INTRO_SCREEN = 0
const PLAYING_SCREEN = 1
const GAMEOVER_SCREEN = 2
let currentScreen = INTRO_SCREEN
let pewpewSound, hitSound, explosionSound
let backgroundImage
let playerscreen

// Game variables
let playerPosition
let playerRadius = 20
let enemyPositions = []
let enemySpeeds = []
let enemyHitCounts = []
let numEnemies = 5
let enemyBullets = []
let playerBullets = []

// This function is run before the setup function to load things that could take a while to load
// like sounds and images (from files)
function preload() {
	// Do all the image and sound file loading here
	// pewpewSound = loadSound('pew-pew.mp3')
	// hitSound = loadSound('hit.mp3')
	// explosionSound = loadSound('explosion.mp3')	
	backgroundImage = loadImage('background.webp')
	playerscreen = loadImage('player screen.webp')
} // End of preload function

// This function is run once when the program starts
function setup() {
	createCanvas(windowWidth, windowHeight)
	background('background.jpg')
	frameRate(20)
	
	// Setup the player
	playerPosition = createVector(windowWidth/2, windowHeight - 2*playerRadius)
	
	// Setup enemies
	for (let i = 0; i < numEnemies; i++) {
		let x = (i + 1) * (windowWidth / (numEnemies + 1))
		let y = 50
		enemyPositions.push(createVector(x, y))
		let enemySpeed = random(1, 3)
		enemySpeeds.push(enemySpeed)
		enemyHitCounts.push(0)
	}
} // End of setup function

// This function is run repeatedly, based on the set frame rate
function draw() {
	// This if-else block does exactly the same as the switch block below
	// if (currentScreen == INTRO_SCREEN) {
	// 		drawIntroScreen()		
	// }
	// else if(currentScreen == PLAYING_SCREEN) {
	// 		drawPlayingScreen()
	// }
	// else if(currentScreen == GAMEOVER_SCREEN) {
	// 		drawGameOverScreen()
	// }
	
	// Draw the current screen
	switch(currentScreen) {
		case INTRO_SCREEN:
			drawIntroScreen()
			break;
		case PLAYING_SCREEN:
			drawPlayingScreen()
			break;
		case GAMEOVER_SCREEN:
			drawGameOverScreen()
			break;
	}
} // End of draw function