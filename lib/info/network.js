class network {
	constructor(data) {
		this._network = data;
		this._received = new received(data);
		this._transferred = new transferred(data);
	}

	address() {
		return this._network.address;
	}

	mask() {
		return this._network.netmask;
	}

	family() {
		return this._network.family;
	}

	mac() {
		return this._network.mac;
	}

	internal() {
		return this._network.internal;
	}

	cidr() {
		return this._network.cidr;
	}

	name() {
		return this._network.iface;
	}

	face() {
		return this.name();
	}

	ipv4() {
		return this._network.ip4;
	}

	ipv6() {
		return this._network.ip6;
	}

	state() {
		return this._network.operstate;
	}

	reveived() {
		return this._received;
	}

	transferred() {
		return this._transferred;
	}
}

module.exports = network;

class received {
	constructor(data) {
		this._network = data;
	}

	overall() {
		return this._network.rx;
	}

	persec() {
		return this._network.rx_sec;
	}
}

class transferred {
	constructor(data) {
		this._network = data;
	}

	overall() {
		return this._network.tx;
	}

	persec() {
		return this._network.tx_sec;
	}
}