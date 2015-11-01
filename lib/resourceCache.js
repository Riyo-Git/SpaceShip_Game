(function() {
    var elementsToLoad = 0;
    var elementsLoaded = 0;
    var resourcesCache = {
        baseDir: './',
        elements: {},
        readyToRun: true,
        finalizeFunc: [],

        loadData: function(data) {
            var data = data.detail;
            var dataRes = data.dataRes;
            var dir = data.dir;
            var _ = resourcesCache;
            _.baseDir = dir || _.baseDir;

            if (dataRes instanceof Array) {
                dataRes.forEach(function(name) {
                    elementsToLoad++;
                    _.loadRes(name);
                })
            } else {
                elementsToLoad++;
                _.loadRes(dataRes);
            }
        },
        loadRes: function(name) {
            var _ = resourcesCache;

            if (_.elements[name]) {
                return _.resourcesCache[name];
            } else {
                var img = new Image();

                _.elements[name] = false;
                img.src = _.baseDir + name;

                img.onload = function() {
                    _.elements[name] = img;
                    elementsLoaded++;

                    if (elementsToLoad === elementsLoaded) {
                        _.finalizeFunc.forEach(function(func) {
                            func();
                        })
                    }
                };

                img.onerror =function () {
                    console.log('Reasource not find!')
                }
            }
        },
        setFinalizeFuncs: function (data) {
        	var _ = resourcesCache;
            var data = data.detail;

        	if(data instanceof Array){
        		data.forEach(function (func) {
        			_.finalizeFunc.push(func);
        		});
        	}else{
        		_.finalizeFunc.push(data);
        	}
        },
		getResource: function (name) {
			var _ = resourcesCache;
			var isInCache = false;

			if(_.elements.hasOwnProperty(name) && _.elements[name]){
				isInCache = true;
			}

			if(isInCache){
				return _.elements[name];
			}else{
				return undefined;
			}
		},
        getElementsToLoad: function () {
            return elementsToLoad;
        },
        getElementsLoaded: function () {
            return elementsLoaded;
        },    
    }

    engine.SetDataInitFunc([['loadData', resourcesCache.loadData],['setFinalizeFuncs', resourcesCache.setFinalizeFuncs]]);

    engine.ReturnData([ ['resourcesCache', resourcesCache, 'getResource'], 
                        ['resourcesCache', resourcesCache, 'getElementsToLoad'], 
                        ['resourcesCache', resourcesCache,'getElementsLoaded']]);
})()
