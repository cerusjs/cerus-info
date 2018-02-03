module.exports = function() {
	var plugin = {};
	var package = require("./package.json");
	var info;

	plugin.name = package["name"];
	plugin.version = package["version"];
	plugin.dependencies = [
		"cerus-promise"
	];

	plugin.init_ = function(cerus) {
		info = require("./lib/info")(cerus);
	}

	plugin.info = function() {
		return info;
	}

	return sepluginlf;
}