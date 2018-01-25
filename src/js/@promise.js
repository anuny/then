function promise(fn) {
	var states = ['pending','fulfilled','rejected'],
		state = states[0],
        value = null,
        deferreds = [];

    this.then = function (onFulfilled, onRejected) {
        return new promise(function (resolve, reject) {
            handle({onFulfilled: onFulfilled || null,onRejected: onRejected || null,resolve: resolve,reject: reject});
        });
    };

    function handle(deferred) {
        if (state === states[0]) {
            deferreds.push(deferred);
            return;
        }
		var isFulfilled = state === states[1];

        var callback = isFulfilled ? deferred.onFulfilled : deferred.onRejected,ret;
		
        if (callback === null) {
            callback = isFulfilled ? deferred.resolve : deferred.reject;
            callback(value);
            return;
        }
        ret = callback(value);
        deferred.resolve(ret);
    }

    function resolve(newValue) {
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (typeof then === 'function') {
                return then.call(newValue, resolve, reject);
            }
        }
        state = states[1];
        value = newValue;
        finale();
    }

    function reject(reason) {
        state = states[2];
        value = reason;
        finale();
    }

    function finale() {
        setTimeout(function () {
			for(var i = 0,leng=deferreds.length;i<leng;i++)handle(deferreds[i]);
        }, 0);
    }

    fn(resolve, reject);
}
return promise;