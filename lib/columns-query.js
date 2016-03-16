var postcss = require('postcss');

module.exports = function (opts, breakpoint, mediaQuery) {

    var columnCount = {},
        idx;

    for (idx = 1; idx <= breakpoint; idx++) {
        columnCount[idx] = postcss.rule();
        columnCount[idx].append({
            prop: 'column-count',
            value: idx.toString()
        });
    }

    for (var size = 1; size <= breakpoint; size++) {
        for (var col = 1; col <= opts.max; col++) {
            var i1 = false;
            if (col >= breakpoint) {
                i1 = breakpoint;
            } else if (breakpoint === size) {
                i1 = col;
            }
            if (i1) {
                columnCount[i1].selector = columnCount[i1].selector ?
                    columnCount[i1].selector +
                    ', .columns-' + size + '-' + col :
                    '.columns-' + size + '-' + col;
            }

            if (col > 1 && col < opts.max) {
                for (var off = 1; off <= opts.max - col; off++) {
                    var i2 = false;
                    if (col + off <= breakpoint && breakpoint === size) {
                        i2 = col;
                    } else if (col + off >= breakpoint && breakpoint - off >= 1) {
                        i2 = breakpoint - off;
                    } else if (breakpoint === size) {
                        i2 = 1;
                    }
                    if (i2) {
                        columnCount[i2].selector =
                            columnCount[i2].selector ?
                            columnCount[i2].selector +
                            ', .columns-' + size + '-' + col + '-' + off :
                            '.columns-' + size + '-' + col + '-' + off;
                    }
                }
            }
        }
    }
    for (idx = 1; idx <= breakpoint; idx++) {
        if (columnCount[idx].selector) {
            mediaQuery.append(columnCount[idx]);
        }
    }
};
