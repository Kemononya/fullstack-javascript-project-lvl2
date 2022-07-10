import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import formatter from './formatter.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = readFileSync(path.resolve(filepath1));
  const file2 = readFileSync(path.resolve(filepath2));
  const oldObject = parse(file1, path.extname(filepath1));
  const newObject = parse(file2, path.extname(filepath2));

  const iter = (oldSubObject, newSubObject) => {
    const keys = _.union(Object.keys(oldSubObject), Object.keys(newSubObject));
    const sortedKeys = _.sortBy(keys, ((key) => key));
    const diff = sortedKeys.map((key) => {
      if (!Object.hasOwn(newSubObject, key)) {
        return ['-', key, oldSubObject[key]];
      }
      if (!Object.hasOwn(oldSubObject, key)) {
        return ['+', key, newSubObject[key]];
      }
      if ((_.isObject(oldSubObject[key]) && !_.isObject(newSubObject[key]))
      || (!_.isObject(oldSubObject[key]) && _.isObject(newSubObject[key]))) {
        return [['-', key, oldSubObject[key]], ['+', key, newSubObject[key]]];
      }
      if (_.isObject(oldSubObject[key]) && _.isObject(newSubObject[key])) {
        return [' ', key, iter(oldSubObject[key], newSubObject[key])];
      }
      if (oldSubObject[key] === newSubObject[key]) {
        return [' ', key, oldSubObject[key]];
      }
      return [['-', key, oldSubObject[key]], ['+', key, newSubObject[key]]];
    });

    return diff;
  };

  const unformattedTree = (iter(oldObject, newObject));
  return formatter(unformattedTree);
};

export default genDiff;
