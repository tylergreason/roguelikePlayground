export let monsters = [];
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
		level.occupy(this.x, this.y, this);
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
			return {
				...ele,
				distance: pathagorean(this.x, this.y, ele.x, ele.y),
			};
		});
		return arrWithDistances.sort((a, b) => {
			return a.distance - b.distance;
		});
	}

	findInDistance(arr, range) {
		return this.sortByDistance(arr).filter(
			(ele, idx) => ele.distance <= range && idx > 0
		);
	}

	findSurrounding(arr) {
		return this.sortByDistance(arr).filter(
			(ele, idx) => ele.distance < 2 && idx > 0
		);
	}

	findClosest(arr) {
		const list = this.sortByDistance(arr);
		if (list.length) {
			return list[0];
		}
	}

	findDistance(monster) {
		return pathagorean(this.x, this.y, monster.x, monster.y);
	}

	los(level, target) {
		let line = drawLine(this.x, this.y, target.x, target.y);
		line.splice(0, 1);
		line.splice(line.length - 1, 1);
		console.log(line);

		return !line.find((coords) => {
			const tile = level.getTile(coords.x, coords.y);
			console.log(tile);
			return (
				level.occupied(coords.x, coords.y) ||
				!this.acceptableTiles.includes(tile.tile)
			);
		});
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
		if (target.hp <= 0) {
			target.die();
		}
	}

	die() {
		monsters = monsters.filter((m) => m !== this);
	}
}
