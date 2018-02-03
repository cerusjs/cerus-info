class disk {
	constructor(data) {
		this._disk = data;
	}

	type() {
		return this._disk.type;
	}

	name() {
		return this._disk.name;
	}

	vendor() {
		return this._disk.vendor;
	}

	firmware() {
		return this._disk.firmwareRevision;
	}

	serial() {
		return this._disk.serialNum;
	}

	interface() {
		return this._disk.interfaceType;
	}

	size() {
		return this._disk.size;
	}

	cylinders() {
		return this._disk.totalCylinders;
	}

	heads() {
		return this._disk.totalHeads;
	}

	tracks() {
		return this._disk.totalTracks;
	}

	tpc() {
		return this._disk.tracksPerCylinder;
	}

	spt() {
		return this._disk.sectorsPerTrack;
	}

	sectors() {
		return this._disk.totalSectors;
	}

	bps() {
		return this._disk.bytesPerSector;
	}
}

module.exports = disk;