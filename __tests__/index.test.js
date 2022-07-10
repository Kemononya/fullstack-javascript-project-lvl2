import { test, expect, beforeAll } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

let getFixturePath;

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
});

test('main workflow', () => {
  const file1J = getFixturePath('file1.json');
  const file2J = getFixturePath('file2.json');

  const file1Y = getFixturePath('file1.yml');
  const file2Y = getFixturePath('file2.yml');

  const resultStylish = readFileSync(getFixturePath('result-stylish.txt')).toString();
  const resultPlain = readFileSync(getFixturePath('result-plain.txt')).toString();
  const resultJSON = readFileSync(getFixturePath('result-json.txt')).toString();

  expect(genDiff(file1Y, file2Y)).toEqual(resultStylish);
  expect(genDiff(file1J, file2J, 'stylish')).toEqual(resultStylish);
  expect(genDiff(file1J, file2Y, 'plain')).toEqual(resultPlain);
  expect(genDiff(file1J, file2Y, 'json')).toEqual(resultJSON);
});
