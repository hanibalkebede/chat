function drawPlayingScreen() {
	clear()
	// Draw background image to fit window while maintaining aspect ratio
	let imgAspect = playerscreen.width / playerscreen.height
	let canvasAspect = windowWidth / windowHeight
	let drawWidth, drawHeight, offsetX = 0, offsetY = 0
	
	if (imgAspect > canvasAspect) {
		// Image is wider, fit to height
		drawHeight = windowHeight
		drawWidth = drawHeight * imgAspect
		offsetX = (windowWidth - drawWidth) / 2
	} else {
		// Image is taller, fit to width
		drawWidth = windowWidth
		drawHeight = drawWidth / imgAspect
		offsetY = (windowHeight - drawHeight) / 2
	}
	
	image(playerscreen, offsetX, offsetY, drawWidth, drawHeight)

	// Draw player as emoji
	textSize(40)
	text('🦖', playerPosition.x - 20, playerPosition.y + 15)
	textSize(16)
	fill('white')
	text('1', playerPosition.x, playerPosition.y - 30)
	if (gameMode === MODE_TWO) {
		textSize(40)
		text('🦕', player2Position.x - 20, player2Position.y + 15)
		textSize(16)
		fill('white')
		text('2', player2Position.x, player2Position.y - 30)
	}

	// Draw enemies
	for (let i = 0; i < enemyPositions.length; i++) {
		let enemy = enemyPositions[i]
		
		// Alternate between two enemy emojis
		let emoji = i % 2 === 0 ? '👾' : '🛸'
		textSize(30)
		text(emoji, enemy.x - 15, enemy.y + 10)

		// Keep enemies in place

		// Enemy fires bullet occasionally
		if (random() < 0.02) { // 2% chance per frame
			let bullet = createVector(enemy.x, enemy.y + 15)
			bullet.targetPlayer = true // Mark as homing bullet in level 2
			enemyBullets.push(bullet)
		}
	}

	// Draw and move enemy bullets
	for (let i = enemyBullets.length - 1; i >= 0; i--) {
		let bullet = enemyBullets[i]
		textSize(20)
		text('🔥', bullet.x - 10, bullet.y + 5)
		
		// Check if bullet is close to bottom screen
		let distanceFromBottom = windowHeight - bullet.y
		
		if (currentLevel === 2) {
			let target = playerPosition
			if (gameMode === MODE_TWO) {
				let d1 = dist(bullet.x, bullet.y, playerPosition.x, playerPosition.y)
				let d2 = dist(bullet.x, bullet.y, player2Position.x, player2Position.y)
				target = d2 < d1 ? player2Position : playerPosition
			}
			if (distanceFromBottom > 100) {
				// Bullet far from bottom in level 2 - track the player
				let dx = target.x - bullet.x
				let dy = target.y - bullet.y
				let distance = sqrt(dx * dx + dy * dy)
				
				if (distance > 0) {
					// Move bullet towards player (tracking speed)
					bullet.x += (dx / distance) * 5
					bullet.y += (dy / distance) * 5
				}
			} else {
				bullet.y += 8
			}
		} else {
			// Level 1 - straight down only
			bullet.y += 8
		}
		
		// Check collision with players
		if (dist(bullet.x, bullet.y, playerPosition.x, playerPosition.y) < playerRadius + 6) {
			player1Lives--
			hitSound.play()
			enemyBullets.splice(i, 1)
			continue
		}
		if (gameMode === MODE_TWO && dist(bullet.x, bullet.y, player2Position.x, player2Position.y) < playerRadius + 6) {
			player2Lives--
			hitSound.play()
			enemyBullets.splice(i, 1)
			continue
		}

		// Remove if off screen
		if (bullet.y > windowHeight || bullet.x < 0 || bullet.x > windowWidth || bullet.y < 0) {
			enemyBullets.splice(i, 1)
		}
	}

	// Draw and move player bullets (if any)
	for (let i = playerBullets.length - 1; i >= 0; i--) {
		let bullet = playerBullets[i]
		let owner = bullet.owner || 1
		stroke(owner === 2 ? 'cyan' : 'green')
		strokeWeight(4)
		noFill()
		line(bullet.x, bullet.y, bullet.x, bullet.y - 20)
		
		// Check collision with enemies
		let hit = false
		for (let j = enemyPositions.length - 1; j >= 0; j--) {
			let enemy = enemyPositions[j]
			if (abs(enemy.x - bullet.x) < 17 && enemy.y >= bullet.y - 20 && enemy.y <= bullet.y) {
				hitSound.play()
				
				// Reduce enemy health
				enemyHealth[j]--
				
				// If enemy dies, remove it
				if (enemyHealth[j] <= 0) {
					let ownerIndex = owner === 2 ? 1 : 0
					enemyPositions.splice(j, 1)
					enemySpeeds.splice(j, 1)
					enemyHitCounts.splice(j, 1)
					enemyHealth.splice(j, 1)
					playerCoins += 10
					playerKills[ownerIndex]++
					if (playerKills[ownerIndex] > 0 && playerKills[ownerIndex] % 5 === 0) {
						doubleFireCharges[ownerIndex]++
					}
				}
				hit = true
				break
			}
		}
		if (hit) {
			playerBullets.splice(i, 1)
			continue
		}
		
		bullet.y -= 16 // Move up faster

		// Remove if off screen
		if (bullet.y < 0) {
			playerBullets.splice(i, 1)
		}
	}
	
	// Display lives, kills, coins, and level
	fill('white')
	textSize(20)
	if (gameMode === MODE_TWO) {
		text(`P1 Lives: ${player1Lives}`, 10, 30)
		text(`P2 Lives: ${player2Lives}`, 10, 60)
		text(`P1 Kills: ${playerKills[0]}`, 10, 90)
		text(`P2 Kills: ${playerKills[1]}`, 10, 120)
		text(`Level: ${currentLevel}`, 10, 150)
	} else {
		text(`Lives: ${player1Lives}`, 10, 30)
		text(`Coins: ${playerCoins}`, 10, 60)
		text(`Kills: ${playerKills[0]}`, 10, 90)
		text(`Level: ${currentLevel}`, 10, 120)
	}
	
	// Check for level completion
	if (enemyPositions.length == 0 && currentLevel === 1) {
		// All enemies defeated in level 1, start level 2
		initLevel2()
	}
	
	if (enemyPositions.length == 0 && currentLevel === 2) {
		// All enemies defeated in level 2, go to game over (victory)
		if (pewpewSound && pewpewSound.isLoaded() && pewpewSound.isPlaying()) {
			pewpewSound.stop()
		}
		currentScreen = GAMEOVER_SCREEN
	}
	
	// Check for game over (player died)
	if (gameMode === MODE_TWO) {
		if (player1Lives <= 0 || player2Lives <= 0) {
			if (player1Lives <= 0 && player2Lives > 0) {
				gameWinner = 2
			} else if (player2Lives <= 0 && player1Lives > 0) {
				gameWinner = 1
			} else {
				gameWinner = null
			}
			if (pewpewSound && pewpewSound.isLoaded() && pewpewSound.isPlaying()) {
				pewpewSound.stop()
			}
			currentScreen = GAMEOVER_SCREEN
		}
	} else {
		if (player1Lives <= 0) {
			if (pewpewSound && pewpewSound.isLoaded() && pewpewSound.isPlaying()) {
				pewpewSound.stop()
			}
			currentScreen = GAMEOVER_SCREEN
		}
	}
}
