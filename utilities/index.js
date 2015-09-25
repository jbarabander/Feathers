'use strict'

var valueAccum = (value, array) => {
	array.push(value);
	return array;
};

var splitObj = (obj) => {
	var keys = Object.keys(obj);
	var values = keys.map(function(key) {
		return obj[key];
	});
	return {keys: keys, values: values};
}

var mergeObj = function(obj) {
	var keys; var values;
	if(arguments.length === 1) {
		keys = obj.keys;
		values = obj.values;
	} else {
		keys = arguments[0];
		values = arguments[1];
	}
	return keys.reduce(function(previous, current, index) {
		previous[current] = values[index];
		return previous;
	}, {});
}
//other version

module.exports = {
	valueAccum: valueAccum,
	splitObj: splitObj,
	mergeObj: mergeObj
}
