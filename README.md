# then
promise polyfill

`
npm i -g fute
`

`
fute
`

``` javascript
var A = new then(function(resolve,reject){
	setTimeout(function(){
		resolve('A OK!');
	},1000)	
	//reject('A ERROR!');
});
var B = function(result){
	console.log(result); //A then result2
	return new then(function(resolve,reject){
		setTimeout(function(){
			resolve('B OK!');
		},1000)
		
	}).then(function(result){
		console.log(result); // B OK!
		return 'B then result'
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
	console.log(result) // B then result!
});
```