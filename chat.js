// Define the various screens that the game has
const INTRO_SCREEN = 0
const PLAYING_SCREEN = 1
const GAMEOVER_SCREEN = 2
const MODE_SINGLE = 1
const MODE_TWO = 2
let currentScreen = INTRO_SCREEN
let gameMode = MODE_SINGLE
let pewpewSound, hitSound, explosionSound, gameOverSound
let backgroundImage
let playerscreen
let eagleImage
let gameOverSoundPlayed = false
let gameWinner = null

// Game variables
let playerPosition
let player2Position
let playerRadius = 20
let enemyPositions = []
let enemySpeeds = []
let enemyHitCounts = []
let numEnemies = 50
let enemyBullets = []
let playerBullets = []
let player1Lives = 5
let player2Lives = 5
let playerCoins = 0
let currentLevel = 1
let playerKills = [0, 0]
let doubleFireCharges = [0, 0]
let enemyHealth = []

// This function is run before the setup function to load things that could take a while to load
// like sounds and images (from files)
function preload() {
	// Do all the image and sound file loading here
	pewpewSound = loadSound('alexgrohl-stylish-beat-478804.mp3')
	hitSound = loadSound('hit.mp3')
	gameOverSound = loadSound('dragon-studio-game-over-retro-8bit-sfx-499656.mp3')
	//explosionSound = loadSound('explosion.mp3')	
	backgroundImage = loadImage('background.webp')
	playerscreen = loadImage('player screen.webp')
	eagleImage = loadImage('eagle.jpg')
} // End of preload function

// This function is run once when the program starts
function setup() {
	createCanvas(windowWidth, windowHeight)
	background('background.jpg')
	frameRate(20)
	
	// Setup the player positions
	playerPosition = createVector(windowWidth/2, windowHeight - 2*playerRadius)
	player2Position = createVector(windowWidth/2, windowHeight - 2*playerRadius)

	initLevel1()

} // End of setup function

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

function initLevel1() {
	enemyPositions = []
	enemySpeeds = []
	enemyHitCounts = []
	enemyHealth = []
	playerBullets = []
	enemyBullets = []
	playerKills = [0, 0]
	doubleFireCharges = [0, 0]
	player1Lives = 5
	player2Lives = 5
	playerCoins = 0
	currentLevel = 1
	gameWinner = null

	let cols = 10
	let rows = 5
	let spacingX = windowWidth / (cols + 1)
	let spacingY = 60 // Space between rows

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			let x = (c + 1) * spacingX
			let y = 50 + (r * spacingY)
			enemyPositions.push(createVector(x, y))
			enemySpeeds.push(2)
			enemyHitCounts.push(0)
			enemyHealth.push(1)
		}
	}
}

function startGame(mode) {
	gameMode = mode
	currentScreen = PLAYING_SCREEN
	player1Lives = 5
	player2Lives = 5
	playerKills = [0, 0]
	doubleFireCharges = [0, 0]
	playerBullets = []
	enemyBullets = []
	playerCoins = 0
	gameWinner = null

	if (mode === MODE_TWO) {
		playerPosition = createVector(windowWidth / 3, windowHeight - 2*playerRadius)
		player2Position = createVector(2 * windowWidth / 3, windowHeight - 2*playerRadius)
	} else {
		playerPosition = createVector(windowWidth / 2, windowHeight - 2*playerRadius)
		player2Position = createVector(windowWidth / 2, windowHeight - 2*playerRadius)
	}

	initLevel1()
	if (pewpewSound && pewpewSound.isLoaded() && !pewpewSound.isPlaying()) {
		pewpewSound.play()
	}
}

// This function is run repeatedly, based on the set frame rate
function draw() {
        if (currentScreen !== GAMEOVER_SCREEN) {
                gameOverSoundPlayed = false
        }
        // This if-else block does exactly the same as the switch block below
        // if (currentScreen == INTRO_SCREEN) {
        //              drawIntroScreen()
        // }
        // else if(currentScreen == PLAYING_SCREEN) {
        //              drawPlayingScreen()
        // }
        // else if(currentScreen == GAMEOVER_SCREEN) {
        //              drawGameOverScreen()
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
}

function mousePressed() {
	if (currentScreen === INTRO_SCREEN) {
		userStartAudio()
		let btnWidth = 320
		let btnHeight = 80
		let btnX = windowWidth / 2 - btnWidth / 2
		let btn1Y = windowHeight / 2
		let btn2Y = btn1Y + btnHeight + 30

		if (mouseX >= btnX && mouseX <= btnX + btnWidth) {
			if (mouseY >= btn1Y && mouseY <= btn1Y + btnHeight) {
				startGame(MODE_SINGLE)
			} else if (mouseY >= btn2Y && mouseY <= btn2Y + btnHeight) {
				startGame(MODE_TWO)
			}
		}
	} else if (currentScreen === GAMEOVER_SCREEN) {
		let btnWidth = 260
		let btnHeight = 70
		let btnX = windowWidth / 2 - btnWidth / 2
		let btnY = windowHeight / 2 + 100

		if (mouseX >= btnX && mouseX <= btnX + btnWidth && mouseY >= btnY && mouseY <= btnY + btnHeight) {
			startGame(gameMode)
		}
	}
}

function initLevel2() {
	currentLevel = 2
	enemyPositions = []
	enemySpeeds = []
	enemyHitCounts = []
	enemyHealth = []
	enemyBullets = []

	// Level 2: More enemies with higher health
	let cols = 10
	let rows = 5
	let spacingX = windowWidth / (cols + 1)
	let spacingY = 60
	
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			let x = (c + 1) * spacingX
			let y = 50 + (r * spacingY)
			enemyPositions.push(createVector(x, y))
			enemySpeeds.push(2)
			enemyHitCounts.push(0)
			enemyHealth.push(5) // Level 2 enemies need 5 hits
		}
	}
}

function drawGameOverScreen() {
	// Display the eagle image as the game over screen
	image(eagleImage, 0, 0, windowWidth, windowHeight)

	// Play the game over sound once when entering this screen
	if (!gameOverSoundPlayed && gameOverSound && gameOverSound.isLoaded()) {
		gameOverSound.play()
		gameOverSoundPlayed = true
	}

	fill('white')
	textAlign(CENTER)
	textSize(50)
	if (gameMode === MODE_TWO) {
		let winnerText = 'Tie game!'
		if (gameWinner === 1) {
			winnerText = 'Player 1 wins!'
		} else if (gameWinner === 2) {
			winnerText = 'Player 2 wins!'
		} else if (playerKills[0] > playerKills[1]) {
			winnerText = 'Player 1 wins!'
		} else if (playerKills[1] > playerKills[0]) {
			winnerText = 'Player 2 wins!'
		}
		text(winnerText, windowWidth / 2, windowHeight / 2)
		textSize(24)
		text(`P1 Kills: ${playerKills[0]}   P2 Kills: ${playerKills[1]}`, windowWidth / 2, windowHeight / 2 + 50)
	} else {
		text('Game Over', windowWidth / 2, windowHeight / 2)
		textSize(24)
		text(`Kills: ${playerKills[0]}`, windowWidth / 2, windowHeight / 2 + 50)
	}

	let btnWidth = 260
	let btnHeight = 70
	let btnX = windowWidth / 2 - btnWidth / 2
	let btnY = windowHeight / 2 + 100
	fill('#222')
	rect(btnX, btnY, btnWidth, btnHeight, 20)
	fill('white')
	textSize(28)
	text('Restart', windowWidth / 2, btnY + btnHeight / 2 + 8)
}

