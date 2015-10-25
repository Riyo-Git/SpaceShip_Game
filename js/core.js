//Canvas start
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//Looper
var lastTime;
function main () {
	var nowDate = Date.now();
	var dataTime = (nowDate - lastTime) / 1000.0;

	updateGameTime(dataTime);
	render();

	lastTime = nowDate;
	requestAnimFrame(main);

}

function init () {
	terrainBg = ctx.createPattern(resources.get('img/terrain.png'), 'repeat');

	document.getElementById('play-again').addEventListener('click', function () {
		reset();
	});
}

resources.load([
	'img/sprites.png',
	'img/terrain.png'
	]);
resources.onReady(init);

// Game state
var player = {
	pos: [0,0],
	sprites: new Sprite('img/sprites.png', [0, 0], [39,39], 16, [0,1])
};
var bullets = [];
var enemies = [];
var explosions = [];

var lastFire = Date.now();
var gameTime = 0;
var isGameOver;
var terrainPattern;

// The score

var score = 0;
var scoreEl = document.getElementById('score');

