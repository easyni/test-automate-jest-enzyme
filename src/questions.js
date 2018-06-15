import inquirer from 'inquirer';
import { fullRc } from './helpers/rcfile/getFullRc';
import { isTestAvailable } from './helpers/questions/avliable';

inquirer.registerPrompt('directory', require('inquirer-directory'));

let answerToProcess = {};

export function questions() {
  const allQuestion =
    fullRc.tests.map(processor => ({ name: processor.label, value: processor.name }));

  return new Promise((resolve, reject) => {
    inquirer.prompt([
      {
        type: 'list',
        message: 'Select the jest test you wanna do: ',
        name: 'type',
        choices: allQuestion,
      },
    ]).then((answersStep) => {
      if (!isTestAvailable(answersStep.type)) {
        console.log('\x1b[31m%s\x1b[0m', 'this test template is not available yet'); // eslint-disable-line
        return Promise.reject();
      }
      answerToProcess = { ...answersStep };
      return inquirer.prompt([{
        type: 'directory',
        name: 'to',
        message: 'what‘s the folder you wanna target ?',
        basePath: '.',
      }]);
    }).then((answersStep) => {
      answerToProcess = { ...answerToProcess, ...answersStep };
      return inquirer.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: `you confirm the process that you wanna make some
      jest test for some ‘${answersStep.type}‘ 
      in that path : ‘${answersStep.to}‘ ? `,
        basePath: '.',
      }]);
    }).then((answersStep) => {
      if (answersStep.confirm) {
        resolve(answerToProcess);
      } else {
        reject();
      }
    }).catch(() => reject());
  });
}

