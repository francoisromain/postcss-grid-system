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

    var bloc = postcss.rule({ selector: '.bloc' });
    bloc.append({ prop: 'margin-right', value: opts.gutter + 'rem' });
    bloc.append({ prop: 'margin-bottom', value: opts.gutter + 'rem' });
    if (opts.display === 'flex') {
        bloc.append({ prop: 'flex', value: '0 1 100%' });
    } else if (opts.display === 'float') {
        bloc.append({ prop: 'clear', value: 'both' });
    }
    rootCss.append(bloc);

    var blocLeft = postcss.rule({ selector: '.bloc-left' });
    if (opts.display === 'flex') {
        blocLeft.append({ prop: 'flex', value: '0 1 auto' });
    } else if (opts.display === 'float') {
        blocLeft.append({ prop: 'float', value: 'left' });
        blocLeft.append({ prop: 'clear', value: 'none' });
        blocLeft.selector +=
            ', .bloc-one-half, .bloc-one-third' +
            ', .bloc-two-third, .bloc-thumb';
    }
    rootCss.append(blocLeft);
};
