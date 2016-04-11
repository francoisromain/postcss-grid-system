import postcss from 'postcss';
import structure from './structure';
import utils from './utils';

module.exports = postcss.plugin('postcss-structure', () => {
  const opts = {
    unit: 18,
    gutter: 1.5,
    padding: 1.5,
    max: 8,
    min: 2,
    align: 'center',
    display: 'flex',
  };

  const e = {
    containers: [],
    rows: [],
    blocs: [],
    fractions: [],
    blobs: [],
    columns: [],
    rights: [],
    shows: [],
  };

  const rootCss = postcss.root();

  return (css) => {
    css.walkAtRules('structure', (rule) => {
      rule.each((decl) => {
        if (decl.prop in opts) {
          opts[decl.prop] = isNaN(decl.value) ?
            decl.value.substring(1, decl.value.length - 1) :
            Number(decl.value);
        }
      });

      css.walkDecls((decl) => {
        if (decl.prop.match(/^structure-element/)) {
          if (decl.value === 'container') {
            e.containers.push(decl.parent.selector);
            utils.declClean(decl);
          } else if (decl.value === 'row') {
            e.rows.push(decl.parent.selector);
            utils.declClean(decl);
          }
        } else if (decl.prop.match(/^structure-bloc/)) {
          const i = decl.value.split('-');

          i[2] = i[2] || '0';
          e.blocs[i[0]] = e.blocs[i[0]] || [];
          e.blocs[i[0]][i[1]] = e.blocs[i[0]][i[1]] || [];
          e.blocs[i[0]][i[1]][i[2]] = e.blocs[i[0]][i[1]][i[2]] || [];
          e.blocs[i[0]][i[1]][i[2]].push(decl.parent.selector);

          utils.declClean(decl);
        } else if (decl.prop.match(/^structure-fraction/)) {
          const i = decl.value.split('/');

          e.fractions[i[1]] = e.fractions[i[1]] || [];
          e.fractions[i[1]][i[0]] = e.fractions[i[1]][i[0]] || [];
          e.fractions[i[1]][i[0]].push(decl.parent.selector);

          utils.declClean(decl);
        } else if (decl.prop.match(/^structure-blob/)) {
          const i = decl.value.replace('/', '-').split('-');

          e.blobs[i[0]] = e.blobs[i[0]] || [];
          e.blobs[i[0]][i[2]] = e.blobs[i[0]][i[2]] || [];
          e.blobs[i[0]][i[2]][i[1]] = e.blobs[i[0]][i[2]][i[1]] || [];
          e.blobs[i[0]][i[2]][i[1]].push(decl.parent.selector);

          utils.declClean(decl);
        } else if (decl.prop.match(/^structure-columns/)) {
          const i = decl.value.split('-');

          i[2] = i[2] || '0';
          e.columns[i[0]] = e.columns[i[0]] || [];
          e.columns[i[0]][i[1]] = e.columns[i[0]][i[1]] || [];
          e.columns[i[0]][i[1]][i[2]] = e.columns[i[0]][i[1]][i[2]] || [];
          e.columns[i[0]][i[1]][i[2]].push(decl.parent.selector);

          utils.declClean(decl);
        } else if (decl.prop.match(/^structure-show/)) {
          e.shows[decl.value] = e.shows[decl.value] || [];
          e.shows[decl.value].push(decl.parent.selector);

          utils.declClean(decl);
        } else if (decl.prop.match(/^structure-right/)) {
          e.rights[decl.value] = e.rights[decl.value] || [];
          e.rights[decl.value].push(decl.parent.selector);

          utils.declClean(decl);
        }
      });

      structure(opts, rootCss, e);
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
