'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processFiles = undefined;

var _fs = require('fs');

var _babelPresetEnv = require('babel-preset-env');

var _babelPresetEnv2 = _interopRequireDefault(_babelPresetEnv);

var _babelPresetStage = require('babel-preset-stage-0');

var _babelPresetStage2 = _interopRequireDefault(_babelPresetStage);

var _babelPresetStage3 = require('babel-preset-stage-1');

var _babelPresetStage4 = _interopRequireDefault(_babelPresetStage3);

var _babelPresetStage5 = require('babel-preset-stage-2');

var _babelPresetStage6 = _interopRequireDefault(_babelPresetStage5);

var _babelPresetStage7 = require('babel-preset-stage-3');

var _babelPresetStage8 = _interopRequireDefault(_babelPresetStage7);

var _babelPresetReact = require('babel-preset-react');

var _babelPresetReact2 = _interopRequireDefault(_babelPresetReact);

var _babelCore = require('babel-core');

var _mustache = require('mustache');

var _mustache2 = _interopRequireDefault(_mustache);

var _astHelper = require('../helpers/ast/astHelper');

var _astProps = require('../helpers/props/astProps');

var _propsHelper = require('../helpers/props/propsHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentTemplate = __dirname + '/../../templates/components.tpljs';

var processFiles = exports.processFiles = function processFiles(_ref) {
  var filePath = _ref.filePath,
      fileName = _ref.fileName;

  if (filePath.match(/^\S*(?<!index)(?<!test)\.js$/gi)) {
    return new Promise(function (resolve) {
      var _transformFileSync = (0, _babelCore.transformFileSync)(filePath, { presets: [_babelPresetEnv2.default, _babelPresetStage2.default, _babelPresetStage4.default, _babelPresetStage6.default, _babelPresetStage8.default, _babelPresetReact2.default] }),
          ast = _transformFileSync.ast;

      var componentName = (0, _astHelper.getDefaultExportName)(ast);
      if (!componentName) {
        return null;
      }

      var props = (0, _astProps.getAllProps)(ast, componentName);
      var requiredProps = (0, _astProps.getRequiredProps)(props);

      var testFileBaseName = fileName.replace('.js', '');
      var template = (0, _fs.readFileSync)(componentTemplate, 'utf8');

      var myContentBase = _mustache2.default.render(template, {
        componentName: testFileBaseName,
        props: props,
        propsExist: function propsExist() {
          return (0, _propsHelper.isPropsTakeInCharge)(this.type);
        },

        requiredProps: requiredProps,
        comma: function comma() {
          return (0, _propsHelper.isTheLastProps)(this.key, requiredProps);
        },
        warning: function warning() {
          return !(0, _propsHelper.isPropsTakeInCharge)(this.type);
        }
      });

      var testFileName = testFileBaseName + '.test.js';
      var testFilePath = '' + filePath.replace(fileName, '') + testFileName;

      if (!(0, _fs.existsSync)(testFilePath)) {
        (0, _fs.writeFile)(testFilePath, myContentBase, function (err) {
          if (err) {
            return console.error(err); // eslint-disable-line
          }
          resolve();
        });
      }
    });
  }
};