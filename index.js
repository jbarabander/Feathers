'use strict'

var P = require('bluebird');
var utils = require('./utilities');
var event = require('event');

P.remember = function() {
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

	accumFunc = accumFunc.then(value => utils.valueAccum(value, arr));
	for(let i = 1; i < args.length; i++) {
		accumFunc = accumFunc.then(args[i]).then(value => utils.valueAccum(value, arr));
	}
	return accumFunc.then(args[args.length]);
}

P.chain = function() {
	var args = Array.prototype.slice.call(arguments);
	var lastArg = args[args.length - 1];

	//takes the following arguments: promise functions and an options argument at the end for specifying things like:
	//after - which will chain to the end of every promise via .then and run a specified action.
	//example: {after: function(element,arr) {
		// arr.push(element)
		//return arr;
	//}} //element must always come first
}//finish later  more general version of remember for anything like that.
//simplifying promise factories
P.objAll = function(obj) {
	var newObj = utils.splitObj(obj);
	return P.all(newObj.values)
	.then(function(arrOfResolves) {
		return utils.mergeObj(newObj.keys, arrOfResolves);
	}, function(err) {
		return err;
	})
};

// P.order = function() {
	
// };

// P.curry = function() {

// }

P.mapObj = function(obj, cb) {
	var newObj = utils.splitObj(obj);
	return Promise.map(newObj.values, cb)
	.then(function(arr) {
		return utils.mergeObj(newObj.keys, arr);
	})
}


P.syncAll = function(arr) {
	var internalArr = [];
	chainedPromise = P.resolve(arr[0]);
	for(var i = 1; i < arr.length; i++) {
		chainedPromise.then(element => {internalArr.push(element)}).then(() => {return P.resolve(arr[i])})
	}
	return (
		chainedPromise
		.then(element => {
			internalArr.push(element);
			return internalArr;
		})
	)
	
}


// P.latch = function()


// P.sync = function(obj, cb) {

// }
//synchronous promises essentially
