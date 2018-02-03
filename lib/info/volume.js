class volume {
	constructor(data) {
		this._volume = data;
	}

	name() {
		return this._volume.name;
	}

	type() {
		return this._volume.type;
	}

	system() {
		return this._volume.fstype;
	}

	size() {
		return this._volume.size;
	}

	used() {
		return this._volume.used;
	}

	percentage() {
		return this._volume.use;
	}

	mount() {
		return this._volume.mount;
	}

	physical() {
		return this._volume.physical;
	}

	uuid() {
		return this._volume.uuid;
	}

	label() {
		return this._volume.label;
	}

	model() {
		return this._volume.model;
	}

	serial() {
		return this._volume.serial;
	}

	removable() {
		return this._volume.removable;
	}

	protocol() {
		return this._volume.protocol;
	}
}

module.exports = volume;