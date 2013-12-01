steal.config({
	map: {
		"*": {
      "underscore/underscore.js": "lodash"
		}
	},
	paths: {
    "lodash": 'node_modules/lodash/lodash.js'
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
