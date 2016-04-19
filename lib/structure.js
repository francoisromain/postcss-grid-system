'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _containers = require('./containers');

var _containers2 = _interopRequireDefault(_containers);

var _rows = require('./rows');

var _rows2 = _interopRequireDefault(_rows);

var _blocs = require('./blocs');

var _blocs2 = _interopRequireDefault(_blocs);

var _fractions = require('./fractions');

var _fractions2 = _interopRequireDefault(_fractions);

var _containersQuery = require('./containers-query');

var _containersQuery2 = _interopRequireDefault(_containersQuery);

var _blocsQuery = require('./blocs-query');

var _blocsQuery2 = _interopRequireDefault(_blocsQuery);

var _columns = require('./columns');

var _columns2 = _interopRequireDefault(_columns);

var _showsQuery = require('./shows-query');

var _showsQuery2 = _interopRequireDefault(_showsQuery);

var _hidesQuery = require('./hides-query');

var _hidesQuery2 = _interopRequireDefault(_hidesQuery);

var _rightsQuery = require('./rights-query');

var _rightsQuery2 = _interopRequireDefault(_rightsQuery);

var _blocsFloatQuery = require('./blocs-float-query');

var _blocsFloatQuery2 = _interopRequireDefault(_blocsFloatQuery);

var _blobsQuery = require('./blobs-query');

var _blobsQuery2 = _interopRequireDefault(_blobsQuery);

var _blobsFloatQuery = require('./blobs-float-query');

var _blobsFloatQuery2 = _interopRequireDefault(_blobsFloatQuery);

var _columnsQuery = require('./columns-query');

var _columnsQuery2 = _interopRequireDefault(_columnsQuery);

var _customStyles = require('./custom-styles');

var _customStyles2 = _interopRequireDefault(_customStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (opts, rootCss, e) {
  var scrollbarsWidth = 1;

  (0, _containers2.default)(e.containers, rootCss, opts);
  (0, _rows2.default)(e.rows, rootCss, opts);
  (0, _blocs2.default)(e.blocs, rootCss, opts);
  (0, _fractions2.default)(e.fractions, rootCss, opts);
  (0, _blocs2.default)(e.blobs, rootCss, opts);
  (0, _blobsFloatQuery2.default)(e.blobs[0], rootCss, opts);
  (0, _blobsQuery2.default)(e.blobs[0], rootCss, opts);
  (0, _columns2.default)(e.columns, rootCss, opts);
  (0, _customStyles2.default)(e.customStyles[0], rootCss);

  for (var breakpoint = opts.min; breakpoint <= opts.max; breakpoint++) {
    var queryWidth = breakpoint * opts.unit - opts.gutter + 2 * opts.padding + scrollbarsWidth;
    var mediaQuery = _postcss2.default.atRule({ name: 'media', params: '(min-width: ' + queryWidth + 'rem)' });

    (0, _containersQuery2.default)(e.containers, mediaQuery, opts, breakpoint);
    (0, _blocsFloatQuery2.default)(e.blocs[breakpoint], mediaQuery, opts);
    (0, _blocsQuery2.default)(e.blocs, mediaQuery, opts, breakpoint);
    (0, _blobsFloatQuery2.default)(e.blobs[breakpoint], mediaQuery, opts);
    (0, _blobsQuery2.default)(e.blobs[breakpoint], mediaQuery, opts);
    (0, _showsQuery2.default)(e.shows[breakpoint], mediaQuery);
    (0, _hidesQuery2.default)(e.hides[breakpoint], mediaQuery);
    (0, _rightsQuery2.default)(e.rights[breakpoint], mediaQuery, opts);
    (0, _columnsQuery2.default)(e.columns, mediaQuery, opts, breakpoint);
    (0, _customStyles2.default)(e.customStyles[breakpoint], mediaQuery);

    rootCss.append(mediaQuery);
  }
};