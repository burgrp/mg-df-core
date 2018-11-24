/* global Cfg, MQTT */

load('api_mqtt.js');
load("api_timer.js");
load('api_config.js');

let Register = {

	all: {},

	add: function (name, register, meta) {

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

		register.meta = meta || {};		
		register.meta.device = Cfg.get("device.id");

		this.all[name] = register;

		return register;
	},

	advertise: function() {
		for (let name in this.all) {
			let register = this.all[name];
			MQTT.pub("register/" + name + "/advertise", JSON.stringify(register.meta));
		}
	}
};

Timer.set(10000, Timer.REPEAT, function() {
	Register.advertise();
}, null);


MQTT.sub("register/advertise!", function (conn, topic, msg, ctx) {
	Register.advertise();
}, null);
