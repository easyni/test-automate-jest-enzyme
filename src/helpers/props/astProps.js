import { inspect } from 'util';
import { getAPropsValue } from './propsHelper';

export const formatProp = (prop) => {
  const type = (prop.value && prop.value.property && prop.value.property.name && (
    (prop.value.property.name === 'isRequired' && prop.value.object && prop.value.object.property && prop.value.object.property.name) ||
    (prop.value.property.name)
  )) || null;

  return {
    key: (prop.key && prop.key.name) || null,
    type,
    isRequired: (prop.value && prop.value.property && prop.value.property.name === 'isRequired') || false,
    value: getAPropsValue(type),
  };
};

export const cleanAstProps = (props) => {
  const CleanedProps = [];
  props.forEach((prop) => {
    const myProps = formatProp(prop);
    CleanedProps.push(myProps);
  });

  return CleanedProps;
};

export const getAllProps = (ast, ComponentName) => {
  if (!ComponentName) {
    return null;
  }
  let props = null;
  ast.program.body.forEach((expressionType) => {
    const defaultExport = (expressionType.type &&
      expressionType.type === 'ExpressionStatement' &&
      expressionType.expression &&
      expressionType.expression.type && expressionType.expression.type === 'AssignmentExpression' &&
      expressionType.expression.left && expressionType.expression.left.object &&
      expressionType.expression.left.object.name &&
      expressionType.expression.left.object.name === ComponentName &&
      expressionType.expression.left.property && expressionType.expression.left.property.name &&
      expressionType.expression.left.property.name === 'propTypes' &&
      expressionType.expression.right &&
      Array.isArray(expressionType.expression.right.properties) &&
      expressionType.expression.right.properties)
      || null;
    if (defaultExport) {
      props = cleanAstProps(defaultExport);
    }
  });
  return props || null;
};

export const getRequiredProps = props => props.filter(prop => prop.isRequired);
