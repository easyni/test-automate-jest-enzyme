import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import { fullRc } from './helpers/rcfile/getFullRc';

const isDirectory = source => lstatSync(source).isDirectory();

const processingFile = ({ filePath, fileName, type }) => {
  fullRc.tests.forEach(({ name, processFile }) => {
    if (type === name) {
      return require(`${processFile}`).processFiles({ filePath, fileName });
    }
  });
};

const processContents = (source, type) => {
  const AllPromise = [];
  readdirSync(source).forEach((name) => {
    if (isDirectory(join(source, name))) {
      processContents(join(source, name), type);
    } else {
      const processFilesPromise =
        processingFile({ filePath: join(source, name), fileName: name, type });
      if (processFilesPromise) {
        AllPromise.push(processFilesPromise);
      }
    }
  });
  return Promise.all(AllPromise);
};


export function processFiles({ to, type }) {
  console.log('\x1b[36m%s\x1b[0m', '**** processing ... ****'); // eslint-disable-line
  processContents(to, type)
    .then(() => console.log('\x1b[36m%s\x1b[0m', '**** Process ending ****')); // eslint-disable-line
}
