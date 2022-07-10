import stylish from './stylish.js';
import plain from './plain.js';

const switchFormatters = (formatName) => {
  let correctFormatter;
  switch (formatName) {
    case 'plain':
      correctFormatter = plain;
      break;
    default:
      correctFormatter = stylish;
  }

  return correctFormatter;
};

export default switchFormatters;
