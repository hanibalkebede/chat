function keyPressed() {
	if (currentScreen === INTRO_SCREEN && keyCode === ENTER) {
		startGame(MODE_SINGLE) 
		if (pewpewSound && pewpewSound.isLoaded()) {
			pewpewSound.play()
		}
	}

	if (currentScreen === PLAYING_SCREEN) {
		if (keyCode === LEFT_ARROW) {
			playerPosition.x -= 30
		} else if (keyCode === RIGHT_ARROW) {
			playerPosition.x += 30
		} else if (keyCode === UP_ARROW) {
			playerPosition.y -= 30
		} else if (keyCode === DOWN_ARROW) {
			playerPosition.y += 30
		} else if (key === 'w' || key === 'W') {
			if (gameMode === MODE_TWO) {
				player2Position.y -= 30
			}
		} else if (key === 's' || key === 'S') {
			if (gameMode === MODE_TWO) {
				player2Position.y += 30
			}
		} else if (key === 'a' || key === 'A') {
			if (gameMode === MODE_TWO) {
				player2Position.x -= 30
			}
		} else if (key === 'd' || key === 'D') {
			if (gameMode === MODE_TWO) {
				player2Position.x += 30
			}
		} else if (keyCode === 32) { // Spacebar
			let power1 = 1
			if (playerKills[0] >= 10) {
				power1 = 3
			} else if (playerKills[0] >= 5) {
				power1 = 2
			}
			for (let k = 0; k < power1; k++) {
				let offset = (k - (power1 - 1) / 2) * 10
				playerBullets.push({ x: playerPosition.x + offset, y: playerPosition.y - playerRadius, owner: 1 })
			}
		} else if (key === 'f' || key === 'F') {
			if (gameMode === MODE_TWO) {
				let power2 = 1
				if (playerKills[1] >= 10) {
					power2 = 3
				} else if (playerKills[1] >= 5) {
					power2 = 2
				}
				for (let k = 0; k < power2; k++) {
					let offset = (k - (power2 - 1) / 2) * 10
					playerBullets.push({ x: player2Position.x + offset, y: player2Position.y - playerRadius, owner: 2 })
				}
			}
		}

		// Keep player on screen
		playerPosition.x = constrain(playerPosition.x, 0, windowWidth)
		playerPosition.y = constrain(playerPosition.y, 0, windowHeight)
		if (gameMode === MODE_TWO) {
			player2Position.x = constrain(player2Position.x, 0, windowWidth)
			player2Position.y = constrain(player2Position.y, 0, windowHeight)
		}
	}
}
