'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (containers, node, opts) {
  if (containers.length) {
    var container = _postcss2.default.rule();

    container.selectors = _utils2.default.flatten(containers);

    container.append({ prop: 'padding-left', value: opts.padding + 'rem' });
    container.append({ prop: 'padding-right', value: opts.padding + 'rem' });
    container.append({ prop: 'overflow', value: 'hidden' });

    if (opts.align === 'center') {
      container.append({ prop: 'margin-left', value: 'auto' });
      container.append({ prop: 'margin-right', value: 'auto' });
    }

    node.append(container);
  }
};