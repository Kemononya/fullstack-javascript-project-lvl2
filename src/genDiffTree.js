import _ from 'lodash';

const genDiffTree = (oldObject, newObject) => {
  const oldKeys = Object.keys(oldObject);
  const newKeys = Object.keys(newObject);
  const keys = _.union(oldKeys, newKeys);
  const sortedKeys = _.sortBy(keys, ((key) => key));
  const diff = sortedKeys.map((key) => {
    let result;
    if (!Object.hasOwn(newObject, key)) {
      result = ['-', key, oldObject[key]];
    } else if (!Object.hasOwn(oldObject, key)) {
      result = ['+', key, newObject[key]];
    } else if ((_.isObject(oldObject[key]) && !_.isObject(newObject[key]))
    || (!_.isObject(oldObject[key]) && _.isObject(newObject[key]))) {
      result = [['-', key, oldObject[key]], ['+', key, newObject[key]]];
    } else if (_.isObject(oldObject[key]) && _.isObject(newObject[key])) {
      result = [' ', key, genDiffTree(oldObject[key], newObject[key])];
    } else if (oldObject[key] === newObject[key]) {
      result = [' ', key, oldObject[key]];
    } else result = [['-', key, oldObject[key]], ['+', key, newObject[key]]];

    return result;
  });

  return diff;
};

export default genDiffTree;
