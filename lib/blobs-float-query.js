var postcss = require('postcss');

module.exports = function (opts, breakpoint, mediaQuery) {

    if (opts.display === 'float') {
        var blobFloat = postcss.rule();
        blobFloat.append({ prop: 'float', value: 'left' });
        blobFloat.append({ prop: 'clear', value: 'none' });
        for (var total = 2; total <= opts.max; total++) {
            for (var ratio = 1; ratio < total; ratio++) {
                blobFloat.selector = blobFloat.selector ?
                    blobFloat.selector + ', .blob-' +
                    breakpoint + '-' + ratio + '-' + total :
                    '.blob-' + breakpoint + '-' + ratio + '-' + total;
            }
        }
        mediaQuery.append(blobFloat);
    }
};
