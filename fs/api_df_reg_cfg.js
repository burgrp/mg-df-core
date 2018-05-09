let RegisterConfig = {
    create: function (key, setCtor) {
        let register = {

            key: key,
            setCtor: setCtor,

            set: function set(value) {
                let actual = Cfg.get(this.key);
                if (actual !== value) {
                    Cfg.set(this.setCtor(value));
                }
            },

            get: function () {
                this.value = Cfg.get(this.key);
                if (this.observer) {
                    this.observer.callback(this.value);
                }
            }
        };

        register.get();

        return register;
    }

};