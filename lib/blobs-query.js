var postcss = require('postcss');

module.exports = function (opts, breakpoint, mediaQuery) {

    var blobWidth;
    var blobWidthValue;
    var blobWidthString;
    for (var divider = 2; divider <= opts.max; divider++) {
        for (var ratio = 1; ratio < divider; ratio++) {
            blobWidth = postcss.rule();
            blobWidthValue = 100 * ratio / divider;
            blobWidthString = blobWidthValue + '% - ' + opts.gutter + 'rem';
            blobWidth.selector = '.blob-' + breakpoint + '-' + ratio +
            '-' + divider;
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
};
