(function () {
	var element;
	var element2;
	var baseDate = Date.now();
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = 512;
	canvas.height = 480;
	document.body.appendChild(canvas);

	function testowo (argument) {
		console.log(argument);
	}

	engine.SetData('loadData', {detail: {dataRes: 'mario.jpg', dir: 'img/sprites/'}});
	engine.SetData('setFinalizeFuncs', {detail: [init]});

	function init () {
		var img = engine.Api.resourcesCache.getResource('mario.jpg');
		element = new engine.Api.setSprite(ctx, img, [0, 0], [20, 30], [0,1,2,3,4,3,2,1,0], 20, 0, true);
		element.render();

		element2 = new engine.Api.setSprite(ctx, img, [100, 100], [20, 30], [0,1,2,3,4,3,2,1,0], 20, 0, true);
		element2.render();

		update();
	}

	function update () {
		var nowDate = Date.now();
		var interval = (nowDate - baseDate) / 1000.0

		element.update(interval);
		element2.update(interval);
		baseDate = nowDate;
		setTimeout(update,1000/30);
	}
})();