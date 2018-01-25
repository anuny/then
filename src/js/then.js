!function (win, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        win.then = factory();
    }
}(window, function () {
	//=import @core.js
});