var postcss = require('postcss');
var structure = require('./lib/structure.js');

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
        blocs: 1,
        blobs: 1,
        right: 1,
        show: 1
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

            structure(opts, rootCss);

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
b = 1       1 to 7         -                -                -             -

a = 2
b = 1       (1)            2 to 7           -                -             -
b = 2       1              2 to 7           -                -             -

a = 3
b = 1       (1)            (2)              3 to 7           -             -
b = 2       (1)            (2)              3 to 7           -             -
b = 3       1              2                3 to 7           -             -

a = 4
b = 1       (1)            (2)              (3)              4 to 7        -
b = 2       (1)            (2)              (3)              4 to 7        -
b = 3       (1)            (2)              (3)              4 to 7        -
b = 4       1              2                3                4 to 7        -

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
