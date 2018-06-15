'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processFiles = processFiles;

var _fs = require('fs');

var _path = require('path');

var _getFullRc = require('./helpers/rcfile/getFullRc');

var isDirectory = function isDirectory(source) {
  return (0, _fs.lstatSync)(source).isDirectory();
};

var processingFile = function processingFile(_ref) {
  var filePath = _ref.filePath,
      fileName = _ref.fileName,
      type = _ref.type;

  _getFullRc.fullRc.tests.forEach(function (_ref2) {
    var name = _ref2.name,
        processFile = _ref2.processFile;

    if (type === name) {
      return require('' + processFile).processFiles({ filePath: filePath, fileName: fileName });
    }
  });
};

var processContents = function processContents(source, type) {
  var AllPromise = [];
  (0, _fs.readdirSync)(source).forEach(function (name) {
    if (isDirectory((0, _path.join)(source, name))) {
      processContents((0, _path.join)(source, name), type);
    } else {
      var processFilesPromise = processingFile({ filePath: (0, _path.join)(source, name), fileName: name, type: type });
      if (processFilesPromise) {
        AllPromise.push(processFilesPromise);
      }
    }
  });
  return Promise.all(AllPromise);
};

function processFiles(_ref3) {
  var to = _ref3.to,
      type = _ref3.type;

  console.log('\x1b[36m%s\x1b[0m', '**** processing ... ****'); // eslint-disable-line
  processContents(to, type).then(function () {
    return console.log('\x1b[36m%s\x1b[0m', '**** Process ending ****');
  }); // eslint-disable-line
}