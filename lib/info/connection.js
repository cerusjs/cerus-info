class connection {
	constructor(data) {
		this._connection = data;
		this._local = new local(data);
		this._peer = new peer(data);
		this._states = new states();
	}

	protocol() {
		return this._connection.protocol;
	}

	state() {
		return this._connection.state;
	}

	local() {
		return this._local;
	}

	peer() {
		return this._peer;
	}

	states() {
		return this._states;
	}
}

module.exports = connection;

class local {
	constructor(data) {
		this._connection = data;
	}

	address() {
		return this._connection.localaddress;
	}

	port() {
		return this._connection.localport;
	}
}

class peer {
	constructor(data) {
		this._connection = data;
	}

	address() {
		return this._connection.peeraddress;
	}

	port() {
		return this._connection.peerport;
	}
}

class states {
	established() {
		return "ESTABLISHED";
	}

	listen() {
		return "LISTEN";
	}

	timewait() {
		return "TIME_WAIT";
	}

	closewait() {
		return "CLOSE_WAIT";
	}

	closed() {
		return "CLOSED";
	}
}
