!function (win, factory) {
	win.then = win.Promise || factory();
}(window, function () {
	//=import @promise.js
});