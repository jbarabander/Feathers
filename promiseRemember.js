'use strict'

var P = require('bluebird');

var valueAccum = (value, array) => {
	array.push(value);
	return array;
}

//alternative definition - better definition: 
var remember = function() {
	var arr = [];
	var accumFunc;
	var args = Array.prototype.slice.call(arguments);
	var lastArg = args[args.length - 1];
	var lastArgType = typeof args[args.length - 1];
	if(Array.isArray(lastArg)) {
		accumFunc = P.resolve(args[0](...lastArg));
		args.splice(args.length - 1, 1);
	}
	else if(lastArgType === 'function') accumFunc = P.resolve(args[0]());
	else throw new TypeError(`Expected a function or array.  got - ${lastArgType}`);

	accumFunc = accumFunc.then(value => valueAccum(value, arr));
	for(let i = 1; i < args.length; i++) {
		accumFunc = accumFunc.then(args[i]).then(value => valueAccum(value, arr));
	}
	return accumFunc.then(args[args.length]);
}

// remember(
// 	function(element) {
// 	return element + 1;
// }, function(element) {
// 	return element[0] + 1;
// }, function(element) {
// 	console.log(element[1]);
// }, [4]);

var chain = function() {

}//finish later  more general version of remember for anything like that.


var mapObj = function() {

}
