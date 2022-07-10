import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import stylish from './stylish.js';
import genDiffTree from './genDiffTree.js';

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const file1 = readFileSync(path.resolve(filepath1));
  const file2 = readFileSync(path.resolve(filepath2));
  const oldObject = parse(file1, path.extname(filepath1));
  const newObject = parse(file2, path.extname(filepath2));

  const unformattedTree = genDiffTree(oldObject, newObject);

  let formattedTree;
  if (formatter === 'stylish') {
    formattedTree = stylish(unformattedTree);
  }

  return formattedTree;
};

export default genDiff;
