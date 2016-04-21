'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (containers, node, opts, breakpoint) {
  if (containers.length) {
    var containerQuery = _postcss2.default.rule();
    var containerWidth = breakpoint * opts.unit - opts.gutter + 2 * opts.padding;

    for (var i = 0; i <= breakpoint; i++) {
      if (containers[i] && containers[i].length) {
        _utils2.default.selectorsAdd(containerQuery, containers[i]);
      }
    }

    containerQuery.append({ prop: 'width', value: containerWidth + 'rem' });

    node.append(containerQuery);
  }
};