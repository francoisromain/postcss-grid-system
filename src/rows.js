import postcss from 'postcss';

export default (opts, rootCss, rows) => {
  if (rows.length) {
    const row = postcss.rule();

    row.selectors = rows;
    row.append({ prop: 'clear', value: 'both' });
    row.append({ prop: 'margin-right', value: `-${opts.gutter}rem` });

    if (opts.display === 'flex') {
      row.append({ prop: 'display', value: 'flex' });
      row.append({ prop: 'flex-flow', value: 'row wrap' });
      row.append({ prop: 'align-items', value: 'flex-start' });
      row.append({ prop: 'align-content', value: 'flex-start' });
    }

    rootCss.append(row);

    const rowClearfixSelectors = rows.map((selector) => `${selector}:after`);
    const rowClearfix = postcss.rule();

    rowClearfix.selectors = rowClearfixSelectors;
    rowClearfix.append({ prop: 'content', value: '""' });
    rowClearfix.append({ prop: 'display', value: 'table' });
    rowClearfix.append({ prop: 'clear', value: 'both' });

    rootCss.append(rowClearfix);
  }
};
