var si = require("systeminformation");
var os_ = require("os");

class os {
	constructor(cerus) {
		return cerus.promise(function(event) {
			si.osInfo(function(data) {
				this._os = data;
				event("done");
			}.bind(this));
		}.bind(this));
	}

	hostname() {
		return os_.hostname();
	}

	eol() {
		return os_.EOL;
	}

	platform() {
		return os_.platform();
	}

	release() {
		return os_.release();
	}

	type() {
		return os_.type();
	}

	distro() {
		return this._os.distro;
	}

	codename() {
		return this._os.codename;
	}

	logo() {
		return this._os.logofile;
	}
}

module.exports = os;