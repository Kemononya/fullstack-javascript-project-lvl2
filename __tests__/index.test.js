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

  const result1 = readFileSync(getFixturePath('result1.txt')).toString();
  const result2 = readFileSync(getFixturePath('result2.txt')).toString();

  expect(genDiff(file1Y, file2Y)).toEqual(result1);
  expect(genDiff(file1J, file2J)).toEqual(result2);
});
