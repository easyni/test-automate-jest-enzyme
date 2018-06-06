'use strict';

var _questions = require('./questions');

var _processFiles = require('./processFiles');

function startApp() {
  (0, _questions.questions)().then(function (answers) {
    (0, _processFiles.processFiles)(answers);
  }).catch(function () {
    return startApp();
  });
}
startApp();