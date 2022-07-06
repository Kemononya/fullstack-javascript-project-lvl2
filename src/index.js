import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

const genDiff = (filepath1, filepath2) => {
  const oldObject = JSON.parse(readFileSync(path.resolve(filepath1)));
  const newObject = JSON.parse(readFileSync(path.resolve(filepath2)));

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
