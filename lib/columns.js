var postcss = require('postcss');
var utils = require('./utils.js');

module.exports = function (opts, rootCss, columns) {
    if (columns.length) {
        var columnsGap = postcss.rule();
        columnsGap.selectors = utils.flatten(columns);
        columnsGap.append({ prop: 'column-gap', value: opts.gutter + 'rem' });
        rootCss.append(columnsGap);
    }
};
