export const monsters = [];
export class Monster {
	constructor(
		x,
		y,
		level,
		hp,
		hpMax,
		moveRange,
		damage,
		range,
		logicType,
		glyph,
		color,
		acceptableTiles = [0]
	) {
		this.x = x;
		this.y = y;
		level.occupy(this.x, this.y);
		this.hp = hp;
		this.hpMax = hpMax;
		this.moveRange = moveRange;
		this.damage = damage;
		this.range = range;
		this.logicType = logicType;
		this.glyph = glyph;
		this.color = color;
		this.acceptableTiles = acceptableTiles;

		monsters.push(this);
	}

	// moveTo(matrix, startX, startY, endX, endY) {
	// 	if (!this.acceptableTiles.includes(getTile(matrix, endX, endY))) {
	// 		const easystar = new EasyStar.js();
	// 		easystar.setGrid(matrix);
	// 		easystar.setAcceptableTiles([0]);
	// 		easystar.findPath(startX, startY, endX, endY, function (list) {
	// 			console.log(list);
	// 			if (list !== null && list.length) {
	// 				list.forEach((coords, idx) => {
	// 					window.setTimeout(() => {
	// 						this.x = coords.x;
	// 						this.y = coords.y;
	// 					}, 200 * idx);
	// 				});
	// 			}
	// 		});
	// 		easystar.calculate();
	// 	}
	// }

	moveOne(level, startX, startY, endX, endY) {
		easystar.setGrid(level.tileMatrix);
		easystar.setAcceptableTiles(this.acceptableTiles);
		let self = this;
		easystar.findPath(startX, startY, endX, endY, function (list) {
			if (list !== null && list.length) {
				if (!level.occupied(list[1].x, list[1].y)) {
					level.unoccupy(self.x, self.y, self);
					self.x = list[1].x;
					self.y = list[1].y;
					level.occupy(self.x, self.y, self);
				}
			}
		});
		easystar.calculate();
	}

	sortByDistance(arr) {
		const arrWithDistances = arr.map((ele) => {
			const xDiff = Math.pow(this.x - ele.x, 2);
			const yDiff = Math.pow(this.y - ele.y, 2);
			return { ...ele, distance: Math.sqrt(xDiff + yDiff) };
		});
		return arrWithDistances.sort((a, b) => {
			return a.distance - b.distance;
		});
	}

	findClosest(arr) {
		const list = this.sortByDistance(arr);
		if (list.length) {
			return list[0];
		}
	}

	findDistance(monster) {
		const xDiff = Math.pow(this.x - monster.x, 2);
		const yDiff = Math.pow(this.y - monster.y, 2);
		return Math.sqrt(xDiff + yDiff);
	}

	act(level) {
		switch (this.logicType) {
			case 'common':
				const finalX = Math.floor(
					Math.random() * level.matrix[0].length
				);
				const finalY = Math.floor(Math.random() * level.matrix.length);
				this.moveOne(level, this.x, this.y, finalX, finalY);
				break;
		}
	}

	attack(target) {
		target.hp -= this.damage;
	}
}
