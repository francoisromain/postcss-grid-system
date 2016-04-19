'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (rights, node, opts) {
  if (rights && rights.length) {
    var right = _postcss2.default.rule();

    right.selectors = rights;

    if (opts.display === 'flex') {
      right.append({ prop: 'margin-left', value: 'auto' });
    } else if (opts.display === 'float') {
      right.append({ prop: 'float', value: 'right' });
    }

    node.append(right);
  }
};