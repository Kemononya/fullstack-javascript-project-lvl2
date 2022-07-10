import _ from 'lodash';

const removed = (property) => `Property '${property}' was removed`;
const added = (property, value) => `Property '${property}' was added with value: ${value}`;
const updated = (property, oldValue, newValue) => {
  const result = `Property '${property}' was updated. From ${oldValue} to ${newValue}`;
  return result;
};

const switchValue = (value) => {
  const result = _.isObject(value) ? '[complex value]' : value;
  if (_.isString(result) && result !== '[complex value]') {
    return `'${result}'`;
  }
  return result;
};

const arrayConverter = (firstArr, secondArr, property) => {
  const [, correctKey, oldValue] = firstArr;
  const [, , newValue] = secondArr;
  const prop = `${property}${correctKey}`;
  const oldVal = switchValue(oldValue);
  const newVal = switchValue(newValue);
  return updated(prop, oldVal, newVal);
};

const plain = (unformattedTree) => {
  const iter = (currentValue, property = '') => {
    const lines = currentValue.flatMap(([first, key, value]) => {
      const prop = (property === '') ? '' : `${property}.`;
      if (_.isArray(first)) {
        return arrayConverter(first, key, prop);
      }

      const val = switchValue(value);
      if (first === '+') {
        return added(`${prop}${key}`, val);
      } if (first === '-') {
        return removed(`${prop}${key}`);
      } if (!_.isObject(value)) {
        return '';
      }
      return iter(value, `${prop}${key}`);
    });

    return lines;
  };

  const resultArray = iter(unformattedTree);
  const result = resultArray
    .filter((item) => item !== '')
    .join('\n');

  return result;
};

export default plain;
