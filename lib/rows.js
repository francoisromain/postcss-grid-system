var postcss = require('postcss');

module.exports = function rowsQuery(opts, rootCss, rows) {
  var row = postcss.rule();
  var rowClearfixSelectors;
  var rowClearfix;

  if (rows.length) {
    row.selectors = rows;
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

    rowClearfixSelectors = rows.map(function rowsMap(selector) {
      return selector + ':after';
    });
    rowClearfix = postcss.rule();
    rowClearfix.selectors = rowClearfixSelectors;
    rowClearfix.append({ prop: 'content', value: '""' });
    rowClearfix.append({ prop: 'display', value: 'table' });
    rowClearfix.append({ prop: 'clear', value: 'both' });
    rootCss.append(rowClearfix);
  }
};
