// use single instance of easystar
const easystar = new EasyStar.js();

function getTile(matrix, x, y) {
	if (matrix[y] !== undefined && matrix[y][x] !== undefined) {
		return matrix[y][x];
	}
}

function moveOnPath(matrix, startX, startY, endX, endY) {
	const easystar = new EasyStar.js();
	easystar.setGrid(matrix);
	easystar.setAcceptableTiles([0]);
	easystar.findPath(startX, startY, endX, endY, function (list) {
		if (list !== null && list.length) {
			list.forEach((coords, idx) => {
				window.setTimeout(() => {
					player.x = coords.x;
					player.y = coords.y;
					draw();
				}, 200 * idx);
			});
		}
	});
	easystar.calculate();
}

function randomFromArray(arr) {
	if (arr.length) {
		return arr[Math.floor(Math.random() * arr.length)];
	}
}

function pathagorean(startX, startY, endX, endY) {
	return Math.sqrt(Math.pow(startX - endX, 2) + Math.pow(startY - endY, 2));
}
