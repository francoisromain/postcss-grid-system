'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (blocs, node, opts, breakpoint) {
  if (blocs.length) {
    var blocWidth = {};

    for (var i = 1; i <= breakpoint; i++) {
      blocWidth[i] = _postcss2.default.rule();
      var blocWidthValue = opts.unit * i - opts.gutter;
      if (opts.display === 'flex') {
        blocWidth[i].append({ prop: 'flex', value: '0 1 ' + blocWidthValue + 'rem' });
      } else if (opts.display === 'float') {
        blocWidth[i].append({ prop: 'width', value: blocWidthValue + 'rem' });
      }
    }

    for (var units = 1; units <= breakpoint; units++) {
      if (blocs[units]) {
        for (var width = 1; width <= opts.max; width++) {
          if (blocs[units][width]) {
            var i1 = false;
            if (width >= breakpoint) {
              i1 = breakpoint;
            } else if (units === breakpoint) {
              i1 = width;
            }

            if (i1) {
              _utils2.default.selectorsAdd(blocWidth[i1], blocs[units][width][0]);
            }

            if (width > 1 && width < opts.max) {
              for (var offset = 1; offset + width <= opts.max; offset++) {
                var i2 = false;
                if (width + offset <= breakpoint && units === breakpoint) {
                  i2 = width;
                } else if (width + offset >= breakpoint && breakpoint - offset > 1) {
                  i2 = breakpoint - offset;
                } else if (units === breakpoint) {
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

    for (var _i = 1; _i <= breakpoint; _i++) {
      if (blocWidth[_i].selector) {
        node.append(blocWidth[_i]);
      }
    }
  }
};