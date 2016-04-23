import postcss from 'postcss';
import gridSystem from './grid-system';
import utils from './utils';
// import util from 'util';

module.exports = postcss.plugin('postcss-grid-system', () => {
  const opts = {
    width: 20.5,
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

  const walkDecls = function walkDecls(node, breakpoint) {
    node.walkDecls((decl) => {
      if (decl.prop.match(/^gs/)) {
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
  };

  return (css) => {
    css.walkAtRules('gs', (gsAtRule) => {
      gsAtRule.walkDecls((decl) => {
        if (decl.prop.match(/^width/) ||
          decl.prop.match(/^gutter/) ||
          decl.prop.match(/^padding/) ||
          decl.prop.match(/^max/) ||
          decl.prop.match(/^min/)) {
          opts[decl.prop] = parseFloat(decl.value, 10);
        } else if (decl.prop.match(/^align/) || decl.prop.match(/^display/)) {
          opts[decl.prop] = decl.value;
        }
      });

      css.walkAtRules('gs-media', (gridMediaAtRule) => {
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
      gridSystem(e, rootCss, opts);
      gsAtRule.replaceWith(rootCss);
    });
  };
});
