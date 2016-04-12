'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (opts, breakpoint, mediaQuery, blocs) {
  if (blocs.length && blocs[breakpoint] && blocs[breakpoint].length && opts.display === 'float') {
    var blocFloat = _postcss2.default.rule();

    blocFloat.append({ prop: 'float', value: 'left' });
    blocFloat.append({ prop: 'clear', value: 'none' });

    for (var width = opts.max; width > 0; width--) {
      if (blocs[breakpoint][width]) {
        if (blocs[breakpoint][width][0]) {
          _utils2.default.selectorsAdd(blocFloat, blocs[breakpoint][width][0]);
        }
        if (width > 1 && width < opts.max) {
          for (var offset = 1; offset <= opts.max - width; offset++) {
            if (blocs[breakpoint][width][offset]) {
              _utils2.default.selectorsAdd(blocFloat, blocs[breakpoint][width][offset]);
            }
          }
        }
      }
    }

    mediaQuery.append(blocFloat);
  }
};