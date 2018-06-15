'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isTestAvailable = exports.isTestAvailable = function isTestAvailable(answer) {
  return answer === 'component-dev' || answer === 'component' || null;
};