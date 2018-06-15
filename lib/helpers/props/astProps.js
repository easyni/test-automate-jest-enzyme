'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRequiredProps = exports.getAllProps = exports.cleanAstProps = exports.formatProp = undefined;

var _propsHelper = require('./propsHelper');

var formatProp = exports.formatProp = function formatProp(prop) {
  var type = prop.value && prop.value.property && prop.value.property.name && (prop.value.property.name === 'isRequired' && prop.value.object && prop.value.object.property && prop.value.object.property.name || prop.value.property.name) || null;

  return {
    key: prop.key && prop.key.name || null,
    type: type,
    isRequired: prop.value && prop.value.property && prop.value.property.name === 'isRequired' || false,
    value: (0, _propsHelper.getAPropsValue)(type)
  };
};

var cleanAstProps = exports.cleanAstProps = function cleanAstProps(props) {
  var CleanedProps = [];
  props.forEach(function (prop) {
    var myProps = formatProp(prop);
    CleanedProps.push(myProps);
  });

  return CleanedProps;
};

var getAllProps = exports.getAllProps = function getAllProps(ast, ComponentName) {
  if (!ComponentName) {
    return null;
  }
  var props = null;
  ast.program.body.forEach(function (expressionType) {
    var defaultExport = expressionType.type && expressionType.type === 'ExpressionStatement' && expressionType.expression && expressionType.expression.type && expressionType.expression.type === 'AssignmentExpression' && expressionType.expression.left && expressionType.expression.left.object && expressionType.expression.left.object.name && expressionType.expression.left.object.name === ComponentName && expressionType.expression.left.property && expressionType.expression.left.property.name && expressionType.expression.left.property.name === 'propTypes' && expressionType.expression.right && Array.isArray(expressionType.expression.right.properties) && expressionType.expression.right.properties || null;
    if (defaultExport) {
      props = cleanAstProps(defaultExport);
    }
  });
  return props || null;
};

var getRequiredProps = exports.getRequiredProps = function getRequiredProps(props) {
  return props.filter(function (prop) {
    return prop.isRequired;
  });
};