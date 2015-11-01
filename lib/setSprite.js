(function () {
	var setSprite = {
		params: {
			ctx: '',
			name: '',
			size: [],
			frame: 0,
			frames: [],
			speed: 0,
			repeat: true,
			active: true,
			pause: 0
		},
		init: function (ctx, name, size, frames, speed, pause, repeat) {
			var _ = setSprite;
			if(ctx && name && size && frames){
				_.params.ctx = ctx;
				_.params.name = name;
				_.params.size = size;
				_.params.frames = frames;
				_.params.speed = speed||_.params.speed;
				_.params.pause = pause||_.params.pause;
				_.params.repeat = (repeat!==undefined&&repeat!=='undefined'&&repeat!=='') ? repeat:_.params.repeat;
			}else{
				console.log('Set variables!');
			}

		},
		render: function () {
			var _ = setSprite;
			var max = _.params.frames.length;
			var x = 0;
			if(max > Math.floor(_.params.frame)){
				if(typeof _.params.speed === 'number' && _.params.speed > 0){
					x = _.params.frames[Math.floor(_.params.frame)] * _.params.size[0];	
				}
				if(_.params.active){
					_.params.ctx.drawImage(_.params.name, x, 0, _.params.size[0], _.params.size[1], 0, 0, _.params.size[0], _.params.size[1] );
				}
				
			}else{
				if(_.params.repeat){
					_.params.frame = 0;
				}else{
					if(Math.floor(_.params.frame+1)===(max+_.params.pause)){
						_.params.active = true;
						_.params.frame = 0;
					}else{
						_.params.active = false;
					}
				}
			}
		},
		update: function (dt) {
			var _ = setSprite;
			_.params.frame += _.params.speed * dt;

			_.render();
		}
	};

    engine.ReturnData([['setSprite', setSprite, 'init'], ['setSprite', setSprite, 'render'], ['setSprite', setSprite, 'update']]);

})();