export const getAPropsValue = (type) => {
  switch(type) {
    case 'func':
      return '() => null';
    case 'bool':
      return 'true';
    case 'string':
      return '\'\'';
    case 'array':
      return '[]';
    case 'number':
      return '1';
    case 'object':
      return '{}';
    case 'element':
      return '<div></div>';
    default:
      return '{}';
  }
};
