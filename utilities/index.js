'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var valueAccum = function valueAccum(value, array) {
    array.push(value);
    return array;
};

var splitObj = function splitObj(obj) {
    var keys = Object.keys(obj);
    var values = keys.map(function (key) {
        return obj[key];
    });
    return { keys: keys, values: values };
};

var mergeObj = function mergeObj(obj) {
    var keys;
    var values;
    if (arguments.length === 1) {
        keys = obj.keys;
        values = obj.values;
    } else {
        keys = arguments[0];
        values = arguments[1];
    }
    return keys.reduce(function (previous, current, index) {
        previous[current] = values[index];
        return previous;
    }, {});
};

//recursive version
var flattenArrRec = function flattenArrRec(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) newArr = newArr.concat(flattenArr(arr[i]));else newArr.push(arr[i]);
    }
    return newArr;
};

//iterative version
var flattenArrIter = function flattenArrIter(arr) {
    var newArr = arr.slice();
    for (var i = 0; i < newArr.length; i++) {
        while (Array.isArray(newArr[i])) {
            newArr.splice.apply(newArr, [i, 1].concat(_toConsumableArray(newArr[i])));
        }
    }
    return newArr;
};

module.exports = {
    valueAccum: valueAccum,
    splitObj: splitObj,
    mergeObj: mergeObj,
    flattenArr: flattenArrIter
};

