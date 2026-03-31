function keyPressed() {
	if (currentScreen === INTRO_SCREEN && keyCode === ENTER) {
		currentScreen = PLAYING_SCREEN
	}

	if (currentScreen === PLAYING_SCREEN) {
		if (keyCode === LEFT_ARROW) {
			playerPosition.x -= 10
		} else if (keyCode === RIGHT_ARROW) {
			playerPosition.x += 10
		} else if (keyCode === 32) { // Spacebar
			playerBullets.push(createVector(playerPosition.x, playerPosition.y - playerRadius))
		}
	}
}
