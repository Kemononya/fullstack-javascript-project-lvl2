import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const file1J = getFixturePath('file1.json');
const file2J = getFixturePath('file2.json');

const file1Y = getFixturePath('file1.yml');
const file2Y = getFixturePath('file2.yml');

const resultStylish = readFileSync(getFixturePath('result-stylish.txt')).toString();
const resultPlain = readFileSync(getFixturePath('result-plain.txt')).toString();
const resultJSON = readFileSync(getFixturePath('result-json.txt')).toString();

test('main workflow', () => {
  expect(genDiff(file1Y, file2Y)).toEqual(resultStylish);
  expect(genDiff(file1J, file2J)).toEqual(resultStylish);
});

test('format stylish', () => {
  expect(genDiff(file1J, file2Y, 'stylish')).toEqual(resultStylish);
});

test('format plain', () => {
  expect(genDiff(file1Y, file2J, 'plain')).toEqual(resultPlain);
});

test('format json', () => {
  expect(genDiff(file1J, file2J, 'json')).toEqual(resultJSON);
});
