# then
promise polyfill


``` javascript
var A = new then(function(resolve,reject){
	resolve('A OK!');
});


var B = new then(function(resolve,reject){
	resolve('B OK!');
});

A.then(function(result){
	console.log('A result:' + result);
	return 'A then result'
},function(value){
	console.log(value);
	return 'A then error'
})
.then(function(result){
	console.log('A then result：'+result);
	return 'A then _result'
})
.then(B)
.then(function(result){
	console.log('B result：' + result)
});
```