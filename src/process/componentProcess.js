import { existsSync, readFileSync, writeFile } from 'fs';
import env from 'babel-preset-env';
import stage0 from 'babel-preset-stage-0';
import stage1 from 'babel-preset-stage-1';
import stage2 from 'babel-preset-stage-2';
import stage3 from 'babel-preset-stage-3';
import react from 'babel-preset-react';
import { transformFileSync } from 'babel-core';
import Mustache from 'mustache';
import { getDefaultExportName, getAllProps, getRequiredProps } from '../helpers/astHelper';
import { isPropsTakeIncharge } from '../helpers/propsHelper';

const componentTemplate = `${__dirname}/../../templates/components.tpljs`;

export const processFiles = ({ filePath, fileName }) => {
  if (filePath.match(/^\S*(?<!index)(?<!test)\.js$/gi)) {
    return new Promise((resolve) => {
      const { ast } =
        transformFileSync(filePath, { presets: [env, stage0, stage1, stage2, stage3, react] });
      const componentName = getDefaultExportName(ast);
      if (!componentName) {
        return null;
      }

      const props = getAllProps(ast, componentName);
      const requiredProps = getRequiredProps(props);

      const testFileBaseName = fileName.replace('.js', '');
      const template = readFileSync(componentTemplate, 'utf8');

      const myContentBase = Mustache.render(template, {
        componentName: testFileBaseName,
        props,
        propsExist() {
          return isPropsTakeIncharge(this.type);
        },
        requiredProps() {
          return requiredProps.map((prop, key) => `${prop.key}: ${prop.value}${(key < requiredProps.length - 1 && ',') || ''}`);
        },
      });

      const testFileName = `${testFileBaseName}.test.js`;
      const testFilePath = `${filePath.replace(fileName, '')}${testFileName}`;

      if (!existsSync(testFilePath)) {
        writeFile(testFilePath, myContentBase, (err) => {
          if (err) {
            return console.error(err); // eslint-disable-line
          }
          resolve();
        });
      }
    });
  }
};
