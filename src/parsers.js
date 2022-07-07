import { load } from 'js-yaml';

export default (file, ext) => {
  let result;
  if (ext.toLowerCase() === '.json') {
    result = JSON.parse(file);
  }
  if (ext.toLowerCase() === '.yaml' || ext.toLowerCase() === '.yml') {
    result = load(file);
  }
  return result;
};
