var postcss = require('postcss');

module.exports = function (opts, breakpoint, mediaQuery) {

    var blobWidth;
    var blobWidthValue;
    var totalWidth =  breakpoint * opts.width;
    var queryMake = function (size) {
        for (var total = 2; total <= opts.max; total++) {
            for (var ratio = 1; ratio < total; ratio++) {
                blobWidth = postcss.rule();
                blobWidthValue = totalWidth * ratio / total - opts.gutter;
                blobWidth.selector = '.blob-' + size + '-' + ratio +
                '-' + total;
                if (opts.display === 'flex') {
                    blobWidth.append({
                        prop: 'flex',
                        value: '0 1 ' + blobWidthValue + 'rem'
                    });
                } else if (opts.display === 'float') {
                    blobWidth.append({
                        prop: 'width',
                        value: blobWidthValue + 'rem'
                    });
                }
                mediaQuery.append(blobWidth);
            }
        }
    };

    queryMake(0);
    for (var size = opts.min; size <= breakpoint; size++) {
        queryMake(size);
    }
};
