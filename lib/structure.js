var postcss = require('postcss');
var containers = require('./containers.js');
var rows = require('./rows.js');
var blocs = require('./blocs.js');
var fractions = require('./fractions.js');
var containersQuery = require('./containers-query.js');
var blocsQuery = require('./blocs-query.js');
var columns = require('./columns.js');
var showsQuery = require('./shows-query.js');
var rightsQuery = require('./rights-query.js');
var blocsFloatQuery = require('./blocs-float-query.js');
var blobsQuery = require('./blobs-query.js');
var blobsFloatQuery = require('./blobs-float-query.js');
var columnsQuery = require('./columns-query.js');

module.exports = function structure(opts, rootCss, e) {
  var scrollbarsWidth = 3;
  var breakpoint;
  var queryWidth;
  var mediaQuery;

  containers(opts, rootCss, e.containers);
  rows(opts, rootCss, e.rows);
  blocs(opts, rootCss, e.blocs);
  fractions(opts, rootCss, e.fractions);
  blocs(opts, rootCss, e.blobs);
  blobsFloatQuery(opts, 0, rootCss, e.blobs);
  blobsQuery(opts, 0, rootCss, e.blobs);
  columns(opts, rootCss, e.columns);

  for (breakpoint = opts.min; breakpoint <= opts.max; breakpoint++) {
    queryWidth = breakpoint * opts.unit - opts.gutter + 2 * opts.padding + scrollbarsWidth;
    mediaQuery = postcss.atRule({ name: 'media', params: '(width > ' + queryWidth + 'rem)' });

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
