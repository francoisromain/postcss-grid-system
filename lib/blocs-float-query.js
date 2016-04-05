var postcss = require('postcss');

module.exports = function (opts, breakpoint, mediaQuery) {

    if (opts.display === 'float') {
        var blocFloat = postcss.rule();
        blocFloat.append({ prop: 'float', value: 'left' });
        blocFloat.append({ prop: 'clear', value: 'none' });
        for (var col = opts.max; col > 0; col--) {
            blocFloat.selector = blocFloat.selector ?
                blocFloat.selector + ', .bloc-' + breakpoint + '-' + col :
                '.bloc-' + breakpoint + '-' + col;

            if (col > 1 && col < opts.max) {
                for (var off = 1; off <= opts.max - col; off++) {
                    blocFloat.selector = blocFloat.selector +
                        ', .bloc-' + breakpoint + '-' + col + '-' + off;
                }
            }
        }
        mediaQuery.append(blocFloat);
    }
};
