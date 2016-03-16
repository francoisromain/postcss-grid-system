var postcss = require('postcss');

module.exports = postcss.plugin('postcss-structure', function (options) {
    options = options || {};
    var opts = {
        width: 18,
        gutter: 1.5,
        padding: 1.5,
        max: 8,
        min: 2,
        thumb: 3,
        align: 'center',
        display: 'flex',
        columns: 1,
        blocs: 1
    };
    var r = postcss.root();

    var makeBlocs = function () {

        var row = postcss.rule({ selector: '.row' });
        row.append({ prop: 'clear', value: 'both' });
        row.append({
            prop: 'margin-right',
            value: '-' + opts.gutter + 'rem'
        });
        if (opts.display === 'flex') {
            row.append({ prop: 'display', value: 'flex' });
            row.append({ prop: 'flex-flow', value: 'row wrap' });
            row.append({ prop: 'align-items', value: 'flex-start' });
            row.append({ prop: 'align-content', value: 'flex-start' });
        }
        r.append(row);

        var rowAfter = postcss.rule({ selector: '.row:after' });
        rowAfter.append({ prop: 'content', value: '""' });
        rowAfter.append({ prop: 'display', value: 'table' });
        rowAfter.append({ prop: 'clear', value: 'both' });
        r.append(rowAfter);

        var bloc = postcss.rule({ selector: '.bloc' });
        bloc.append({ prop: 'margin-right', value: opts.gutter + 'rem' });
        bloc.append({ prop: 'margin-bottom', value: opts.gutter + 'rem' });
        if (opts.display === 'flex') {
            bloc.append({ prop: 'flex', value: '0 1 100%' });
        } else if (opts.display === 'float') {
            bloc.append({ prop: 'clear', value: 'both' });
        }
        r.append(bloc);

        var blocLeft = postcss.rule({ selector: '.bloc-left' });
        if (opts.display === 'flex') {
            blocLeft.append({ prop: 'flex', value: '0 1 auto' });
        } else if (opts.display === 'float') {
            blocLeft.append({ prop: 'float', value: 'left' });
            blocLeft.append({ prop: 'clear', value: 'none' });
            blocLeft.selector +=
                ', .bloc-one-half, .bloc-one-third' +
                ', .bloc-two-third, .bloc-thumb';
        }
        r.append(blocLeft);

        var blocOneHalf = postcss.rule({ selector: '.bloc-one-half' });
        var blocOneHalfValue = opts.width / 2 - opts.gutter;
        if (opts.display === 'flex') {
            blocOneHalf.append({
                prop: 'flex',
                value: '0 1 ' + blocOneHalfValue + 'rem'
            });
        } else if (opts.display === 'float') {
            blocOneHalf.append({
                prop: 'width',
                value: blocOneHalfValue + 'rem'
            });
        }
        r.append(blocOneHalf);

        var blocOneThird = postcss.rule({ selector: '.bloc-one-third' });
        var blocOneThirdValue = opts.width / 3 - opts.gutter;
        if (opts.display === 'flex') {
            blocOneThird.append({
                prop: 'flex',
                value: '0 1 ' + blocOneThirdValue + 'rem'
            });
        } else if (opts.display === 'float') {
            blocOneThird.append({
                prop: 'width',
                value: blocOneHalfValue + 'rem'
            });
        }
        r.append(blocOneThird);

        var blocTwoThird = postcss.rule({ selector: '.bloc-two-third' });
        var blocTwoThirdValue = opts.width * 2 / 3 - opts.gutter;
        if (opts.display === 'flex') {
            blocTwoThird.append({
                prop: 'flex',
                value: '0 1 ' + blocTwoThirdValue + 'rem'
            });
        } else if (opts.display === 'float') {
            blocTwoThird.append({
                prop: 'width',
                value: blocTwoThirdValue + 'rem'
            });
        }
        r.append(blocTwoThird);

        var thumbQty = 1;
        var blocThumb = postcss.rule({ selector: '.bloc-thumb' });
        blocThumb.append({
            prop: 'text-align',
            value: 'center'
        });
        while (opts.width / thumbQty - opts.gutter > opts.thumb) {
            thumbQty++;
        }
        var blocThumbValue = opts.width / (thumbQty - 1) - opts.gutter;
        if (opts.display === 'flex') {
            blocThumb.append({
                prop: 'flex',
                value: '0 1 ' + blocThumbValue + 'rem'
            });
        } else if (opts.display === 'float') {
            blocThumb.append({
                prop: 'width',
                value: blocThumbValue + 'rem'
            });
        }
        r.append(blocThumb);
    };

    var makeColumns = function () {
        var columns = postcss.rule({ selector: '.columns' });
        columns.append({ prop: 'column-gap', value: opts.gutter + 'rem' });
        r.append(columns);
    };

    var makeBlocsQuery = function (a, media) {

        var blocWidth = {},
            blocWidthValue, idx;

        for (idx = 1; idx <= a; idx++) {
            blocWidth[idx] = postcss.rule();
            blocWidthValue = opts.width * idx - opts.gutter;
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

        for (var b = 1; b <= a; b++) {
            for (var col = 1; col <= opts.max; col++) {
                var i1 = false;
                if (col >= a) {
                    i1 = a;
                } else if (a === b) {
                    i1 = col;
                }
                if (i1) {
                    blocWidth[i1].selector = blocWidth[i1].selector ?
                        blocWidth[i1].selector + ', .bloc-' + b + '-' + col :
                        '.bloc-' + b + '-' + col;
                }

                if (col > 1 && col < opts.max) {
                    for (var off = 1; off <= opts.max - col; off++) {
                        var i2 = false;
                        if (col + off <= a && a === b) {
                            i2 = col;
                        } else if (col + off >= a && a - off >= 1) {
                            i2 = a - off;
                        } else if (a === b) {
                            i2 = 1;
                        }
                        if (i2) {
                            blocWidth[i2].selector = blocWidth[i2].selector ?
                                blocWidth[i2].selector +
                                ', .bloc-' + b + '-' + col + '-' + off :
                                '.bloc-' + b + '-' + col + '-' + off;
                        }
                    }
                }
            }
        }
        for (idx = 1; idx <= a; idx++) {
            if (blocWidth[idx].selector) {
                media.append(blocWidth[idx]);
            }
        }
    };

    var makeBlocsFloatQuery = function (a, media) {

        if (opts.display === 'float') {
            var blocFloat = postcss.rule();
            blocFloat.append({ prop: 'float', value: 'left' });
            blocFloat.append({ prop: 'clear', value: 'none' });
            for (var col = opts.max; col > 0; col--) {
                blocFloat.selector = blocFloat.selector ?
                    blocFloat.selector + ', .bloc-' + a + '-' + col :
                    '.bloc-' + a + '-' + col;

                if (col > 1 && col < opts.max) {
                    for (var off = 1; off <= opts.max - col; off++) {
                        blocFloat.selector = blocFloat.selector +
                            ', .bloc-' + a + '-' + col + '-' + off;
                    }
                }
            }
            media.append(blocFloat);
        }

        var show = postcss.rule({ selector: '.show-' + a });
        show.append({ prop: 'display', value: 'block !important' });
        show.append({ prop: 'visibility', value: 'visible !important' });
        media.append(show);

        var floatRight = postcss.rule({ selector: '.right-' + a });
        if (opts.display === 'flex') {
            floatRight.append({ prop: 'margin-left', value: 'auto' });
        } else if (opts.display === 'float') {
            floatRight.append({ prop: 'float', value: 'right' });
        }
        media.append(floatRight);
    };

    var makeColumnsQuery = function (a, media) {

        var columnCount = {},
            idx;

        for (idx = 1; idx <= a; idx++) {
            columnCount[idx] = postcss.rule();
            columnCount[idx].append({
                prop: 'column-count',
                value: idx.toString()
            });
        }

        for (var b = 1; b <= a; b++) {
            for (var col = 1; col <= opts.max; col++) {
                var i1 = false;
                if (col >= a) {
                    i1 = a;
                } else if (a === b) {
                    i1 = col;
                }
                if (i1) {
                    columnCount[i1].selector = columnCount[i1].selector ?
                        columnCount[i1].selector +
                        ', .columns-' + b + '-' + col :
                        '.columns-' + b + '-' + col;
                }

                if (col > 1 && col < opts.max) {
                    for (var off = 1; off <= opts.max - col; off++) {
                        var i2 = false;
                        if (col + off <= a && a === b) {
                            i2 = col;
                        } else if (col + off >= a && a - off >= 1) {
                            i2 = a - off;
                        } else if (a === b) {
                            i2 = 1;
                        }
                        if (i2) {
                            columnCount[i2].selector =
                                columnCount[i2].selector ?
                                columnCount[i2].selector +
                                ', .columns-' + b + '-' + col + '-' + off :
                                '.columns-' + b + '-' + col + '-' + off;
                        }
                    }
                }
            }
        }
        for (idx = 1; idx <= a; idx++) {
            if (columnCount[idx].selector) {
                media.append(columnCount[idx]);
            }
        }
    };

    return function (css) {
        css.walkAtRules('structure', function (rule) {
            rule.each(function (decl) {
                if (decl.prop in opts) {
                    opts[decl.prop] = isNaN(decl.value) ?
                        decl.value.substring(1, decl.value.length - 1) :
                        Number(decl.value);
                }
            });

            var container = postcss.rule({ selector: '.container' });
            container.append({
                prop: 'padding-left',
                value: opts.padding + 'rem'
            });
            container.append({
                prop: 'padding-right',
                value: opts.padding + 'rem'
            });
            if (opts.align === 'center') {
                container.append({ prop: 'margin-left', value: 'auto' });
                container.append({ prop: 'margin-right', value: 'auto' });
            }
            r.append(container);

            if (opts.blocs) {
                makeBlocs();
            }

            if (opts.columns) {
                makeColumns();
            }

            for (var a = opts.min; a <= opts.max; a++) {
                var containerWidth = a * opts.width - opts.gutter +
                    2 * opts.padding;
                var totalWidth = a * opts.width - opts.gutter +
                    4 * opts.padding;
                var mediaQuery = postcss.atRule({
                    name: 'media',
                    params: '(width > ' + totalWidth + 'rem)'
                });

                var containerQuery = postcss.rule({ selector: '.container' });
                containerQuery.append({
                    prop: 'width',
                    value: containerWidth + 'rem'
                });
                mediaQuery.append(containerQuery);

                if (opts.blocs) {
                    makeBlocsFloatQuery(a, mediaQuery);
                    makeBlocsQuery(a, mediaQuery);
                }

                if (opts.columns) {
                    makeColumnsQuery(a, mediaQuery);
                }

                r.append(mediaQuery);
            }

            rule.replaceWith(r);
        });
    };
});

/*
size
-------------------------------
xxs:     1
xs:      2
s:       3
m:       4
l:       5
xl:      6
xxl:     7
xxxl:    8

*/

/*
            bloc-col
-------------------------------
width       1              2                3                4             5
-----------------------------------------------------------------------------
a = 1
b = 1       1 to 7 /a      -                -                -             -

a = 2
b = 1       (1)            2 to 7 /a        -                -             -
b = 2       1 /b           2 to 7 /a        -                -             -

a = 3
b = 1       (1)            (2)              3 to 7 /a        -             -
b = 2       (1)            (2)              3 to 7 /a        -             -
b = 3       1 /b           2 /b             3 to 7 /a        -             -

a = 4
b = 1       (1)            (2)              (3)              4 to 7 /a     -
b = 2       (1)            (2)              (3)              4 to 7 /a     -
b = 3       (1)            (2)              (3)              4 to 7 /a     -
b = 4       1 /b           2 /b             3 /b             4 to 7 /a     -

etc.
*/

/*
            bloc-col-off
------------------------------
width       1              2                3                4             5
-----------------------------------------------------------------------------
a = 1
            2-1 > 2-6      -                -                -             -
            3-1 > 3-5      -                -                -             -
            4-1 > 4-4      -                -                -             -
            5-1 > 5-3      -                -                -             -
            etc.

a = 2
            (2-1 > 2-6)    -                -                -             -
            (3-1 > 3-5)    -                -                -             -
            (4-1 > 4-4)    -                -                -             -
            (5-1 > 5-3)    -                -                -             -
            etc.

a = 3
            (2-2 > 2-6)    2-1              -                -             -
            (3-2 > 3-5)    3-1              -                -             -
            (4-2 > 4-4)    4-1              -                -             -
            (5-2 > 5-3)    5-1              -                -             -
            (6-2)          6-1              -                -             -
            -              7-1              -                -             -

a = 4
            (2-3 > 2-6)    2-2 (2-1)        -                -             -
            (3-3 > 3-5)    3-2              3-1              -             -
            (4-3 > 4-4)    4-2              4-1              -             -
            (5-3)          5-2              5-1              -             -
            -              6-2              6-1              -             -
            -              -                7-1              -             -

a = 5
            (2-4 > 2-6)    2-3 (2-1 > 2-2)  -                -             -
            (3-4 > 3-5)    3-3              3-2 (3-1)        -             -
            (4-4)          4-3              4-2              4-1           -
            -              5-3              5-2              5-1           -
            -              -                6-2              6-1           -
            -              -                -                7-1

a = 6
            (2-5 > 2-6)    2-4 (2-1 > 2-3)  -                -             -
            (3-5)          3-4              3-3 (3-2 > 3-1)  -             -
            -              4-4              4-3              4-2 (4-1)     -
            -              5-4              5-3              5-2           5-1
            -              -                -                6-2           6-1
            -              -                -                -             7-1

etc.
*/
