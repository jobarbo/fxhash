class Branch {
	constructor(startX, startY, baseW) {
		this.startX = startX;
		this.startY = startY;
		this.endX = startX + random([-40, -30, -20, 20, 30, 40]);
		this.endY = startY - random([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
		this.baseWidth = baseW;
	}
	draw() {
		// draw the branch with an ellipse that is filled with the color of the tree and a stroke
		// the width of the ellipse is based on the baseWidth property and the height is based on the height of the tree
		// the ellipse is drawn at the x and y position of the tree and goes left or right
		// the ellipse is slowly getting smaller as it goes

		// draw a line from the start position to the end position
		stroke(0);
		strokeWeight(2);
		line(this.startX, this.startY, this.endX, this.endY);
	}
}
