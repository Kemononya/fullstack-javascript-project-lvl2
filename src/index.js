import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import genDiffTree from './genDiffTree.js';
import switchFormatters from '../formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = readFileSync(path.resolve(filepath1));
  const file2 = readFileSync(path.resolve(filepath2));
  const oldObject = parse(file1, path.extname(filepath1));
  const newObject = parse(file2, path.extname(filepath2));

  const unformattedTree = genDiffTree(oldObject, newObject);
  const formatter = switchFormatters(formatName);
  const formattedTree = formatter(unformattedTree);

  return formattedTree;
};

export default genDiff;
