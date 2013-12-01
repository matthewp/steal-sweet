steal('./compiler/escodegen.js', 'underscore')
	.then('./compiler/parser.js')
	.then('./compiler/expander.js')
	.then('./compiler/sweet.js')
	.then(function(){
	
	// Reference to sweet.
	var sweet = window.sweet;

	var requestFactory = function() {
		return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
	};

	var request = function( options, success, error ) {
		var request = new requestFactory(),
			contentType = (options.contentType || "application/x-www-form-urlencoded; charset=utf-8"),
			clean = function() {
				request = check = clean = null;
			},
			check = function() {
				var status;
				if ( request && request.readyState === 4 ) {
					status = request.status;
					if ( status === 500 || status === 404 || status === 2 || request.status < 0 || (!status && request.responseText === "") ) {
						error && error(request.status);
					} else {
						success(request.responseText);
					}
					clean();
				}
			};
		request.open("GET", options.src + '', !(options.async === false));
		request.setRequestHeader("Content-type", contentType);
		if ( request.overrideMimeType ) {
			request.overrideMimeType(contentType);
		}

		request.onreadystatechange = check;
		try {
			request.send(null);
		}
		catch (e) {
			if ( clean ) {
				console.error(e);
				error && error();
				clean();
			}
		}
	};

	var macroModules = {};

	/**
	 * @function kickStartMacros
	 *
	 * `kickStartMacros` is used to load macros that are defined
	 * in stealconfig.js. A user can set up their stealconfig like:
	 *
	 * steal.config({
	 *   ext: {
	 *     sjs: {
	 *       id: "path/to/sweet.js",
	 *       macros: ["example/class.sjs"]
	 *     }
	 *	 }
	 * });
	 *
	 * By doing this the modules defined in `macros` will be applied
	 * to all `sjs` files loaded by steal. This is useful because
	 * sweet.js has no built-in way to do modules.
	 *
	 */
	function kickStartMacros(options, callback) {
		var next = function(modules) {
			if(!modules.length) {
				return callback();
			}

			var module = modules.shift();
			request(module.options, function(text){
				macroModules[module.options.id+""] = text;
				next(modules);
			});
		};

		if(options.needs.length && options.needs[0].macros) {
			var macros = options.needs[0].macros;
			var make = steal.Module.make;
			var modules = [];

			while(macros.length) {
				var macro = macros.shift();
				var module = make(macro);
				modules.push(module);
			}
			next(modules);
		} else {
			callback();
		}
	}

	var has = Object.prototype.hasOwnProperty;

	steal.type("sjs js", function(options, success, error){
		kickStartMacros(options, function() {
			var moduleText = "";
			for(var p in macroModules) {
				if(has.call(macroModules, p)) {
					moduleText += macroModules[p] + "\n\n";
				}
			}

			request(options, function(text){
				text = moduleText + text;
				options.text = sweet.compile(text);
				success();

			}, error);

		});
	});

});
