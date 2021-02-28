// window.addEventListener('keydown', (event) => {
// 	let coords = { x: 0, y: 0 };
// 	switch (event.keyCode) {
// 		case 37:
// 			coords.x -= 1;
// 			break;
// 		case 40:
// 			coords.y += 1;
// 			break;
// 		case 38:
// 			coords.y -= 1;
// 			break;
// 		case 39:
// 			coords.x += 1;
// 			break;
// 	}
// 	if (getTile(matrix, player.x + coords.x, player.y + coords.y) !== 1) {
// 		player.x += coords.x;
// 		player.y += coords.y;
// 	}
// 	draw();
// });

// getRoute(matrix, player.x, player.y, 4, 0);
// moveOnPath(matrix, player.x, player.y, 4, 0);

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

// function getRoute(matrix, startX, startY, endX, endY, monster) {
// 	const easystar = new EasyStar.js();
// 	easystar.setGrid(matrix);
// 	easystar.setAcceptableTiles([0]);
// 	easystar.findPath(startX, startY, endX, endY, function (list) {
// 		if (list !== null && list.length) {
// 			monster.x = list[1].x;
// 			monster.y = list[1].y;
// 			draw();
// 			window.setTimeout(() => {
// 				getRoute(matrix, monster.x, monster.y, endX, endY);
// 			}, 100);
// 		}
// 	});
// 	easystar.calculate();
// }
