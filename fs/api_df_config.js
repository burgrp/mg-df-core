load("api_file.js");

let Config = {

	save: function (key, value) {
		File.write(JSON.stringify(value), "Config-" + key + ".json");
	},

	get: function (key, defaultValue) {
		let strVal = File.read("Config-" + key + ".json");
		if (strVal === null) {
			return defaultValue;
		} else {
			print(strVal);
			return JSON.parse(strVal);
		}
	}
};
