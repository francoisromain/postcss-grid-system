var postcss = require('postcss');

module.exports = function (opts, breakpoint, mediaQuery) {

    var blobWidth;
    var blobWidthValue;
    var blobWidthString;
    for (var total = 2; total <= opts.max; total++) {
        for (var ratio = 1; ratio < total; ratio++) {
            blobWidth = postcss.rule();
            blobWidthValue = 100 * ratio / total;
            blobWidthString = blobWidthValue + '% - ' + opts.gutter + 'rem';
            blobWidth.selector = '.blob-' + breakpoint + '-' + ratio +
            '-' + total;
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
