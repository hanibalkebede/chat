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
	for (let i = enemyBullets.length - 1; i >= 0; i--) {
		let bullet = enemyBullets[i]
		fill('yellow')
		ellipse(bullet.x, bullet.y, 5)
		bullet.y += 5 // Move down

		// Remove if off screen
		if (bullet.y > windowHeight) {
			enemyBullets.splice(i, 1)
		}
	}

	// Draw and move player bullets (if any)
	for (let i = playerBullets.length - 1; i >= 0; i--) {
		let bullet = playerBullets[i]
		fill('green')
		ellipse(bullet.x, bullet.y, 5)
		bullet.y -= 5 // Move up

		// Remove if off screen
		if (bullet.y < 0) {
			playerBullets.splice(i, 1)
		}
	}
}
