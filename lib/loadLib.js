var engine = {
	Api: {},
    ReturnData: function (data) {
    	var _ = this;
        var element;

        data.forEach(function (params) {
        	var attr = params[2];
        	var elem = params[1];
        	var name = params[0];
        	if((params.length === 2 || params.length === 3) && typeof name === 'string'){
		        if(attr){
		            element = elem[attr];
		            if(element!==undefined&&element!=='undefined'&&element!==''&&element!==null){
			             var mainObject = _.Api[name];
			             mainObject = mainObject||{};
			             mainObject[attr]=element;
			             _.Api[name] = mainObject;
		        	}
		        }
		        else{
		            element = elem;
		            if(element!==undefined&&element!=='undefined'&&element!==''&&element!==null){
		            	 _.Api[name]=element;
		        	}   
		        }
	    	}
        });
    },
    SetDataInitFunc: function (funcs) {
    	var _ = this;
    	var event;
    	var func;

    	funcs.forEach(function (data) {
    		func = data[1];
    		funcName = String(data[0]);


	    	if(func && funcName){
		    	document.addEventListener(funcName, func);
			}else{
				console.log('Set function data!');
			}
		});
    },
    SetData: function (func,data) {
    	var _ = this;
    	var event;
    	var func = String(func);

   		if(funcName && data){
			var event = new CustomEvent(func, data);
			document.dispatchEvent(event);
		}else{
			console.log('Set data!');
		}
    }
}