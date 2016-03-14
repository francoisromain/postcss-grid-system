var postcss = require('postcss');

module.exports = postcss.plugin('postcss-structure', function (options) {
    options = options || {};
    var opts = {
        width: 18.75,
        gutter: 1.5,
        padding: 1.5,
        max: 8,
        min: 2,
        thumb: 3,
        align: 'center',
        type: 'float'
    };
    var r = postcss.root();

    var createGrid = function (a, b, blocWidth, columnCount) {
        for (var col = 1; col <= b; col++) {
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
                columnCount[i1].selector = columnCount[i1].selector ?
                    columnCount[i1].selector + ', .columns-' + b + '-' + col :
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
                        blocWidth[i2].selector = blocWidth[i2].selector ?
                            blocWidth[i2].selector +
                            ', .bloc-' + b + '-' + col + '-' + off :
                            '.bloc-' + b + '-' + col + '-' + off;
                        columnCount[i2].selector = columnCount[i2].selector ?
                            columnCount[i2].selector +
                            ', .columns-' + b + '-' + col + '-' + off :
                            '.columns-' + b + '-' + col + '-' + off;
                    }
                }
            }
        }
    };

    var createMediaQuerie = function (a, cssRoot) {
        var b, col, off, idx;
        var containerWidth = a * opts.width - opts.gutter + 2 * opts.padding;
        var totalWidth = a * opts.width - opts.gutter + 4 * opts.padding;
        var media = postcss.atRule({
            name: 'media',
            params: '(width > ' + totalWidth + 'rem)'
        });

        var container = postcss.rule({ selector: '.container' });
        container.append({ prop: 'width', value: containerWidth + 'rem' });
        media.append(container);

        var show = postcss.rule({ selector: '.show-' + a });
        show.append({ prop: 'display', value: 'block !important' });
        show.append({ prop: 'visibility', value: 'visible !important' });
        media.append(show);

        var floatRight = postcss.rule({ selector: '.right-' + a });
        floatRight.append({ prop: 'float', value: 'right' });
        media.append(floatRight);

        var blocFloat = postcss.rule();
        blocFloat.append({ prop: 'float', value: 'left' });
        blocFloat.append({ prop: 'clear', value: 'none' });
        for (col = a; col > 0; col--) {
            blocFloat.selector = blocFloat.selector ?
                blocFloat.selector + ', .bloc-' + a + '-' + col :
                    '.bloc-' + a + '-' + col;

            if (col > 1 && col < opts.max) {
                for (off = 1; off <= opts.max - col; off++) {
                    blocFloat.selector = blocFloat.selector +
                        ', .bloc-' + a + '-' + col + '-' + off;
                }
            }
        }
        media.append(blocFloat);

        var blocWidth = {},
            columnCount = {},
            blocWidthValue;
        for (idx = 1; idx <= a; idx++) {
            blocWidth[idx] = postcss.rule();
            blocWidthValue = opts.width * idx - opts.gutter;
            blocWidth[idx].append({
                prop: 'width',
                value: blocWidthValue + 'rem'
            });
            columnCount[idx] = postcss.rule();
            columnCount[idx].append({
                prop: 'column-count',
                value: idx.toString()
            });
        }

        for (b = 1; b <= a; b++) {
            createGrid(a, b, blocWidth, columnCount);
        }
        for (idx = 1; idx <= a; idx++) {
            if (blocWidth[idx].selector) {
                media.append(blocWidth[idx]);
                media.append(columnCount[idx]);
            }
        }

        cssRoot.append(media);
    };

    return function (css) {
        css.walkAtRules('structure', function (rule) {
            var thumbQty = 1;

            rule.each(function (decl) {
                if (decl.prop in opts) {
                    opts[decl.prop] = parseFloat(decl.value) ?
                        parseFloat(decl.value) :
                        decl.value;
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
            container.append({ prop: 'margin-left', value: 'auto' });
            container.append({ prop: 'margin-right', value: 'auto' });
            r.append(container);

            var grid = postcss.rule({ selector: '.grid' });
            grid.append({ prop: 'clear', value: 'both' });
            grid.append({
                prop: 'margin-right',
                value: '-' + opts.gutter + 'rem'
            });
            r.append(grid);

            var gridAfter = postcss.rule({ selector: '.grid:after' });
            gridAfter.append({ prop: 'content', value: '""' });
            gridAfter.append({ prop: 'display', value: 'table' });
            gridAfter.append({ prop: 'clear', value: 'both' });
            r.append(gridAfter);

            var bloc = postcss.rule({ selector: '.bloc' });
            bloc.append({ prop: 'margin-right', value: opts.gutter + 'rem' });
            bloc.append({ prop: 'margin-bottom', value: opts.gutter + 'rem' });
            bloc.append({ prop: 'clear', value: 'both' });
            r.append(bloc);

            var blocLeft = postcss.rule({ selector: '.bloc-left' });
            blocLeft.append({ prop: 'float', value: 'left' });
            blocLeft.append({ prop: 'clear', value: 'none' });
            r.append(blocLeft);

            blocLeft.selector +=
            ', .bloc-1/2, .bloc-1/3, .bloc-2/3, .bloc-thumb';

            var blocOneHalf = postcss.rule({ selector: '.bloc-1/2' });
            var blocOneHalfValue = opts.width / 2 - opts.gutter;
            blocOneHalf.append({
                prop: 'width',
                value: blocOneHalfValue + 'rem'
            });
            r.append(blocOneHalf);

            var blocOneThird = postcss.rule({ selector: '.bloc-1/3' });
            var blocOneThirdValue = opts.width / 3 - opts.gutter;
            blocOneThird.append({
                prop: 'width',
                value: blocOneThirdValue + 'rem'
            });
            r.append(blocOneThird);

            var blocTwoThird = postcss.rule({ selector: '.bloc-2/3' });
            var blocTwoThirdValue = opts.width * 2 / 3 - opts.gutter;
            blocTwoThird.append({
                prop: 'width',
                value: blocTwoThirdValue + 'rem'
            });
            r.append(blocTwoThird);

            var blocThumb = postcss.rule({ selector: '.bloc-thumb' });
            while (opts.width / thumbQty - opts.gutter > opts.width) {
                thumbQty++;
            }
            var blocThumbValue = opts.width / (thumbQty - 1) - opts.gutter;
            blocThumb.append({ prop: 'width', value: blocThumbValue + 'rem' });
            r.append(blocThumb);

            var columns = postcss.rule({ selector: '.columns' });
            columns.append({ prop: 'column-gap', value: opts.gutter + 'rem' });
            r.append(columns);

            for (var a = opts.min; a <= opts.max; a++) {
                createMediaQuerie(opts, a, r);
            }

            rule.replaceWith(r);
        });
    };
});

/*
size:    bloc
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
bloc = 1
   xxs      1 to 7 /a      -                -                -             -

bloc = 2
  xxs       (1)            2 to 7 /a        -                -             -
  xs        1 /b           2 to 7 /a        -                -             -

bloc = 3
  xxs       (1)            (2)              3 to 7 /a        -             -
  xs        (1)            (2)              3 to 7 /a        -             -
  s         1 /b           2 /b             3 to 7 /a        -             -

bloc = 4
 xxs        (1)            (2)              (3)              4 to 7 /a     -
 xs         (1)            (2)              (3)              4 to 7 /a     -
 s          (1)            (2)              (3)              4 to 7 /a     -
 m          1 /b           2 /b             3 /b             4 to 7 /a     -

etc.
*/

/*
            bloc-col-off
------------------------------
width       1              2                3                4             5
-----------------------------------------------------------------------------
bloc = 1
            2-1 > 2-6      -                -                -             -
            3-1 > 3-5      -                -                -             -
            4-1 > 4-4      -                -                -             -
            5-1 > 5-3      -                -                -             -
            etc.

bloc = 2
            (2-1 > 2-6)    -                -                -             -
            (3-1 > 3-5)    -                -                -             -
            (4-1 > 4-4)    -                -                -             -
            (5-1 > 5-3)    -                -                -             -
            etc.

bloc = 3
            (2-2 > 2-6)    2-1              -                -             -
            (3-2 > 3-5)    3-1              -                -             -
            (4-2 > 4-4)    4-1              -                -             -
            (5-2 > 5-3)    5-1              -                -             -
            (6-2)          6-1              -                -             -
            -              7-1              -                -             -

bloc = 4
            (2-3 > 2-6)    2-2 (2-1)        -                -             -
            (3-3 > 3-5)    3-2              3-1              -             -
            (4-3 > 4-4)    4-2              4-1              -             -
            (5-3)          5-2              5-1              -             -
            -              6-2              6-1              -             -
            -              -                7-1              -             -

bloc = 5
            (2-4 > 2-6)    2-3 (2-1 > 2-2)  -                -             -
            (3-4 > 3-5)    3-3              3-2 (3-1)        -             -
            (4-4)          4-3              4-2              4-1           -
            -              5-3              5-2              5-1           -
            -              -                6-2              6-1           -
            -              -                -                7-1

bloc = 6
            (2-5 > 2-6)    2-4 (2-1 > 2-3)  -                -             -
            (3-5)          3-4              3-3 (3-2 > 3-1)  -             -
            -              4-4              4-3              4-2 (4-1)     -
            -              5-4              5-3              5-2           5-1
            -              -                -                6-2           6-1
            -              -                -                -             7-1

etc.
*/
