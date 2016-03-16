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

    var show = postcss.rule({ selector: '.show-' + breakpoint });
    show.append({ prop: 'display', value: 'block' });
    show.append({ prop: 'visibility', value: 'visible' });
    mediaQuery.append(show);

    var floatRight = postcss.rule({ selector: '.right-' + breakpoint });
    if (opts.display === 'flex') {
        floatRight.append({ prop: 'margin-left', value: 'auto' });
    } else if (opts.display === 'float') {
        floatRight.append({ prop: 'float', value: 'right' });
    }
    mediaQuery.append(floatRight);
};
