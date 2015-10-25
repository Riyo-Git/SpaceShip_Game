(function () {
	var resourceCache = {};
	var loading = [];
	var readyCallbacks = [];

	function load (urlOrSeq) {
		if(urlOrSeq instanceOf Array){
			urlOrSeq.forEach(function (url) {
				_load(url);
			})
		}else{
			_load(urlOrSeq);
		}
	}

	function _load (url) {
		if(resourceCache[url]){
			return resourceCache[url];
		}else{
			var img = new Image();
			resourceCache[url] = false;
			img.src = url;

			img.onload = function () {
				resourceCache[url] = img;

				if(isReady()){
					readyCallbacks.forEach(function (doIt) {
						doIt();
					});
				};
			}
			img.src = url;
		}
	}

	function get (url) {
		return resourceCache[url];
	}

	function isReady () {
		var ready = true;
		for(var k in resourceCache){
			if(resourceCache.hasOwnProperty(k) && !resourceCache[k]){
				ready = false;
			}
		}
		return ready;
	}

	function onReady (doIt) {
		readyCallbacks.push(doIt);
	}

	window.resources = {
		load: load,
		get: get,
		onReady: onReady,
		isReady: isReady
	};
})();