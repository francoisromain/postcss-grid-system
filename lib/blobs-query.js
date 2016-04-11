var postcss = require('postcss');
var utils = require('./utils.js');

module.exports = function (opts, breakpoint, mediaQuery, blobs) {
    var total;
    var ratio;
    var blobWidth;
    var blobWidthValue;
    var blobWidthString;

    for (total = 2; total <= blobs[breakpoint].length; total++) {
        if (blobs[breakpoint][total]) {
            for (ratio = 1; ratio < blobs[breakpoint][total].length; ratio++) {
                if (blobs[breakpoint][total][ratio]) {
                    blobWidth = postcss.rule();
                    blobWidthValue = 100 * ratio / total;
                    blobWidthString = blobWidthValue + '% - ' + opts.gutter + 'rem';
                    utils.selectorsAdd(blobWidth, blobs[breakpoint][total][ratio]);
                    if (opts.display === 'flex') {
                        blobWidth.append({
                            prop: 'flex',
                            value: '0 1 calc(' + blobWidthString + ')'
                        });
                    } else if (opts.display === 'float') {
                        blobWidth.append({
                            prop: 'width',
                            value: 'calc(' + blobWidthString + ')'
                        });
                    }
                    mediaQuery.append(blobWidth);
                }
            }
        }
    }
};
