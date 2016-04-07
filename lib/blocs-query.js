var postcss = require('postcss');

module.exports = function (opts, breakpoint, mediaQuery) {

    var blocWidth = {},
        blocWidthValue, idx;

    for (idx = 1; idx <= breakpoint; idx++) {
        blocWidth[idx] = postcss.rule();
        blocWidthValue = opts.unit * idx - opts.gutter;
        if (opts.display === 'flex') {
            blocWidth[idx].append({
                prop: 'flex',
                value: '0 1 ' + blocWidthValue + 'rem'
            });
        } else if (opts.display === 'float') {
            blocWidth[idx].append({
                prop: 'width',
                value: blocWidthValue + 'rem'
            });
        }
    }

    for (var units = 1; units <= breakpoint; units++) {
        for (var col = 1; col <= opts.max; col++) {
            var i1 = false;
            if (col >= breakpoint) {
                i1 = breakpoint;
            } else if (breakpoint === units) {
                i1 = col;
            }
            if (i1) {
                blocWidth[i1].selector = blocWidth[i1].selector ?
                    blocWidth[i1].selector + ', .bloc-' + units + '-' + col :
                    '.bloc-' + units + '-' + col;
            }

            if (col > 1 && col < opts.max) {
                for (var off = 1; off <= opts.max - col; off++) {
                    var i2 = false;
                    if (col + off <= breakpoint && breakpoint === units) {
                        i2 = col;
                    } else if (col + off >= breakpoint && breakpoint - off >= 1) {
                        i2 = breakpoint - off;
                    } else if (breakpoint === units) {
                        i2 = 1;
                    }
                    if (i2) {
                        blocWidth[i2].selector = blocWidth[i2].selector ?
                            blocWidth[i2].selector +
                            ', .bloc-' + units + '-' + col + '-' + off :
                            '.bloc-' + units + '-' + col + '-' + off;
                    }
                }
            }
        }
    }
    for (idx = 1; idx <= breakpoint; idx++) {
        if (blocWidth[idx].selector) {
            mediaQuery.append(blocWidth[idx]);
        }
    }
};
