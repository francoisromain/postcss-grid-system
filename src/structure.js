import postcss from 'postcss';
import containers from './containers';
import rows from './rows';
import blocs from './blocs';
import fractions from './fractions';
import containersQuery from './containers-query';
import blocsQuery from './blocs-query';
import columns from './columns';
import showsQuery from './shows-query';
import hidesQuery from './hides-query';
import rightsQuery from './rights-query';
import blocsFloatQuery from './blocs-float-query';
import blobsQuery from './blobs-query';
import blobsFloatQuery from './blobs-float-query';
import columnsQuery from './columns-query';
import customStyles from './custom-styles';

export default (opts, rootCss, e) => {
  const scrollbarsWidth = 1;

  containers(e.containers, rootCss, opts);
  rows(e.rows, rootCss, opts);
  blocs(e.blocs, rootCss, opts);
  fractions(e.fractions, rootCss, opts);
  blocs(e.blobs, rootCss, opts);
  blobsFloatQuery(e.blobs, rootCss, opts, 0);
  blobsQuery(e.blobs, rootCss, opts, 0);
  columns(e.columns, rootCss, opts);
  customStyles(e.customStyles, rootCss, 0);

  for (let breakpoint = opts.min; breakpoint <= opts.max; breakpoint++) {
    const queryWidth = breakpoint * opts.unit - opts.gutter + 2 * opts.padding + scrollbarsWidth;
    const mediaQuery = postcss.atRule({ name: 'media', params: `(min-width: ${queryWidth}rem)` });

    containersQuery(e.containers, mediaQuery, opts, breakpoint);
    blocsFloatQuery(e.blocs, mediaQuery, opts, breakpoint);
    blocsQuery(e.blocs, mediaQuery, opts, breakpoint);
    blobsFloatQuery(e.blobs, mediaQuery, opts, breakpoint);
    blobsQuery(e.blobs, mediaQuery, opts, breakpoint);
    showsQuery(e.shows, mediaQuery, breakpoint);
    hidesQuery(e.hides, mediaQuery, breakpoint);
    rightsQuery(e.rights, mediaQuery, opts, breakpoint);
    columnsQuery(e.columns, mediaQuery, opts, breakpoint);
    customStyles(e.customStyles, mediaQuery, breakpoint);

    rootCss.append(mediaQuery);
  }
};
