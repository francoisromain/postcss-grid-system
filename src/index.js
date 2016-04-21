import postcss from 'postcss';
import grid from './sstm-grid';
import utils from './utils';
// import util from 'util';

module.exports = postcss.plugin('css-system-grid', () => {
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
    columns: [],
    rules: [],
  };

  const rootCss = postcss.root();

  const walkDecls = function(node, breakpoint) {
    node.walkDecls((decl) => {

      if (decl.prop.match(/^sstm-grid/)) {
        const value = decl.value.split(' ');
        if (value[0] === 'container') {
          e.containers[breakpoint] = e.containers[breakpoint] || [];
          e.containers[breakpoint].push(decl.parent.selector);

          utils.nodeClean(decl, true);
        } else if (value[0] === 'row') {
          e.rows[breakpoint] = e.rows[breakpoint] || [];
          e.rows[breakpoint].push(decl.parent.selector);

          utils.nodeClean(decl, true);
        } else if (value[0] === 'bloc') {
          const i = value[1].split('-');

          i[1] = i[1] || '0';
          e.blocs[breakpoint] = e.blocs[breakpoint] || [];
          e.blocs[breakpoint][i[0]] = e.blocs[breakpoint][i[0]] || [];
          e.blocs[breakpoint][i[0]][i[1]] = e.blocs[breakpoint][i[0]][i[1]] || [];
          e.blocs[breakpoint][i[0]][i[1]].push(decl.parent.selector);

          utils.nodeClean(decl, true);
        } else if (value[0] === 'fraction') {
          const i = value[1].split('/');

          e.fractions[breakpoint] = e.fractions[breakpoint] || [];
          e.fractions[breakpoint][i[1]] = e.fractions[breakpoint][i[1]] || [];
          e.fractions[breakpoint][i[1]][i[0]] = e.fractions[breakpoint][i[1]][i[0]] || [];
          e.fractions[breakpoint][i[1]][i[0]].push(decl.parent.selector);

          utils.nodeClean(decl, true);
        } else if (value[0] === 'columns') {
          const i = value[1].split('-');

          i[1] = i[1] || '0';
          e.columns[breakpoint] = e.columns[breakpoint] || [];
          e.columns[breakpoint][i[0]] = e.columns[breakpoint][i[0]] || [];
          e.columns[breakpoint][i[0]][i[1]] = e.columns[breakpoint][i[0]][i[1]] || [];
          e.columns[breakpoint][i[0]][i[1]].push(decl.parent.selector);

          utils.nodeClean(decl, true);
        }
      }
    });
  }

  return (css) => {
    css.walkAtRules('sstm-grid', (gridAtRule) => {
      gridAtRule.walkDecls((decl) => {
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

      css.walkAtRules('sstm-grid-media', (gridMediaAtRule) => {
        walkDecls(gridMediaAtRule, gridMediaAtRule.params);
        gridMediaAtRule.each((rule) => {
          e.rules[gridMediaAtRule.params] = e.rules[gridMediaAtRule.params] || [];
          e.rules[gridMediaAtRule.params].push(rule);

          utils.nodeClean(rule, true);
        });

        utils.nodeClean(gridMediaAtRule);
      });

      walkDecls(css, 0);

      // console.log(util.inspect(e.containers, false, null));
      grid(e, rootCss, opts);
      gridAtRule.replaceWith(rootCss);
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
