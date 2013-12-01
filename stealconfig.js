steal.config({
	map: {
		"*": {
      "underscore/underscore.js": "underscore"
		}
	},
	paths: {
    "underscore": 'node_modules/underscore/underscore.js'
	},
	shim : {
    underscore: {
      exports: "_"
    }
	},
	ext: {
		js: "js",
		css: "css",
    sjs: {
      id: "sweet/sweet.js",
      macros: ["example/class.sjs"]
    }
	}
})
