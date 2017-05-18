import postcss from 'postcss';
import containers from './containers';
import rows from './rows';
import blocs from './blocs';
import fractions from './fractions';
import columns from './columns';
import containersQuery from './containers-query';
import blocsQuery from './blocs-query';
import fractionsQuery from './fractions-query';
import columnsQuery from './columns-query';
import rulesQuery from './rules-query';
// import util from 'util'

export default (e, rootCss, opts) => {
  containers(e.containers, rootCss, opts);
  rows(e.rows, rootCss, opts);
  blocs(e.blocs, rootCss, opts);
  fractions(e.fractions, rootCss, opts);
  columns(e.columns, rootCss, opts);

  fractionsQuery(e.fractions[0], rootCss, opts);
  columnsQuery(e.columns, rootCss, opts, 0);
  rulesQuery(e.rules[0], rootCss);

  for (let breakpoint = 1; breakpoint <= opts.max; breakpoint += 1) {
    const queryWidth = ((breakpoint * opts.width) - opts.gutter) + (2 * opts.padding);
    const mediaQuery = postcss.atRule({ name: 'media', params: `(min-width: ${queryWidth}rem)` });

    blocsQuery(e.blocs, mediaQuery, opts, breakpoint);

    if (breakpoint >= opts.min) {
      containersQuery(e.containers, mediaQuery, opts, breakpoint);
      fractionsQuery(e.fractions[breakpoint], mediaQuery, opts);
      columnsQuery(e.columns, mediaQuery, opts, breakpoint);
      rulesQuery(e.rules[breakpoint], mediaQuery);
    }

    if (mediaQuery.nodes && mediaQuery.nodes.length) {
      // console.log('booo', util.inspect(mediaQuery.nodes.length, false, null))
      rootCss.append(mediaQuery);
    }
  }
};
