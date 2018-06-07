import { transform } from 'babel-core';
import { readFileSync } from 'fs';
import { questions } from './questions';
import { processFiles } from './processFiles';
import { getAllProps, getDefaultExportName } from './helpers/astHelper';

function startApp() {
  questions()
    .then((answers) => {
      processFiles(answers)
    }).catch((error) => {
    if(error) {
      throw error;
    }
    startApp()
  });
}
const { ast } = transform(readFileSync(`${__dirname}/../componentTest/Toggle/ToggleOptions/ToggleOptions.js`, 'utf8'), { presets: [ 'env', 'stage-0', 'stage-1', 'stage-2', 'stage-3', 'react' ]})
console.log(getAllProps(ast, getDefaultExportName(ast)));

startApp();
