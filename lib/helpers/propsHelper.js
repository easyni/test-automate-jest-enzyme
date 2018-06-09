'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getAPropsValue = exports.getAPropsValue = function getAPropsValue(type) {
  switch (type) {
    case 'func':
      return '() => null';
    case 'bool':
      return 'true';
    case 'string':
      return '\'a string\'';
    case 'array':
      return '[1, 2, 3]';
    case 'number':
      return '1';
    case 'object':
      return '{ test: \'a string\' }';
    case 'element':
      return '<div></div>';
    default:
      return 'null';
  }
};

var isPropsTakeInCharge = exports.isPropsTakeInCharge = function isPropsTakeInCharge(type) {
  return type === 'func' || type === 'bool' || type === 'string' || type === 'array' || type === 'number' || type === 'object' || type === 'element';
};

var isTheLastProps = exports.isTheLastProps = function isTheLastProps(key, props) {
  return props[props.length - 1].key && props[props.length - 1].key === key;
};