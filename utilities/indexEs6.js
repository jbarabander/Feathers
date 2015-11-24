'use strict'

var valueAccum = (value, array) => {
    array.push(value);
    return array;
};

var splitObj = (obj) => {
    var keys = Object.keys(obj);
    var values = keys.map(function (key) {
        return obj[key];
    });
    return {keys: keys, values: values};
}

var mergeObj = function (obj) {
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
}

//recursive version
var flattenArrRec = function (arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) newArr = newArr.concat(flattenArr(arr[i]));
        else newArr.push(arr[i]);
    }
    return newArr;
}

//iterative version
var flattenArrIter = function (arr) {
    var newArr = arr.slice();
    for (var i = 0; i < newArr.length; i++) {
        while (Array.isArray(newArr[i])) {
            newArr.splice(i, 1, ...newArr[i]);
        }
    }
    return newArr;
}


module.exports = {
    valueAccum: valueAccum,
    splitObj: splitObj,
    mergeObj: mergeObj,
    flattenArr: flattenArrIter
}
