import { constants } from './constants.js';
import { Monster, monsters } from './classes/Monster.js';
import { Level } from './classes/Level.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.backgroundColor = 'grey';

const level = new Level(3, 8);

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawMap(matrix) {
	for (let col = 0; col < matrix.length; col++) {
		for (let row = 0; row < matrix[col].length; row++) {
			let color;
			if (matrix[col][row].tile > 0) {
				color = 'blue';
			} else {
				color = 'pink';
			}
			ctx.fillStyle = color;
			ctx.fillRect(
				constants.tileSize * row,
				constants.tileSize * col,
				constants.tileSize,
				constants.tileSize
			);
		}
	}
}

for (let i = 0; i < 4; i++) {
	const spawnTile = level.randomTile('unoccupied');
	let newMonster = new Monster(
		spawnTile.x,
		spawnTile.y,
		level,
		5,
		5,
		4,
		1,
		1,
		'common',
		i.toString(),
		'black'
		// randomFromArray(['green', 'pink', 'blue', 'black', 'purple', 'orange'])
	);
}

function drawCharacter(char) {
	ctx.font = '20px Arial';
	ctx.fillStyle = char.color || 'black';
	ctx.textBaseline = 'top';
	ctx.fillText(
		char.glyph,
		char.x * constants.tileSize,
		char.y * constants.tileSize
	);
}

function draw() {
	clearCanvas();
	drawMap(level.matrix);
	monsters.forEach((monster) => {
		drawCharacter(monster);
		monster.act(level);
	});
	debugger;
	monsters[0].findClosest(monsters);
}

function getRoute(matrix, startX, startY, endX, endY, monster) {
	const easystar = new EasyStar.js();
	easystar.setGrid(matrix);
	easystar.setAcceptableTiles([0]);
	easystar.findPath(startX, startY, endX, endY, function (list) {
		if (list !== null && list.length) {
			monster.x = list[1].x;
			monster.y = list[1].y;
			draw();
			window.setTimeout(() => {
				getRoute(matrix, monster.x, monster.y, endX, endY);
			}, 100);
		}
	});
	easystar.calculate();
}

window.setInterval(() => {
	draw();
}, 500);
