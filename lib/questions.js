'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.questions = questions;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _getFullRc = require('./helpers/rcfile/getFullRc');

var _avliable = require('./helpers/questions/avliable');

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
    }]).then(function (answersStep) {
      if (!(0, _avliable.isTestAvailable)(answersStep.type)) {
        console.log('\x1b[31m%s\x1b[0m', 'this test template is not available yet'); // eslint-disable-line
        return Promise.reject();
      }
      answerToProcess = _extends({}, answersStep);
      return _inquirer2.default.prompt([{
        type: 'directory',
        name: 'to',
        message: 'what‘s the folder you wanna target ?',
        basePath: '.'
      }]);
    }).then(function (answersStep) {
      answerToProcess = _extends({}, answerToProcess, answersStep);
      return _inquirer2.default.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: 'you confirm the process that you wanna make some\n      jest test for some \u2018' + answersStep.type + '\u2018 \n      in that path : \u2018' + answersStep.to + '\u2018 ? ',
        basePath: '.'
      }]);
    }).then(function (answersStep) {
      if (answersStep.confirm) {
        resolve(answerToProcess);
      } else {
        reject();
      }
    }).catch(function () {
      return reject();
    });
  });
}