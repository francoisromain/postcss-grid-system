'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (opts, breakpoint, mediaQuery, columns) {
  if (columns.length) {
    var columnCount = {};

    for (var index = 1; index <= breakpoint; index++) {
      columnCount[index] = _postcss2.default.rule();
      columnCount[index].append({ prop: 'column-count', value: index.toString() });
    }

    for (var units = 1; units <= breakpoint; units++) {
      if (columns[units]) {
        for (var width = 1; width <= opts.max; width++) {
          if (columns[units][width]) {
            var i1 = false;
            if (width >= breakpoint) {
              i1 = breakpoint;
            } else if (breakpoint === units) {
              i1 = width;
            }
            if (i1) {
              _utils2.default.selectorsAdd(columnCount[i1], columns[units][width][0]);
            }

            if (width > 1 && width < opts.max) {
              for (var offset = 1; offset <= opts.max - width; offset++) {
                var i2 = false;
                if (width + offset <= breakpoint && breakpoint === units) {
                  i2 = width;
                } else if (width + offset >= breakpoint && breakpoint - offset >= 1) {
                  i2 = breakpoint - offset;
                } else if (breakpoint === units) {
                  i2 = 1;
                }
                if (i2) {
                  _utils2.default.selectorsAdd(columnCount[i2], columns[units][width][offset]);
                }
              }
            }
          }
        }
      }
    }

    for (var _index = 1; _index <= breakpoint; _index++) {
      if (columnCount[_index].selector) {
        mediaQuery.append(columnCount[_index]);
      }
    }
  }
};