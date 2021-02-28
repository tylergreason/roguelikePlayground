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

function drawLine(x0, y0, x1, y1) {
	// from here: https://jsfiddle.net/vpkbunqt/10/
	var tmp;
	var steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);
	if (steep) {
		//swap x0,y0
		tmp = x0;
		x0 = y0;
		y0 = tmp;
		//swap x1,y1
		tmp = x1;
		x1 = y1;
		y1 = tmp;
	}

	var sign = 1;
	if (x0 > x1) {
		sign = -1;
		x0 *= -1;
		x1 *= -1;
	}
	var dx = x1 - x0;
	var dy = Math.abs(y1 - y0);
	var err = dx / 2;
	var ystep = y0 < y1 ? 1 : -1;
	var y = y0;

	let returnList = [];
	for (var x = x0; x <= x1; x++) {
		if (!steep) {
			returnList.push({ x: sign * x, y: y });
		} else {
			returnList.push({ x: y, y: sign * x });
		}
		err = err - dy;
		if (err < 0) {
			y += ystep;
			err += dx;
		}
	}
	return returnList;
}
