var si = require("systeminformation");

class memory {
	constructor(cerus) {
		this._cerus = cerus;

		return cerus.promise(function(event) {
			si.mem(function(data) {
				this._memory = data;
				event("done", this);
			}.bind(this));
		}.bind(this));
	}

	system() {
		return new system(this._memory);
	}

	heap() {
		return new heap();
	}

	swap() {
		return new swap(this._memory);
	}

	sticks() {
		return this._cerus.promise(function(event) {
			si.memLayout(function(sticks) {
				sticks.forEach(function(stick_) {
					event("stick", new stick(stick_));
				});
			}.bind(this));
		}.bind(this));
	}

	resident() {
		return process.memoryUsage().rss;
	}

	external() {
		return process.memoryUsage().external;
	}
}

module.exports = memory;

class system {
	constructor(data) {
		this._memory = data;
	}

	free() {
		return this._memory.free;
	}

	total() {
		return this._memory.total;
	}

	used() {
		return this._memory.used;
	}

	active() {
		return this._memory.active;
	}

	cache() {
		return this._memory.buffcache;
	}

	available() {
		return this._memory.available;
	}
}

class swap {
	constructor(data) {
		this._memory = data;
	}

	free() {
		return this._memory.swapfree;
	}

	used() {
		return this._memory.swapused;
	}

	total() {
		return this._memory.swaptotal;
	}
}

class heap {
	constructor() {
		this._memory = process.memoryUsage();
	}

	free() {
		return this._memory.heapTotal - this._memory.heapUsed;
	}

	used() {
		return this._memory.heapUsed;
	}

	total() {
		return this._memory.heapTotal;
	}
}

class stick {
	constructor(data) {
		this._stick = data;
	}

	size() {
		return this._stick.size;
	}

	type() {
		return this._stick.type;
	}

	bank() {
		return this._stick.bank;
	}

	form() {
		return this._stick.formFactor;
	}

	manufacturer() {
		return this._stick.manufacturer;
	}

	part() {
		return this._stick.partNum;
	}

	serial() {
		return this._stick.serialNum;
	}

	voltage() {
		return new voltage(this._stick);
	}
}

class voltage {
	constructor(data) {
		this._stick = data;
	}

	configured() {
		return this._stick.voltageConfigured;
	}

	min() {
		return this._stick.voltageMin;
	}

	max() {
		return this._stick.voltageMax;
	}
}