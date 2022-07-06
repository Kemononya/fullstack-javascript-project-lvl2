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

test('plain data', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const result1 = readFileSync(getFixturePath('result1.txt')).toString();
  expect(genDiff(file1, file2)).toEqual(result1);
});
