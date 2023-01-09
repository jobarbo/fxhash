// this class is used to create a tree structure that comes from the ground to the sky
// the tree is made of multiple branches
// each branch is made of multiple leaves (maybe)
// each branch is made of multiple branches (maybe)
// each tree are drawn behind the horizon line

class Tree {
	constructor(points) {
		console.log(points);
		this.x = random(100, width - 100);
		this.baseY = points.y;
		this.y = this.baseY;
		this.height = random(150, 300);
		this.baseWidth = random(4, 10);
		this.width = this.baseWidth;
		this.hue = 35;
		this.saturation = 20;
		this.brightness = random(10, 30);
		this.inc = 1;
		this.branchNodesNumber = random(1, 3);
		this.branchesNodes = [];
		this.leaves = [];
	}
	draw() {
		// draw the trunk with an ellipse that is filled with the color of the tree and a stroke
		// the width of the ellipse is based on the baseWidth property and the height is based on the height of the tree
		// the ellipse is drawn at the x and y position of the tree
		// the ellipse is slowly getting smaller as it goes up
		// the ellipse is drawn from the bottom to the top of the tree

		// make the ellipse smaller as it goes up and draw it from the bottom to the top of the tree
		// draw the trunk with an ellipse that is filled with the color of the tree and a stroke
		// draw the trunk until the width of the ellipse is smaller than 1

		for (let y = this.y; y > this.y - this.height; y -= this.inc) {
			fill(this.hue, this.saturation, this.brightness);
			stroke(this.hue, this.saturation, this.brightness - 10);
			strokeWeight(1);
			ellipse(this.x, y, this.width, this.width * 2);
			this.width -= 0.02;
			if (this.width < 1) {
				this.width = 1;
			}
		}

		// create the nodes of the branches
		// the nodes are stored in an array
		for (let i = 0; i < this.branchNodesNumber; i++) {
			let x = this.x;
			let y = random(this.y - this.height / 1.2, this.y - this.height / 3);
			// check if y is not too close to another node
			// if it is, then change the y position
			for (let j = 0; j < this.branchesNodes.length; j++) {
				if (y > this.branchesNodes[j].y - 20 && y < this.branchesNodes[j].y + 20) {
					y = random(this.y - this.height / 1.3, this.y - this.height / 3);
					j = 0;
				}
			}

			this.branchesNodes.push({x: x, y: y, width: this.baseWidth});

			// rotate the tree slightly
			// translate the tree to the center of the canvas

			//stroke(10, 100, 100);
			//strokeWeight(10);
			//point(x, y);

			let branch = new Branch(this.branchesNodes[i].x, this.branchesNodes[i].y, this.branchesNodes[i].width);
			branch.draw();
		}
	}
}
