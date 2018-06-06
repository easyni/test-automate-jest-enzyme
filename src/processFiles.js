import { lstatSync, readdirSync, readFileSync, writeFile, existsSync } from 'fs';
import { join } from 'path';
import { fullRc } from './helpers/getFullRc';

const isDirectory = source => lstatSync(source).isDirectory();

const processFile = ({filePath, fileName, type}) => {
  fullRc.tests.forEach(({name, label, processFile}) => {
    if(type === name) {
      return require(`${processFile}`).processFiles({filePath, fileName});
    }
  })
};

const processContents = (source, type) => {
  const AllPromise = [];
  readdirSync(source).forEach(
    (name) => {
      if(isDirectory(join(source, name))) {
        processContents(join(source, name), type);
      }
      else {
        const processFilesPromise = processFile({filePath: join(source, name), fileName: name, type});
        processFilesPromise && AllPromise.push(processFilesPromise);
      }
    }
  );
  return Promise.all(AllPromise);
};


export function processFiles({to, type}) {
  console.log('\x1b[36m%s\x1b[0m','**** processing ... ****');
  processContents(to, type)
    .then(() => console.log('\x1b[36m%s\x1b[0m','**** Process ending ****'))
}
