import { load } from 'js-yaml';

export default (file, ext) => {
  if (ext.toLowerCase() === '.yaml' || ext.toLowerCase() === '.yml') {
    return load(file);
  }
  return JSON.parse(file);
};
