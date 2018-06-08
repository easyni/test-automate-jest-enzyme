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
      return '{ test: \'a string\'}';
    case 'element':
      return '<div></div>';
    default:
      return 'null // toDo you need to mock it';
  }
};
var isPropsTakeIncharge = exports.isPropsTakeIncharge = function isPropsTakeIncharge(type) {
  return type === 'func' || type === 'bool' || type === 'string' || type === 'array' || type === 'number' || type === 'object' || type === 'element';
};