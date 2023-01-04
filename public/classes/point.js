class Intersection {
	constructor(position) {
		this.position = position;
		this.edges = [];
		this.edges.push(this);
	}

	show() {
		fill(255);
		ellipse(this.position.x, this.position.y, 10, 10);
	}
}
