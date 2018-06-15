'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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