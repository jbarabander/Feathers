# Feathers
A toolbelt of additional promise functions with a focus on array and object methods. Currently bluebird only.

##Example
```javascript
var Promise = require('bluebird');
require('bluebird_feathers')(Promise);
Promise.remember(function() {
  return Promise.resolve('Remembering');
}, function() {
  return Promise.resolve(' returned promise values');
}, function() {
  return Promise.resolve(' can be pretty useful!');
}, function(arr) {
  console.log(arr.join(''));
})
//outputs 'Remembering returned promise values can be pretty useful!'
```
##Installation
```shell
npm install bluebird_feathers
```
