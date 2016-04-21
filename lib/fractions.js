'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fractions, node, opts) {
  if (fractions.length) {
    var fractionFloat = _postcss2.default.rule();

    fractionFloat.selectors = _utils2.default.flatten(fractions);

    fractionFloat.append({ prop: 'margin-right', value: opts.gutter + 'rem' });
    fractionFloat.append({ prop: 'margin-bottom', value: opts.gutter + 'rem' });

    if (opts.display === 'flex') {
      fractionFloat.append({ prop: 'flex', value: '0 1 auto' });
    } else if (opts.display === 'float') {
      fractionFloat.append({ prop: 'float', value: 'left' });
    }

    node.append(fractionFloat);
  }
};