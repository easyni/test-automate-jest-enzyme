import inquirer from 'inquirer';

import { fullRc } from './helpers/getFullRc';

inquirer.registerPrompt('directory', require('inquirer-directory'));

let answerToProcess = {};

export function questions() {
  const allQuestion = fullRc.tests.map(processor => ({ name: processor.label, value: processor.name }));

  return new Promise((resolve, reject) => {
    inquirer.prompt([
      {
        type: 'list',
        message: 'Select the jest test you wanna do: ',
        name: 'type',
        choices: allQuestion
      },
      {
        type: 'directory',
        name: 'to',
        message: 'what‘s the folder you wanna target ?',
        basePath: '.'
      },
    ]).then((answers) => {
      answerToProcess = {...answers};
      inquirer.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: `you confirm the process that you wanna make some \ 
      jest test for some ‘${answers.type}‘ 
      in that path : ‘${answers.to}‘ ? `,
        basePath: '.'
      }]).then((answers) => {
        if(answers.confirm) {
          resolve(answerToProcess);
        }
        else {
          reject();
        }
      })
    })
  });

}

