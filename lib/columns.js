'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (opts, rootCss, columns) {
  if (columns.length) {
    var columnsGap = _postcss2.default.rule();
    columnsGap.selectors = _utils2.default.flatten(columns);
    columnsGap.append({ prop: 'column-gap', value: opts.gutter + 'rem' });
    rootCss.append(columnsGap);
  }
};