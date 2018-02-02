/* global Cfg, MQTT */

load('api_mqtt.js');
load("api_config.js");

let Register = {
	add: function (name, register) {

		let mqttId = Cfg.get("mqtt.client_id") || Cfg.get("device.id");

		let observer = {
			name: name,
			mqttId: mqttId,
			callback: function (value) {
				MQTT.pub(this.mqttId + "/register/" + this.name + "/is", JSON.stringify(value));
			}
		};

		register.observer = observer;

		MQTT.sub(mqttId + "/register/" + name + "/#", function (conn, topic, msg, ctx) {

			let lastThree = topic.slice(topic.length - 3, topic.length);

			if (lastThree === "set") {
				let value = JSON.parse(msg);
				print(ctx.name, "=>", value);
				if (ctx.register.set) {
					ctx.register.set(value);
				}
				ctx.register.get();
			}

			if (lastThree === "get") {
				ctx.register.get();
			}

		}, {
			name: name,
			register: register
		});
	}
};
