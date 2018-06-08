'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRequiredProps = exports.getAllProps = exports.cleanAstProps = exports.getDefaultExportName = undefined;

var _propsHelper = require('./propsHelper');

var getDefaultExportName = exports.getDefaultExportName = function getDefaultExportName(ast) {
  if (!(ast.program && ast.program && ast.program.body && Array.isArray(ast.program.body))) {
    return null;
  }
  var exportExpression = [];
  ast.program.body.forEach(function (expressionType) {
    var defaultExport = expressionType.type && expressionType.type === 'ExpressionStatement' && expressionType.expression && expressionType.expression.type && expressionType.expression.type === 'AssignmentExpression' && expressionType.expression.left && expressionType.expression.left.object && expressionType.expression.left.object.name && expressionType.expression.left.object.name === 'exports' && expressionType.expression.left.property && expressionType.expression.left.property.name && expressionType.expression.left.property.name === 'default' && (expressionType.expression.right && expressionType.expression.right.arguments && expressionType.expression.right.arguments && Array.isArray(expressionType.expression.right.arguments) && expressionType.expression.right.arguments[expressionType.expression.right.arguments.length - 1].name || expressionType.expression.right && expressionType.expression.right.name) || null;
    if (defaultExport) {
      exportExpression.push(defaultExport);
    }
  });
  return exportExpression[0] || null;
};

var cleanAstProps = exports.cleanAstProps = function cleanAstProps(props) {
  var CleanedProps = [];
  props.forEach(function (prop) {
    var type = prop.value && prop.value.property && prop.value.property.name && (prop.value.property.name === 'isRequired' && prop.value.object && prop.value.object.property && prop.value.object.property.name || prop.value.property.name) || null;
    var myProps = {
      key: prop.key && prop.key.name || null,
      type: type,
      isRequired: prop.value && prop.value.property && prop.value.property.name === 'isRequired' || false,
      value: (0, _propsHelper.getAPropsValue)(type)
    };
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