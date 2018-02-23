var os = require("./info/os");
var connection = require("./info/connection");
var cpu = require("./info/cpu");
var disk = require("./info/disk");
var graphics = require("./info/graphics");
var memory = require("./info/memory");
var network = require("./info/network");
var volume = require("./info/volume");
var process_ = require("./info/process");
var os_ = require("os");
var si = require("systeminformation");

class info {
	constructor(cerus) {
		this._cerus = cerus;
	}

	time() {
		return new time();
	}

	dirs() {
		return new dirs();
	}

	os() {
		return new os(this._cerus);
	}

	system() {
		return new system(this._cerus);
	}

	baseboard() {
		return new baseboard(this._cerus);
	}

	memory() {
		return new memory(this._cerus);
	}

	networks() {
		return this._cerus.promise(function(event) {
			var temp = os_.networkInterfaces();

			si.networkInterfaces(function(interfaces) {
				interfaces.forEach(function(interface_) {
					si.networkStats(interface_.iface, function(interface) {
						event("network", new network(Object.assign({}, temp[interface_.iface], interface_, interface)));
					});
				});
			});
		});
	}

	connections() {
		return this._cerus.promise(function(event) {
			si.networkConnections(function(connections) {
				connections.forEach(function(connection_) {
					event("connection", new connection(connection_));
				});
			});
		});
	}

	cpu() {
		return new cpu(this._cerus);
	}

	disks() {
		return this._cerus.promise(function(event) {
			si.diskLayout(function(disks) {
				disks.forEach(function(disk_) {
					event("disk", new disk(disk_));
				});
			});
		});
	}

	volumes() {
		return this._cerus.promise(function(event) {
			si.fsSize(function(volumes) {
				si.blockDevices(function(devices) {
					devices.forEach(function(device) {
						event("volume", new volume(Object.assign({}, device, volumes.find(volume => volume.fs === device.name))));
					});
				});
			});
		});
	}

	battery() {
		return new battery();
	}

	user() {
		return new user();
	}

	arguments() {
		return process.argv;
	}

	root() {
		return process.cwd();
	}

	ids() {
		return new ids();
	}

	graphics() {
		return new graphics(this._cerus);
	}

	processes() {
		return this._cerus.promise(function(event) {
			si.processes(function(processes) {
				processes.list.forEach(function(process__) {
					event("process", new process_(process__));
				});
			});
		});
	}

	bios() {
		return new bios(this._cerus);
	}
}

class time {
	uptime() {
		return si.time().uptime;
	}

	current() {
		return si.time().current;
	}

	timezone() {
		return si.time().timezon;
	}
}

class dirs {
	home() {
		return os_.homedir();
	}

	temp() {
		return os_.tmpdir();
	}
}

class bios {
	constructor(cerus) {
		return cerus.promise(function(event) {
			si.bios(function(data) {
				this._bios = data;
				event("done", this);
			}.bind(this));
		}.bind(this));
	}

	vendor() {
		return this._bios.vendor;
	}

	version() {
		return this._bios.version;
	}

	release() {
		return this._bios.releaseDate;
	}

	revision() {
		return this._bios.revision;
	}
}

class system {
	constructor(cerus) {
		return cerus.promise(function(event) {
			si.system(function(data) {
				this._system = data;
				event("done", this);
			}.bind(this));
		}.bind(this));
	}

	manufacturer() {
		return this._system.manufacturer;
	}

	model() {
		return this._system.model;
	}

	version() {
		return this._system.version;
	}

	serial() {
		return this._system.serial;
	}

	uuid() {
		return this._system.uuid;
	}

	sku() {
		return this._system.sku;
	}
}

class baseboard {
	constructor(cerus) {
		return cerus.promise(function(event) {
			si.baseboard(function(data) {
				this._baseboard = data;
				event("done", this);
			}.bind(this));
		}.bind(this));
	}

	manufacturer() {
		return this._baseboard.manufacturer;
	}

	model() {
		return this._baseboard.model;
	}

	version() {
		return this._baseboard.version;
	}

	serial() {
		return this._baseboard.serial;
	}

	tag() {
		return this._baseboard.assetTag;
	}
}

class battery {
	constructor(cerus) {
		return cerus.promise(function(event) {
			si.battery(function(data) {
				this._battery = data;
				event("done", this);
			}.bind(this));
		}.bind(this));
	}

	has() {
		return this._battery.hasbattery;
	}

	cyclecount() {
		return this._battery.cyclecount;
	}

	charging() {
		return this._battery.ischarging;
	}

	capacity() {
		return this._battery.maxcapacity;
	}

	percent() {
		return this._battery.percent;
	}

	current() {
		return this._battery.currentcapacity;
	}
}

class user {
	username() {
		return os_.userInfo().username;
	}

	uid() {
		return os_.userInfo().uid;
	}

	gid() {
		return os_.userInfo().gid;
	}

	shell() {
		return os_.userInfo().shell;
	}
}

class ids {
	egid() {
		return process.getegid();
	}

	euid() {
		return process.geteuid();
	}

	gid() {
		return process.getgid();
	}

	uid() {
		return process.getuid();
	}

	pid() {
		return process.pid;
	}

	ppid() {
		return process.ppid;
	}
}


module.exports = info;