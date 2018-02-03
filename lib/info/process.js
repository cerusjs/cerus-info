class process {
	constructor(data) {
		this._process = data;
	}

	pid() {
		return this._process.pid;
	}

	name() {
		return this._process.name;
	}

	cpu() {
		return new cpu(this._process);
	}

	memory() {
		return new memory(this._process);
	}

	priority() {
		return this._process.priority;
	}

	started() {
		return this._process.started;
	}

	state() {
		return this._process.state;
	}

	user() {
		return this._process.user;
	}

	command() {
		return this._process.command;
	}

	states() {
		return new states();
	}
}

module.exports = process;

class cpu {
	constructor(data) {
		this._process = data;
	}

	overall() {
		return this._process.pcpu;
	}

	user() {
		return this._process.pcpuu;
	}

	sys() {
		return this._process.pcpus;
	}
}

class memory {
	constructor(data) {
		this._process = data;
	}

	percentage() {
		return this._process.pmem;
	}

	virtual() {
		return this._process.mem_vsz;
	}

	resident() {
		return this._process.mem_rss;
	}
}

class states {
	start() {
		return "START";
	}

	ready() {
		return "READY";
	}

	running() {
		return "RUNNING";
	}

	terminated() {
		return "TERMINATED";
	}

	wait() {
		return "WAIT";
	}
}