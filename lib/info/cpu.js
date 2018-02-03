var si = require("systeminformation");
var os = require("os");

class cpu {
	constructor(cerus) {
		this._cerus = cerus;

		return cerus.promise(function(event) {
			si.cpu(function(data) {
				this._cpu = data;
				event("done", this);
			}.bind(this));
		}.bind(this));
	}

	cores() {
		var cores = os.cpus();

		cores.map(function(data) {
			return new core(data);
		});
	}

	arch() {
		return os.arch();
	}

	endianness() {
		return os.endianness();
	}

	load() {
		return os.loadavg();
	}

	vendor() {
		return this._cpu.vendor;
	}

	manufacturer() {
		return this._cpu.manufacturer;
	}

	brand() {
		return this._cpu.brand;
	}

	model() {
		return this._cpu.model;
	}

	family() {
		return this._cpu.family;
	}

	cache() {
		return new cache(this._cpu.cache);
	}

	stepping() {
		return this._cpu.stepping;
	}

	revision() {
		return this._cpu.revision;
	}

	temp() {
		return new temp(this._cerus);
	}

	speed() {
		return new speed(this._cerus);
	}
}

module.exports = cpu;

class core {
	constructor(data) {
		this._core = data;
	}

	model() {
		return this._core.model;
	}

	speed() {
		return this._core.speed;
	}

	times() {
		return new times(this._core.times);
	}
}

class times {
	constructor(data) {
		this._times = data;
	}

	user() {
		return this._times.user;
	}

	nice() {
		return this._times.nice;
	}

	sys() {
		return this._times.sys;
	}

	idle() {
		return this._times.idle;
	}

	irq() {
		return this._times.irq;
	}
}

class cache {
	constructor(data) {
		this._cache = data;
	}

	l1d() {
		return this._cache.l1d;
	}

	l1i() {
		return this._cache.l1i;
	}

	l2() {
		return this._cache.l2;
	}

	l3() {
		return this._cache.l3;
	}
}

class temp {
	constructor(cerus) {
		return cerus.promise(function(event) {
			si.cpuTemperature(function(data) {
				this._temp = data;
				event("done", this);
			}.bind(this));
		}.bind(this));
	}

	max() {
		return this._temp.max;
	}

	main() {
		return this._temp.main;
	}

	cores() {
		return this._temp.cores;
	}
}

class speed {
	constructor(cerus) {
		return cerus.promise(function(event) {
			si.cpuCurrentspeed(function(data) {
				this._speed = data;
				event("done", this);
			}.bind(this));
		}.bind(this));
	}

	average() {
		return this._speed.avg;
	}

	min() {
		return this._speed.min;
	}

	max() {
		return this._speed.max;
	}
}
