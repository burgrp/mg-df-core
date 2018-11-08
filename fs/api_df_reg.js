/* global Cfg, MQTT */

load('api_mqtt.js');

let Register = {
	add: function (name, register) {

		let observer = {
			name: name,
			callback: function (value) {
				MQTT.pub("register/" + this.name + "/is", JSON.stringify(value));
			}
		};

		register.observer = observer;

		MQTT.sub("register/" + name + "/get", function (conn, topic, msg, ctx) {
			ctx.register.get();
		}, {
				register: register
			});

		MQTT.sub("register/" + name + "/set", function (conn, topic, msg, ctx) {

			let value = JSON.parse(msg);
			print(ctx.name, "=>", value);
			if (ctx.register.set) {
				ctx.register.set(value);
			}
			ctx.register.get();

		}, {
				name: name,
				register: register
			});

		return register;
	}
};
