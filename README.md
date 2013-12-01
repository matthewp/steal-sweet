# steal-sweet

steal-sweet is a [Steal](http://javascriptmvc.com/docs/steal.html) loader for [sweet.js](http://sweetjs.org/). This allows you to work with macros as you develop without the time-consuming compilation step that you have from using the `sjs` command line tool.

Additionally steal-sweet has the advantage of allows you to define macros that can be used by all of your `.sjs` files.

## Download

The best way to get **steal-sweet** is through [bower](http://bower.io/).

```shell
bower install steal-sweet --save
```

This will add steal-sweet to your `bower.json` file so when you deploy your app (or just share it with colleagues) all you have to do is `bower install`.

Alternatively you can clone the git repository from [here](https://github.com/matthewp/steal-sweet.git).

## Usage

You can use steal-sweet just like any another steal type loader. Just add it as an extension in your `stealconfig.js` like so:

```javascript
steal.config({
	ext: {
		"sjs": "bower_components/steal-sweet/sweet/sweet.js"
	}
});
```

(or wherever the `sweet/sweet.js` file is located).

You also might want to take advantage of **steal-sweet**'s ability to define global macro dependencies. This way you can define a macro in its own file and then use it globally. To do this simply add a `macros` array like so:

```javascript
steal.config({
	ext: {
		"sjs": {
			id: "bower_components/steal-sweet/sweet/sweet.js",
			macros: ["macros/class.sjs", "macros/destruct.sjs"]
		}
	}
}
```

These macros will be compiled along with any other `.sjs` file. Then all you need to do is:

```javascript
steal("path/to/module.sjs", function(mod){
	// Mod has been compiled to ES5 compatible JavaScript, your macros applied.
});
```

See the **example** folder for an idea of how you can use steal-sweet in your project.

## License

[Apache version 2](http://www.apache.org/licenses/LICENSE-2.0.html)
