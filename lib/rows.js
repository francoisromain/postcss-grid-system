'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (rows, node, opts) {
  if (rows.length) {
    var row = _postcss2.default.rule();
    var rowClearfix = _postcss2.default.rule();

    row.selectors = _utils2.default.flatten(rows);

    row.append({ prop: 'clear', value: 'both' });
    row.append({ prop: 'margin-right', value: '-' + opts.gutter + 'rem' });

    if (opts.display === 'flex') {
      row.append({ prop: 'display', value: 'flex' });
      row.append({ prop: 'flex-flow', value: 'row wrap' });
      row.append({ prop: 'align-items', value: 'flex-start' });
      row.append({ prop: 'align-content', value: 'flex-start' });
    }

    node.append(row);

    rowClearfix.selectors = rows.map(function (selector) {
      return selector + '::after';
    });
    rowClearfix.append({ prop: 'content', value: '""' });
    rowClearfix.append({ prop: 'display', value: 'table' });
    rowClearfix.append({ prop: 'clear', value: 'both' });

    node.append(rowClearfix);
  }
};