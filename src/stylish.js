import _ from 'lodash';

const genTreeForObject = (object, depth) => {
  if (!_.isObject(object)) {
    return `${object}`;
  }

  const indentSize = depth * 2;
  const currentIndent = ' '.repeat(indentSize + 2);
  const bracketIndent = ' '.repeat(indentSize - 2);
  const lines = Object
    .entries(object)
    .map(([key, val]) => `${currentIndent}${key}: ${genTreeForObject(val, depth + 2)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (unformattedTree) => {
  const iter = (currentValue, depth) => {
    if (!_.isArray(currentValue) && !_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * 2;
    const currentIndent = ' '.repeat(indentSize);
    const bracketIndent = ' '.repeat(indentSize - 2);

    if (!_.isArray(currentValue)) {
      return genTreeForObject(currentValue, depth);
    }

    const lines = currentValue.map(([first, key, value]) => {
      let line;
      if (_.isArray(first)) {
        const [firstSym, firstKey, firstValue] = first;
        const [secondSym, secondKey, secondValue] = key;
        const line1 = `${currentIndent}${firstSym} ${firstKey}: ${iter(firstValue, depth + 2)}`;
        const line2 = `${currentIndent}${secondSym} ${secondKey}: ${iter(secondValue, depth + 2)}`;
        line = `${line1}\n${line2}`;
      } else {
        line = `${currentIndent}${first} ${key}: ${iter(value, depth + 2)}`;
      }
      return line;
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(unformattedTree, 1);
};

export default stylish;
