/* global GPIO */

load("api_gpio.js");

let RegisterGPO = {
	create: function (pin) {

		GPIO.set_mode(pin, GPIO.MODE_OUTPUT);

		return {
			pin: pin,

			set: function (state) {
				GPIO.write(this.pin, state ? 1 : 0);
			},

			get: function () {
				let value = GPIO.read(this.pin) === 1;
				this.observer.callback(value);
			}
		};
	}
};
