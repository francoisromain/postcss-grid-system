var postcss = require('postcss');
var utils = require('./utils.js');

module.exports = function blocsFloaQuery(opts, breakpoint, mediaQuery, blocs) {
  var width;
  var offset;
  var blocFloat;
  var max = blocs[breakpoint].length;

  if (opts.display === 'float' && blocs) {
    blocFloat = postcss.rule();
    blocFloat.append({ prop: 'float', value: 'left' });
    blocFloat.append({ prop: 'clear', value: 'none' });
    for (width = max; width > 0; width--) {
      if (blocs[breakpoint][width]) {
        utils.selectorsAdd(blocFloat, blocs[breakpoint][width][0]);
        if (width > 1 && width < max) {
          for (offset = 1; offset <= max - width; offset++) {
            if (blocs[breakpoint][width]) {
              utils.selectorsAdd(blocFloat, blocs[breakpoint][width][offset]);
            }
          }
        }
      }
    }
    mediaQuery.append(blocFloat);
  }
};
