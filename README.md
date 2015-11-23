# Feathers
A toolbelt of additional promise functions with a focus on array and object methods. Currently bluebird only.

##Example
```javascript
var Promise = require('bluebird');
require('bluebird-feathers')(Promise);
Promise.remember(function() {
  return 'Remembering';
}, function() {
  return ' returned promise values';
}, function() {
  return ' can be pretty useful!';
}, function(arr) {
  console.log(arr.join(''));
}
//outputs 'Remembering returned promise values can be pretty useful!'
```
##Installation
```shell
npm install bluebird_feathers
```
