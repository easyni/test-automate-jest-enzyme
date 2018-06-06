'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processFiles = undefined;

var _fs = require('fs');

var componentTemplate = __dirname + '/../../templates/components.tpljs';

var processFiles = exports.processFiles = function processFiles(_ref) {
  var filePath = _ref.filePath,
      fileName = _ref.fileName;

  if (filePath.match(/^\S*(?<!index)(?<!test)\.js$/gi)) {
    return new Promise(function (resolve) {
      var testFileBaseName = fileName.replace('.js', '');
      var myContentBase = (0, _fs.readFileSync)(componentTemplate, 'utf8').replace(/%%componentName%%/g, testFileBaseName);
      var testFileName = testFileBaseName + '.test.js';
      var testFilePath = '' + filePath.replace(fileName, '') + testFileName;
      if (!(0, _fs.existsSync)(testFilePath)) {
        (0, _fs.writeFile)(testFilePath, myContentBase, function (err) {
          if (err) {
            return console.error(err);
          }
          resolve();
        });
      }
    });
  }
};