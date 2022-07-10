import _ from 'lodash';

const genKeys = (oldObject, newObject) => {
  const keys = _.union(Object.keys(oldObject), Object.keys(newObject));
  const sortedKeys = _.sortBy(keys, ((key) => key));
  return sortedKeys;
};

const genDiffTree = (oldObject, newObject) => {
  const keys = genKeys(oldObject, newObject);
  const diff = keys.map((key) => {
    if (!Object.hasOwn(newObject, key)) {
      return ['-', key, oldObject[key]];
    } if (!Object.hasOwn(oldObject, key)) {
      return ['+', key, newObject[key]];
    } if ((_.isObject(oldObject[key]) && !_.isObject(newObject[key]))
    || (!_.isObject(oldObject[key]) && _.isObject(newObject[key]))) {
      return [['-', key, oldObject[key]], ['+', key, newObject[key]]];
    } if (_.isObject(oldObject[key]) && _.isObject(newObject[key])) {
      return [' ', key, genDiffTree(oldObject[key], newObject[key])];
    } if (oldObject[key] === newObject[key]) {
      return [' ', key, oldObject[key]];
    }
    return [['-', key, oldObject[key]], ['+', key, newObject[key]]];
  });

  return diff;
};

export default genDiffTree;
