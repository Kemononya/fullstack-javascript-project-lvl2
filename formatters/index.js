import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const switchFormatters = (formatName) => {
  let correctFormatter;
  switch (formatName) {
    case 'plain':
      correctFormatter = plain;
      break;
    case 'json':
      correctFormatter = json;
      break;
    default:
      correctFormatter = stylish;
  }

  return correctFormatter;
};

export default switchFormatters;
