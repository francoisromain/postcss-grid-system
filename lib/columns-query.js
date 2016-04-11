var postcss = require('postcss');
var utils = require('./utils.js');

module.exports = function columnsQuery(opts, breakpoint, mediaQuery, columns) {
  var columnCount = {};
  var idx;
  var units;
  var width;
  var i1;
  var i2;
  var offset;
  var max = columns[breakpoint].length;

  for (idx = 1; idx <= breakpoint; idx++) {
    columnCount[idx] = postcss.rule();
    columnCount[idx].append({
      prop: 'column-count',
      value: idx.toString()
    });
  }

  for (units = 1; units <= breakpoint; units++) {
    for (width = 1; width <= max; width++) {
      if (columns[units][width]) {
        i1 = false;
        if (width >= breakpoint) {
          i1 = breakpoint;
        } else if (breakpoint === units) {
          i1 = width;
        }
        if (i1) {
          utils.selectorsAdd(columnCount[i1], columns[units][width][0]);
        }

        if (width > 1 && width < max) {
          for (offset = 1; offset <= max - width; offset++) {
            i2 = false;
            if (width + offset <= breakpoint && breakpoint === units) {
              i2 = width;
            } else if (width + offset >= breakpoint && breakpoint - offset >= 1) {
              i2 = breakpoint - offset;
            } else if (breakpoint === units) {
              i2 = 1;
            }
            if (i2) {
              utils.selectorsAdd(columnCount[i2], columns[units][width][offset]);
            }
          }
        }
      }
    }
  }
  for (idx = 1; idx <= breakpoint; idx++) {
    if (columnCount[idx].selector) {
      mediaQuery.append(columnCount[idx]);
    }
  }
};
