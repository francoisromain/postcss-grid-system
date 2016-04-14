import postcss from 'postcss';

export default (opts, rootCss, rows) => {
  if (rows.length) {
    const row = postcss.rule();
    const rowClearfix = postcss.rule();

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

    rowClearfix.selectors = rows.map((selector) => `${selector}::after`);
    rowClearfix.append({ prop: 'content', value: '""' });
    rowClearfix.append({ prop: 'display', value: 'table' });
    rowClearfix.append({ prop: 'clear', value: 'both' });

    rootCss.append(rowClearfix);
  }
};
