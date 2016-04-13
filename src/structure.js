import postcss from 'postcss';
import containers from './containers';
import rows from './rows';
import blocs from './blocs';
import fractions from './fractions';
import containersQuery from './containers-query';
import blocsQuery from './blocs-query';
import columns from './columns';
import showsQuery from './shows-query';
import rightsQuery from './rights-query';
import blocsFloatQuery from './blocs-float-query';
import blobsQuery from './blobs-query';
import blobsFloatQuery from './blobs-float-query';
import columnsQuery from './columns-query';

export default (opts, rootCss, e) => {
  const scrollbarsWidth = 1;

  containers(opts, rootCss, e.containers);
  rows(opts, rootCss, e.rows);
  blocs(opts, rootCss, e.blocs);
  fractions(opts, rootCss, e.fractions);
  blocs(opts, rootCss, e.blobs);
  blobsFloatQuery(opts, 0, rootCss, e.blobs);
  blobsQuery(opts, 0, rootCss, e.blobs);
  columns(opts, rootCss, e.columns);

  for (let breakpoint = opts.min; breakpoint <= opts.max; breakpoint++) {
    const queryWidth = breakpoint * opts.unit - opts.gutter + 2 * opts.padding + scrollbarsWidth;
    const mediaQuery = postcss.atRule({ name: 'media', params: `(min-width: ${queryWidth}rem)` });

    containersQuery(opts, breakpoint, mediaQuery, e.containers);
    blocsFloatQuery(opts, breakpoint, mediaQuery, e.blocs);
    blocsQuery(opts, breakpoint, mediaQuery, e.blocs);
    blobsFloatQuery(opts, breakpoint, mediaQuery, e.blobs);
    blobsQuery(opts, breakpoint, mediaQuery, e.blobs);
    showsQuery(breakpoint, mediaQuery, e.shows);
    rightsQuery(opts, breakpoint, mediaQuery, e.rights);
    columnsQuery(opts, breakpoint, mediaQuery, e.columns);
    rootCss.append(mediaQuery);
  }
};
