export class Level {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.matrix = this.generate(width, height);
	}

	generate(width, height) {
		const returnMatrix = [];
		for (let h = 0; h < height; h++) {
			const row = [];
			for (let w = 0; w < width; w++) {
				row.push({ tile: 0, occupants: [], x: w, y: h });
			}
			returnMatrix.push(row);
		}
		return returnMatrix;
	}

	getTile(x, y) {
		if (this.matrix[y] !== undefined && this.matrix[y][x] !== undefined) {
			return this.matrix[y][x];
		}
	}

	occupy(x, y, monster) {
		this.getTile(x, y).occupants.push(monster);
	}

	occupied(x, y) {
		return !!this.getTile(x, y).occupants.length;
	}

	unoccupy(x, y, monster) {
		return (this.getTile(x, y).occupants = this.getTile(
			x,
			y
		).occupants.filter((occupant) => {
			occupant !== monster;
		}));
	}

	occupiedTiles() {
		const returnArray = [];
		this.matrix.forEach((row, indexY) => {
			row.forEach((col, indexX) => {
				if (col.occupants.length) {
					returnArray.push(col);
				}
			});
		});
	}

	unoccupiedTiles() {
		const returnArray = [];
		this.matrix.forEach((row) => {
			row.forEach((col) => {
				if (!col.occupants.length) {
					returnArray.push(col);
				}
			});
		});
		return returnArray;
	}

	get tileMatrix() {
		return this.matrix.map((col) => {
			return col.map((row) => {
				return (row = row.tile);
			});
		});
	}

	randomTile(restriction = '') {
		if (restriction === 'occupied') {
			const occupiedTiles = this.occupiedTiles();
			return occupiedTiles[
				Math.floor(Math.random() * occupiedTiles.length)
			];
		} else if (restriction === 'unoccupied') {
			const unoccupiedTiles = this.unoccupiedTiles();
			return unoccupiedTiles[
				Math.floor(Math.random() * unoccupiedTiles.length)
			];
		} else {
			const randomWidth = Math.floor(Math.random() * this.matrix.length);
			const randomHeight = Math.floor(
				Math.random() * this.matrix[0].length
			);
			return this.matrix[randomwWidth][randomHeight];
		}
	}
}
