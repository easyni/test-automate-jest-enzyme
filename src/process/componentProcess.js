import { existsSync, readFileSync, writeFile } from 'fs';

const componentTemplate = `${__dirname}/../../templates/components.tpljs`;

export const processFiles = ({filePath, fileName}) => {
  if(filePath.match(/^\S*(?<!index)(?<!test)\.js$/gi)) {
    return new Promise((resolve) => {
      const testFileBaseName = fileName.replace('.js', '');
      const myContentBase =  readFileSync(componentTemplate, 'utf8').replace(/%%componentName%%/g, testFileBaseName);
      const testFileName = `${testFileBaseName}.test.js`;
      const testFilePath = `${filePath.replace(fileName, '')}${testFileName}`;
      if(!existsSync(testFilePath)) {
        writeFile(testFilePath, myContentBase, function(err) {
          if(err) {
            return console.error(err);
          }
          resolve()
        })
      }
    })
  }
};
