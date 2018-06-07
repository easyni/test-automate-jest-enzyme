import { getAPropsValue } from './propsHelper';

export const getDefaultExportName = (ast) => {
  if(!(ast.program &&
  ast.program &&
  ast.program.body && Array.isArray(ast.program.body))) {
    return null
  }
  const exportExpression = [];
  ast.program.body.forEach((expressionType) => {
    const defaultExport = (expressionType.type &&
    expressionType.type === 'ExpressionStatement' &&
    expressionType.expression &&
    expressionType.expression.type && expressionType.expression.type === 'AssignmentExpression' &&
    expressionType.expression.left && expressionType.expression.left.object &&
    expressionType.expression.left.object.name && expressionType.expression.left.object.name === 'exports' &&
    expressionType.expression.left.property && expressionType.expression.left.property.name &&
    expressionType.expression.left.property.name === 'default' && (
        (
          expressionType.expression.right && expressionType.expression.right.arguments &&
          expressionType.expression.right.arguments && Array.isArray(expressionType.expression.right.arguments) &&
          expressionType.expression.right.arguments[expressionType.expression.right.arguments.length - 1].name
        ) ||
        expressionType.expression.right && expressionType.expression.right.name
      )
    ) || null;
    if( defaultExport ) {
      exportExpression.push(defaultExport);
    }
  });
  return exportExpression[0] || null
};

export const cleanAstProps = (props) => {
  const CleanedProps = [];
  props.forEach((prop) => {
    const type = prop.value && prop.value.property && prop.value.property.name && (
      (prop.value.property.name === 'isRequired' && prop.value.object && prop.value.object.property && prop.value.object.property.name) ||
      (prop.value.property.name)
    ) || null;
    const myProps = {
      key: (prop.key && prop.key.name) || null,
      type,
      isRequired: (prop.value && prop.value.property && prop.value.property.name === 'isRequired') || false,
      value: getAPropsValue(type)
    };
  CleanedProps.push(myProps);
  });

  return CleanedProps;
};

export const getAllProps = (ast, ComponentName) => {
  if(!ComponentName) {
    return null
  }
  let props = null;
  ast.program.body.forEach((expressionType) => {
    const defaultExport = (expressionType.type &&
      expressionType.type === 'ExpressionStatement' &&
      expressionType.expression &&
      expressionType.expression.type && expressionType.expression.type === 'AssignmentExpression' &&
      expressionType.expression.left && expressionType.expression.left.object &&
      expressionType.expression.left.object.name && expressionType.expression.left.object.name === ComponentName &&
      expressionType.expression.left.property && expressionType.expression.left.property.name &&
      expressionType.expression.left.property.name === 'propTypes' &&
      expressionType.expression.right &&
      Array.isArray(expressionType.expression.right.properties) && expressionType.expression.right.properties)
      || null;
    if( defaultExport ) {
      props = cleanAstProps(defaultExport);
    }
  });
  return props || null
};

export const getRequiredProps = (props) => {
  return props.filter((prop) => prop.isRequired)
};
