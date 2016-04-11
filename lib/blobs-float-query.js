var postcss = require('postcss');
var utils = require('./utils.js');

module.exports = function blobsFloatQuery(opts, breakpoint, mediaQuery, blobs) {
  var total;
  var ratio;
  var blobFloat;

  if (opts.display === 'float' && blobs) {
    blobFloat = postcss.rule();
    blobFloat.append({ prop: 'float', value: 'left' });
    blobFloat.append({ prop: 'clear', value: 'none' });
    for (total = 2; total <= blobs[breakpoint].length; total++) {
      if (blobs[breakpoint][total]) {
        for (ratio = 1; ratio < blobs[breakpoint][total].length; ratio++) {
          utils.selectorsAdd(blobFloat, blobs[breakpoint][total][ratio]);
        }
      }
    }
    mediaQuery.append(blobFloat);
  }
};
