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
	console.log('A的结果:' + result);
	return 'A then方法第一次返回'
},function(value){
	console.log(value);
	return 'A then方法第一次错误的返回'
})
.then(function(result){
	console.log('A第一次then方法的返回：'+result);
	return 'A then方法第二次返回'
})
.then(B)
.then(function(result){
	console.log('B的结果：' + result)
});
```