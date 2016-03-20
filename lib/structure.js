var postcss = require('postcss');
var blocs = require('./blocs.js');
var blocsSub = require('./blocs-sub.js');
var columns = require('./columns.js');
var blocsQuery = require('./blocs-query.js');
var blocsFloatQuery = require('./blocs-float-query.js');
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

    if (opts.blocs) {
        blocs(opts, rootCss);
        blocsSub(opts, rootCss);
    }

    if (opts.columns) {
        columns(opts, rootCss);
    }

    for (var breakPoint = opts.min; breakPoint <= opts.max; breakPoint++) {
        var queryWidth = breakPoint * opts.width - opts.gutter +
            4 * opts.padding;
        var mediaQuery = postcss.atRule({
            name: 'media',
            params: '(width > ' + queryWidth + 'rem)'
        });

        var containerQuery = postcss.rule({ selector: '.container' });
        var containerWidth = breakPoint * opts.width - opts.gutter +
            2 * opts.padding;
        containerQuery.append({
            prop: 'width',
            value: containerWidth + 'rem'
        });
        mediaQuery.append(containerQuery);

        if (opts.blocs) {
            blocsFloatQuery(opts, breakPoint, mediaQuery);
            blocsQuery(opts, breakPoint, mediaQuery);
        }

        if (opts.columns) {
            columnsQuery(opts, breakPoint, mediaQuery);
        }

        rootCss.append(mediaQuery);
    }
}
