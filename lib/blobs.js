var postcss = require('postcss');

module.exports = function (opts, rootCss) {
    var blob = postcss.rule({ selector: '.blob' });
    blob.append({ prop: 'margin-right', value: opts.gutter + 'rem' });
    blob.append({ prop: 'margin-bottom', value: opts.gutter + 'rem' });
    if (opts.display === 'flex') {
        blob.append({ prop: 'flex', value: '0 1 100%' });
    } else if (opts.display === 'float') {
        blob.append({ prop: 'clear', value: 'both' });
    }
    rootCss.append(blob);

    var blobWidth = postcss.rule();
    blobWidth.append({ prop: 'float', value: 'left' });
    blobWidth.append({ prop: 'clear', value: 'none' });
    blobWidth.append({ prop: 'width', value: '45%' }); /* fix this */
    for (var total = 2; total <= opts.max; total++) {
        for (var ratio = 1; ratio < total; ratio++) {
            blobWidth.selector = blobWidth.selector ?
                blobWidth.selector + ', .blob-0-' + ratio + '-' + total :
                '.blob-0-' + ratio + '-' + total;
        }
    }
    rootCss.append(blobWidth);
};
