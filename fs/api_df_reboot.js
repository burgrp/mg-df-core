load("api_sys.js");
load("api_timer.js");

let Reboot = {
	after: function (mins) {
		print("Will reboot after", mins, "minutes");
		Timer.set(1000 * 60 * mins, Timer.REPEAT, function () {
			print("It's time to reboot...");
			Sys.reboot(0);
		}, null);
	}
};
