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
};
