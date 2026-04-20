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
			// Check if player 1 can fire (50 shots per 30 seconds limit)
			let currentTime = millis()
			
			// Only allow shot if under 50 shots limit
			if (playerShotsCount[0] < MAX_SHOTS_PER_CYCLE) {
				// Start the timer only on first shot
				if (playerShotsCount[0] === 0) {
					playerShotsStartTime[0] = currentTime
				}
				
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
				playerShotsCount[0] += power1 // Count all bullets fired
			} else if (currentTime - playerShotsStartTime[0] >= RELOAD_TIME) {
				// Reset shot counter if 30 seconds have passed
				playerShotsCount[0] = 0
				playerShotsStartTime[0] = currentTime
				
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
				playerShotsCount[0] += power1 // Count all bullets fired
			}
		} else if (key === 'f' || key === 'F') {
			if (gameMode === MODE_TWO) {
				// Check if player 2 can fire (50 shots per 30 seconds limit)
				let currentTime = millis()
				
				// Only allow shot if under 50 shots limit
				if (playerShotsCount[1] < MAX_SHOTS_PER_CYCLE) {
					// Start the timer only on first shot
					if (playerShotsCount[1] === 0) {
						playerShotsStartTime[1] = currentTime
					}
					
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
					playerShotsCount[1] += power2 // Count all bullets fired
				} else if (currentTime - playerShotsStartTime[1] >= RELOAD_TIME) {
					// Reset shot counter if 30 seconds have passed
					playerShotsCount[1] = 0
					playerShotsStartTime[1] = currentTime
					
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
					playerShotsCount[1] += power2 // Count all bullets fired
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
