var postcss = require('postcss');
var utils = require('./utils.js');

module.exports = function blocsQuery(opts, breakpoint, mediaQuery, blocs) {
  var blocWidth = {};
  var blocWidthValue;
  var idx;
  var units;
  var width;
  var offset;
  var i1;
  var i2;
  var max = blocs[breakpoint].length;

  for (idx = 1; idx <= breakpoint; idx++) {
    blocWidth[idx] = postcss.rule();
    blocWidthValue = opts.unit * idx - opts.gutter;
    if (opts.display === 'flex') {
      blocWidth[idx].append({ prop: 'flex', value: '0 1 ' + blocWidthValue + 'rem' });
    } else if (opts.display === 'float') {
      blocWidth[idx].append({ prop: 'width', value: blocWidthValue + 'rem' });
    }
  }

  for (units = 1; units <= breakpoint; units++) {
    for (width = 1; width <= max; width++) {
      if (blocs[units][width]) {
        i1 = false;
        if (width >= breakpoint) {
          i1 = breakpoint;
        } else if (breakpoint === units) {
          i1 = width;
        }
        if (i1) {
          utils.selectorsAdd(blocWidth[i1], blocs[units][width][0]);
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
              utils.selectorsAdd(blocWidth[i2], blocs[units][width][offset]);
            }
          }
        }
      }
    }
  }
  for (idx = 1; idx <= breakpoint; idx++) {
    if (blocWidth[idx].selector) {
      mediaQuery.append(blocWidth[idx]);
    }
  }
};
