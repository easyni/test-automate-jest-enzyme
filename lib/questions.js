'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.questions = questions;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _getFullRc = require('./helpers/getFullRc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_inquirer2.default.registerPrompt('directory', require('inquirer-directory'));

var answerToProcess = {};

function questions() {
  var allQuestion = _getFullRc.fullRc.tests.map(function (processor) {
    return { name: processor.label, value: processor.name };
  });

  return new Promise(function (resolve, reject) {
    _inquirer2.default.prompt([{
      type: 'list',
      message: 'Select the jest test you wanna do: ',
      name: 'type',
      choices: allQuestion
    }, {
      type: 'directory',
      name: 'to',
      message: 'what‘s the folder you wanna target ?',
      basePath: '.'
    }]).then(function (answers) {
      answerToProcess = _extends({}, answers);
      _inquirer2.default.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: 'you confirm the process that you wanna make some  \n      jest test for some \u2018' + answers.type + '\u2018 \n      in that path : \u2018' + answers.to + '\u2018 ? ',
        basePath: '.'
      }]).then(function (answers) {
        if (answers.confirm) {
          resolve(answerToProcess);
        } else {
          reject();
        }
      });
    });
  });
}