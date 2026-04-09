function drawIntroScreen() {
	clear()
	background(backgroundImage)
	textAlign(CENTER)
	textSize(60)
	fill('blue')
	text("Welcome to evolution", windowWidth / 2, windowHeight / 2 - 120)

	let btnWidth = 320
	let btnHeight = 80
	let btnX = windowWidth / 2 - btnWidth / 2
	let btn1Y = windowHeight / 2 - 30
	let btn2Y = btn1Y + btnHeight + 30

	fill('#333')
	rect(btnX, btn1Y, btnWidth, btnHeight, 20)
	rect(btnX, btn2Y, btnWidth, btnHeight, 20)

	fill('white')
	textSize(32)
	text("1 Player", windowWidth / 2, btn1Y + btnHeight / 2 + 8)
	text("2 Player", windowWidth / 2, btn2Y + btnHeight / 2 + 8)

	textSize(22)
	text("Player 1: Arrows + Space", windowWidth / 2, btn2Y + btnHeight + 50)
	text("Player 2: WASD + F", windowWidth / 2, btn2Y + btnHeight + 80)
	text("Click a button to start", windowWidth / 2, btn2Y + btnHeight + 120)
}