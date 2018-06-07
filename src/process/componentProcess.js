import { transformFileSync } from 'babel-core';
import Mustache from 'mustache';
import { getDefaultExportName, getAllProps, getRequiredProps } from '../helpers/astHelper';
import { existsSync, readFileSync, writeFile } from 'fs';

const componentTemplate = `${__dirname}/../../templates/components.tpljs`;

export const processFiles = ({filePath, fileName}) => {
  if(filePath.match(/^\S*(?<!index)(?<!test)\.js$/gi)) {
    return new Promise((resolve) => {
      const { ast } = transformFileSync(filePath, { presets: [ 'env', 'stage-0', 'stage-1', 'stage-2', 'stage-3', 'react' ]})
      const componentName = getDefaultExportName(ast);
      if(!componentName) {
        return null
      }

      const props = getAllProps(ast, componentName);
      const requiredProps = getRequiredProps(props);

      const testFileBaseName = fileName.replace('.js', '');
      const template = readFileSync(componentTemplate, 'utf8');

      const myContentBase =  Mustache.render(template, {
        componentName,
        props,
        requiredProps,
        requiredProps: function () {
          return requiredProps.map((prop, key) => `${prop.key}: ${prop.value}${(key<requiredProps.length-1 && ',') || ''}`);
        }
      });

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
