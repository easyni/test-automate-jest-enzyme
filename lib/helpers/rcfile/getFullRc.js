'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fullRc = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require('fs');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var rc = process.env.NODE_ENV === 'development' ? '.devtestautomaterc' : '.testautomaterc';
var testautomatercBase = JSON.parse((0, _fs.readFileSync)(__dirname + '/../../../' + rc, 'utf8'));
var testautomaterc = (0, _fs.existsSync)('./.testautomaterc') && JSON.parse((0, _fs.readFileSync)('./.testautomaterc', 'utf8')) || null;

testautomatercBase.tests = testautomatercBase.tests.map(function (test) {
  return _extends({}, test, {
    processFile: __dirname + '/../../../' + test.processFile
  });
});

var fullRc = exports.fullRc = testautomaterc ? _extends({}, testautomatercBase, testautomaterc, {
  tests: [].concat(_toConsumableArray(testautomatercBase.tests), _toConsumableArray(testautomaterc.tests))
}) : _extends({}, testautomatercBase);