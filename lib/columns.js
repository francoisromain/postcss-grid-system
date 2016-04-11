var postcss = require('postcss');
var utils = require('./utils.js');

module.exports = function columnsFn(opts, rootCss, columns) {
  var columnsGap;
  if (columns.length) {
    columnsGap = postcss.rule();
    columnsGap.selectors = utils.flatten(columns);
    columnsGap.append({ prop: 'column-gap', value: opts.gutter + 'rem' });
    rootCss.append(columnsGap);
  }
};
