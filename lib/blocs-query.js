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
  if (blocs.length && blocs[breakpoint]) {
    var blocWidth = {};
    var max = blocs[breakpoint].length;

    for (var idx = 1; idx <= breakpoint; idx++) {
      blocWidth[idx] = _postcss2.default.rule();
      var blocWidthValue = opts.unit * idx - opts.gutter;
      if (opts.display === 'flex') {
        blocWidth[idx].append({ prop: 'flex', value: '0 1 ' + blocWidthValue + 'rem' });
      } else if (opts.display === 'float') {
        blocWidth[idx].append({ prop: 'width', value: blocWidthValue + 'rem' });
      }
    }

    for (var units = 1; units <= breakpoint; units++) {
      if (blocs[units] && blocs[units].length) {
        for (var width = 1; width <= max; width++) {
          if (blocs[units][width] && blocs[units][width].length) {
            var i1 = false;
            if (width >= breakpoint) {
              i1 = breakpoint;
            } else if (breakpoint === units) {
              i1 = width;
            }
            if (i1) {
              _utils2.default.selectorsAdd(blocWidth[i1], blocs[units][width][0]);
            }

            if (width > 1 && width < max) {
              for (var offset = 1; offset <= max - width; offset++) {
                var i2 = false;
                if (width + offset <= breakpoint && breakpoint === units) {
                  i2 = width;
                } else if (width + offset >= breakpoint && breakpoint - offset >= 1) {
                  i2 = breakpoint - offset;
                } else if (breakpoint === units) {
                  i2 = 1;
                }
                if (i2) {
                  _utils2.default.selectorsAdd(blocWidth[i2], blocs[units][width][offset]);
                }
              }
            }
          }
        }
      }
    }
    for (var _idx = 1; _idx <= breakpoint; _idx++) {
      if (blocWidth[_idx].selector) {
        mediaQuery.append(blocWidth[_idx]);
      }
    }
  }
};