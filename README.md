# then
promise polyfill


``` javascript
var A = new then(function(resolve,reject){
	resolve('A OK!');
	reject('A ERROR!');
});


var B = function(result){
	console.log(result); //A then result2
	return new then(function(resolve,reject){
		resolve('B OK!');
	}).then(function(result){
		console.log(result); // B ERROR!
		return 'then result'
	})
}

A.then(function(result){
	console.log(result); // A OK!
	return 'A then result'
},function(value){
	console.log(value); // A ERROR!
	return 'A then error'
})
.then(function(result){
	console.log(result); // A then result
	return 'A then result2'
})
.then(B)
.then(function(result){
	console.log(result) // B OK!
});
```