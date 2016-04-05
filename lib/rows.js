var postcss = require('postcss');

module.exports = function (opts, rootCss) {
    var row = postcss.rule({ selector: '.row' });
    row.append({ prop: 'clear', value: 'both' });
    row.append({
        prop: 'margin-right',
        value: '-' + opts.gutter + 'rem'
    });
    if (opts.display === 'flex') {
        row.append({ prop: 'display', value: 'flex' });
        row.append({ prop: 'flex-flow', value: 'row wrap' });
        row.append({ prop: 'align-items', value: 'flex-start' });
        row.append({ prop: 'align-content', value: 'flex-start' });
    }
    rootCss.append(row);

    var rowClearfix = postcss.rule({ selector: '.row:after' });
    rowClearfix.append({ prop: 'content', value: '""' });
    rowClearfix.append({ prop: 'display', value: 'table' });
    rowClearfix.append({ prop: 'clear', value: 'both' });
    rootCss.append(rowClearfix);
};