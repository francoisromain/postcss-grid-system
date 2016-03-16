var postcss = require('postcss');

module.exports = function (opts, rootCss) {
    var columns = postcss.rule({ selector: '.columns' });
    columns.append({ prop: 'column-gap', value: opts.gutter + 'rem' });
    rootCss.append(columns);
};
