function drawPlayingScreen() {
	clear()
	background(playerscreen)

	// Draw player
	fill('blue')
	ellipse(playerPosition.x, playerPosition.y, playerRadius * 2)

	// Draw enemies
	for (let i = 0; i < enemyPositions.length; i++) {
		let enemy = enemyPositions[i]
		fill('red')
		ellipse(enemy.x, enemy.y, 30)

		// Move enemy slightly
		enemy.x += enemySpeeds[i]
		if (enemy.x > windowWidth - 15 || enemy.x < 15) {
			enemySpeeds[i] *= -1
		}

		// Enemy fires bullet occasionally
		if (random() < 0.02) { // 2% chance per frame
			enemyBullets.push(createVector(enemy.x, enemy.y + 15))
		}
	}

	// Draw and move enemy bullets
	for (let i = enemyBullets.length - 10; i >= 0; i--) {
		let bullet = enemyBullets[i]
		fill('yellow')
		triangle(bullet.x, bullet.y - 8, bullet.x - 6, bullet.y + 8, bullet.x + 6, bullet.y + 8)
		
		// Check collision with player
		if (dist(bullet.x, bullet.y, playerPosition.x, playerPosition.y) < playerRadius + 6) {
			playerLives--
			enemyBullets.splice(i, 1)
			continue
		}
		
		bullet.y += 5 // Move down

		// Remove if off screen
		if (bullet.y > windowHeight) {
			enemyBullets.splice(i, 1)
		}
	}

	// Draw and move player bullets (if any)
	for (let i = playerBullets.length - 1; i >= 0; i--) {
		let bullet = playerBullets[i]
		stroke('green')
		strokeWeight(4)
		noFill()
		line(bullet.x, bullet.y, bullet.x, bullet.y - 20)
		
		// Check collision with enemies
		let hit = false
		for (let j = enemyPositions.length - 1; j >= 0; j--) {
			let enemy = enemyPositions[j]
			if (abs(enemy.x - bullet.x) < 17 && enemy.y >= bullet.y - 20 && enemy.y <= bullet.y) {
				enemyPositions.splice(j, 1)
				enemySpeeds.splice(j, 1)
				enemyHitCounts.splice(j, 1)
				playerCoins += 10
				hit = true
				break
			}
		}
		if (hit) {
			playerBullets.splice(i, 1)
			continue
		}
		
		bullet.y -= 8 // Move up

		// Remove if off screen
		if (bullet.y < 0) {
			playerBullets.splice(i, 1)
		}
	}
	
	// Display lives and coins
	fill('white')
	textSize(20)
	text(`Lives: ${playerLives}`, 10, 30)
	text(`Coins: ${playerCoins}`, 10, 60)
	
	// Check for win condition
	if (enemyPositions.length == 0) {
		fill('red')
		textSize(50)
		textAlign(CENTER)
		text('Game Over', width/2, height/2)
	}
	
	// Check for game over
	if (playerLives <= 0) {
		currentScreen = GAMEOVER_SCREEN
	}
}
