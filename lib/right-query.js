var postcss = require('postcss');

module.exports = function (opts, breakpoint, mediaQuery) {

    var right = postcss.rule({ selector: '.right-' + breakpoint });
    if (opts.display === 'flex') {
        right.append({ prop: 'margin-left', value: 'auto' });
    } else if (opts.display === 'float') {
        right.append({ prop: 'float', value: 'right' });
    }
    mediaQuery.append(right);
};
