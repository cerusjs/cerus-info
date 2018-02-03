var si = require("systeminformation");

class graphics {
	constructor(cerus) {
		return cerus.promise(function(event) {
			si.graphics(function(data) {
				this._controllers = data.controllers.map(function(data) {
					return new controller(data);
				});

				this._displays = data.displays.map(function(data) {
					return new display(data);
				});

				event("done", this);
			}.bind(this));
		}.bind(this));
	}

	controllers() {
		return this._controllers;
	}

	displays() {
		return this._displays;
	}
}

module.exports = graphics;

class controller {
	constructor(data) {
		this._controller = data;
	}

	model() {
		return this._controller.model;
	}

	vendor() {
		return this._controller.vendor;
	}

	bus() {
		return this._controller.bus;
	}

	vram() {
		return this._controller.vram;
	}

	dynamic() {
		return this._controller.vramDynamic;
	}
}

class display {
	constructor(data) {
		this._display = data;
	}

	model() {
		return this._display.model;
	}

	main() {
		return this._display.main;
	}

	builtin() {
		return this._display.builtin;
	}

	connection() {
		return this._display.connection;
	}

	resolution() {
		return new size(this._display.resolutionx, this._display.resolutiony);
	}

	size() {
		return new size(this._display.sizex, this._display.sizey);
	}

	depth() {
		return this._display.pixeldepth;
	}
}

class size {
	constructor(x, y) {
		this._x = x;
		this._y = y;
	}

	x() {
		return this._x;
	}

	width() {
		return this.x();
	}

	y() {
		return this._y;
	}

	height() {
		return this.y();
	}
}