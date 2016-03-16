var postcss = require('postcss');
var blocs = require('./lib/blocs.js');
var blocsSub = require('./lib/blocs-sub.js');
var columns = require('./lib/columns.js');
var blocsQuery = require('./lib/blocs-query.js');
var blocsFloatQuery = require('./lib/blocs-float-query.js');
var columnsQuery = require('./lib/columns-query.js');

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
    var rootCss = postcss.root();

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
            rootCss.append(container);

            if (opts.blocs) {
                blocs(opts, rootCss);
                blocsSub(opts, rootCss);
            }

            if (opts.columns) {
                columns(opts, rootCss);
            }

            for (var breakPoint = opts.min; breakPoint <= opts.max;
                 breakPoint++) {
                var queryWidth = breakPoint * opts.width - opts.gutter +
                    4 * opts.padding;
                var mediaQuery = postcss.atRule({
                    name: 'media',
                    params: '(width > ' + queryWidth + 'rem)'
                });

                var containerQuery = postcss.rule({ selector: '.container' });
                var containerWidth = breakPoint * opts.width - opts.gutter +
                    2 * opts.padding;
                containerQuery.append({
                    prop: 'width',
                    value: containerWidth + 'rem'
                });
                mediaQuery.append(containerQuery);

                if (opts.blocs) {
                    blocsFloatQuery(opts, breakPoint, mediaQuery);
                    blocsQuery(opts, breakPoint, mediaQuery);
                }

                if (opts.columns) {
                    columnsQuery(opts, breakPoint, mediaQuery);
                }

                rootCss.append(mediaQuery);
            }

            rule.replaceWith(rootCss);
        });
    };
});

/*
            bloc-size-col
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
            bloc-size-col-off
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
