import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = readFileSync(path.resolve(filepath1));
  const file1Ext = path.extname(filepath1);
  const file2 = readFileSync(path.resolve(filepath2));
  const file2Ext = path.extname(filepath2);
  const oldObject = parse(file1, file1Ext);
  const newObject = parse(file2, file2Ext);

  const partialDiff1 = Object.keys(oldObject).map((key) => {
    if (!Object.hasOwn(newObject, key)) {
      return [key, 'old'];
    }
    return (oldObject[key] === newObject[key]) ? [key, 'both'] : [key, 'dif'];
  });

  const partialDiff2 = Object.keys(newObject)
    .filter((key) => (!Object.hasOwn(oldObject, key)))
    .map((key) => [key, 'new']);

  const sortedDiff = _.sortBy([...partialDiff1, ...partialDiff2], (([key]) => key));

  const result = sortedDiff.map(([key, value]) => {
    switch (value) {
      case 'old':
        return `  - ${key}: ${oldObject[key]}`;
      case 'new':
        return `  + ${key}: ${newObject[key]}`;
      case 'dif':
        return `  - ${key}: ${oldObject[key]}\n  + ${key}: ${newObject[key]}`;
      default:
        return `    ${key}: ${oldObject[key]}`;
    }
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
