import postcss from 'postcss';
import containers from './containers';
import rows from './rows';
import blocs from './blocs';
import fractions from './fractions';
import columns from './columns';
import containersQuery from './containers-query';
import blocsQuery from './blocs-query';
import fractionsQuery from './fractions-query';
import blocsFloatQuery from './blocs-float-query';
import columnsQuery from './columns-query';
import rulesQuery from './rules-query';

export default (e, rootCss, opts) => {
  const scrollbarsWidth = 1;

  containers(e.containers, rootCss, opts);
  rows(e.rows, rootCss, opts);
  blocs(e.blocs, rootCss, opts);
  fractions(e.fractions, rootCss, opts);
  columns(e.columns, rootCss, opts);

  blocsFloatQuery(e.blocs[0], rootCss, opts);
  blocsQuery(e.blocs, rootCss, opts, 0);
  fractionsQuery(e.fractions[0], rootCss, opts);
  columnsQuery(e.columns, rootCss, opts, 0);
  rulesQuery(e.rules[0], rootCss);

  for (let breakpoint = opts.min; breakpoint <= opts.max; breakpoint++) {
    const queryWidth = breakpoint * opts.width - opts.gutter + 2 * opts.padding + scrollbarsWidth;
    const mediaQuery = postcss.atRule({ name: 'media', params: `(min-width: ${queryWidth}rem)` });

    containersQuery(e.containers, mediaQuery, opts, breakpoint);
    blocsFloatQuery(e.blocs[breakpoint], mediaQuery, opts);
    blocsQuery(e.blocs, mediaQuery, opts, breakpoint);
    fractionsQuery(e.fractions[breakpoint], mediaQuery, opts);
    columnsQuery(e.columns, mediaQuery, opts, breakpoint);
    rulesQuery(e.rules[breakpoint], mediaQuery);

    rootCss.append(mediaQuery);
  }
};
