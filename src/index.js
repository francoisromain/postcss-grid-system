import postcss from 'postcss';
import structure from './structure';
import utils from './utils';
// import util from 'util';

module.exports = postcss.plugin('postcss-structure', () => {
  const opts = {
    unit: 20.5,
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
    hides: [],
    customStyles: [],
  };

  const rootCss = postcss.root();

  return (css) => {
    let test = 0;
    css.walkAtRules('structure', (structureAtRule) => {
      structureAtRule.walkDecls((decl) => {
        if (decl.prop.match(/^unit/) ||
          decl.prop.match(/^gutter/) ||
          decl.prop.match(/^padding/) ||
          decl.prop.match(/^max/) ||
          decl.prop.match(/^min/)) {
          opts[decl.prop] = parseFloat(decl.value, 10);
        } else if (decl.prop.match(/^align/) || decl.prop.match(/^display/)) {
          opts[decl.prop] = decl.value;
        }
      });

      css.walkAtRules('structure-media', (mediaAtRule) => {
        mediaAtRule.each((rule) => {
          e.customStyles[mediaAtRule.params] = e.customStyles[mediaAtRule.params] || [];
          e.customStyles[mediaAtRule.params].push(rule);

          utils.nodeClean(rule);
        });
      });

      css.walkDecls((decl) => {
        if (decl.prop.match(/^structure/)) {
          const value = decl.value.split(' ');
          if (value[0] === 'container') {
            e.containers.push(decl.parent.selector);

            utils.nodeClean(decl);
          } else if (value[0] === 'row') {
            e.rows.push(decl.parent.selector);

            utils.nodeClean(decl);
          } else if (value[0] === 'bloc') {
            const i = value[1].split('-');

            i[2] = i[2] || '0';
            e.blocs[i[0]] = e.blocs[i[0]] || [];
            e.blocs[i[0]][i[1]] = e.blocs[i[0]][i[1]] || [];
            e.blocs[i[0]][i[1]][i[2]] = e.blocs[i[0]][i[1]][i[2]] || [];
            e.blocs[i[0]][i[1]][i[2]].push(decl.parent.selector);

            utils.nodeClean(decl);
          } else if (value[0] === 'fraction') {
            const i = value[1].split('/');

            e.fractions[i[1]] = e.fractions[i[1]] || [];
            e.fractions[i[1]][i[0]] = e.fractions[i[1]][i[0]] || [];
            e.fractions[i[1]][i[0]].push(decl.parent.selector);

            utils.nodeClean(decl);
          } else if (value[0] === 'blob') {
            const i = value[1].replace('/', '-').split('-');
            e.blobs[i[0]] = e.blobs[i[0]] || [];
            e.blobs[i[0]][i[2]] = e.blobs[i[0]][i[2]] || [];
            e.blobs[i[0]][i[2]][i[1]] = e.blobs[i[0]][i[2]][i[1]] || [];
            e.blobs[i[0]][i[2]][i[1]].push(decl.parent.selector);

            utils.nodeClean(decl);
          } else if (value[0] === 'columns') {
            const i = value[1].split('-');

            i[2] = i[2] || '0';
            e.columns[i[0]] = e.columns[i[0]] || [];
            e.columns[i[0]][i[1]] = e.columns[i[0]][i[1]] || [];
            e.columns[i[0]][i[1]][i[2]] = e.columns[i[0]][i[1]][i[2]] || [];
            e.columns[i[0]][i[1]][i[2]].push(decl.parent.selector);

            utils.nodeClean(decl);
          } else if (value[0] === 'show') {
            e.shows[value[1]] = e.shows[value[1]] || [];
            e.shows[value[1]].push(decl.parent.selector);

            utils.nodeClean(decl);
          } else if (value[0] === 'hide') {
            e.hides[value[1]] = e.hides[value[1]] || [];
            e.hides[value[1]].push(decl.parent.selector);

            utils.nodeClean(decl);
          } else if (value[0] === 'right') {
            e.rights[value[1]] = e.rights[value[1]] || [];
            e.rights[value[1]].push(decl.parent.selector);

            utils.nodeClean(decl);
          }
        }
      });
      // console.log(util.inspect(e.customStyles, false, null));
      structure(opts, rootCss, e);
      structureAtRule.replaceWith(rootCss);
    });
  };
});

/*
bloc-units-width
-------------------------------
size            1              2                3                4             5
-----------------------------------------------------------------------------

breakpoint 1
width 1         1 to 7         -                -                -             -

breakpoint 2
width 1         (1)            2 to 7           -                -             -
width 2         1              2 to 7           -                -             -

breakpoint 3
width 1         (1)            (2)              3 to 7           -             -
width 2         (1)            (2)              3 to 7           -             -
width 3         1              2                3 to 7           -             -

breakpoint = 4
width 1         (1)            (2)              (3)              4 to 7        -
width 2         (1)            (2)              (3)              4 to 7        -
width 3         (1)            (2)              (3)              4 to 7        -
width 4         1              2                3                4 to 7        -

etc.
*/

/*
bloc-units-width-offset
------------------------------
size        1              2                3                4             5
-----------------------------------------------------------------------------

breakpoint 1
            2-1 > 2-6      -                -                -             -
            3-1 > 3-5      -                -                -             -
            4-1 > 4-4      -                -                -             -
            5-1 > 5-3      -                -                -             -
            etc.

breakpoint 2
            (2-1 > 2-6)    -                -                -             -
            (3-1 > 3-5)    -                -                -             -
            (4-1 > 4-4)    -                -                -             -
            (5-1 > 5-3)    -                -                -             -
            etc.

breakpoint 3
            (2-2 > 2-6)    2-1              -                -             -
            (3-2 > 3-5)    3-1              -                -             -
            (4-2 > 4-4)    4-1              -                -             -
            (5-2 > 5-3)    5-1              -                -             -
            (6-2)          6-1              -                -             -
            -              7-1              -                -             -

breakpoint 4
            (2-3 > 2-6)    2-2 (2-1)        -                -             -
            (3-3 > 3-5)    3-2              3-1              -             -
            (4-3 > 4-4)    4-2              4-1              -             -
            (5-3)          5-2              5-1              -             -
            -              6-2              6-1              -             -
            -              -                7-1              -             -

breakpoint 5
            (2-4 > 2-6)    2-3 (2-1 > 2-2)  -                -             -
            (3-4 > 3-5)    3-3              3-2 (3-1)        -             -
            (4-4)          4-3              4-2              4-1           -
            -              5-3              5-2              5-1           -
            -              -                6-2              6-1           -
            -              -                -                7-1

breakpoint 6
            (2-5 > 2-6)    2-4 (2-1 > 2-3)  -                -             -
            (3-5)          3-4              3-3 (3-2 > 3-1)  -             -
            -              4-4              4-3              4-2 (4-1)     -
            -              5-4              5-3              5-2           5-1
            -              -                -                6-2           6-1
            -              -                -                -             7-1

etc.
*/
