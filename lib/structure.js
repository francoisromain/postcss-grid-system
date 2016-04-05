var postcss = require('postcss');
var rows = require('./rows.js');
var blocs = require('./blocs.js');
var blocsSub = require('./blocs-sub.js');
var blocsQuery = require('./blocs-query.js');
var columns = require('./columns.js');
var showsQuery = require('./shows-query.js');
var rightsQuery = require('./rights-query.js');
var blocsFloatQuery = require('./blocs-float-query.js');
var blobs = require('./blobs.js');
var blobsQuery = require('./blobs-query.js');
var blobsFloatQuery = require('./blobs-float-query.js');
var columnsQuery = require('./columns-query.js');

module.exports = function (opts, rootCss) {

    var container = postcss.rule({ selector: '.container' });
    container.append({
        prop: 'padding-left',
        value: opts.padding + 'rem'
    });
    container.append({
        prop: 'padding-right',
        value: opts.padding + 'rem'
    });
    if (opts.align === 'center') {
        container.append({ prop: 'margin-left', value: 'auto' });
        container.append({ prop: 'margin-right', value: 'auto' });
    }
    rootCss.append(container);

    if (opts.blocs || opts.blobs) {
        rows(opts, rootCss);
    }

    if (opts.blocs) {
        blocs(opts, rootCss);
        blocsSub(opts, rootCss);
    }

    if (opts.blobs) {
        blobs(opts, rootCss);
        blobsFloatQuery(opts, 0, rootCss);
    }

    if (opts.columns) {
        columns(opts, rootCss);
    }

    for (var breakpoint = opts.min; breakpoint <= opts.max; breakpoint++) {
        var queryWidth = breakpoint * opts.width - opts.gutter +
            4 * opts.padding;
        var mediaQuery = postcss.atRule({
            name: 'media',
            params: '(width > ' + queryWidth + 'rem)'
        });

        var containerQuery = postcss.rule({ selector: '.container' });
        var containerWidth = breakpoint * opts.width - opts.gutter +
            2 * opts.padding;
        containerQuery.append({
            prop: 'width',
            value: containerWidth + 'rem'
        });
        mediaQuery.append(containerQuery);

        if (opts.blocs) {
            blocsFloatQuery(opts, breakpoint, mediaQuery);
            blocsQuery(opts, breakpoint, mediaQuery);
        }

        if (opts.blobs) {
            blobsFloatQuery(opts, breakpoint, mediaQuery);
            blobsQuery(opts, breakpoint, mediaQuery);
        }

        if (opts.show) {
            showsQuery(breakpoint, mediaQuery);
        }

        if (opts.right) {
            rightsQuery(opts, breakpoint, mediaQuery);
        }

        if (opts.columns) {
            columnsQuery(opts, breakpoint, mediaQuery);
        }

        rootCss.append(mediaQuery);
    }
};
