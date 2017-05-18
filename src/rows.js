import postcss from 'postcss';
import utils from './utils';

export default (rows, node, opts) => {
  if (rows.length) {
    const row = postcss.rule();
    const rowClearfix = postcss.rule();

    row.selectors = utils.flatten(rows);

    row.append({ prop: 'clear', value: 'both' });
    row.append({ prop: 'margin-right', value: `-${opts.gutter}rem` });

    if (opts.display === 'flex') {
      row.append({ prop: 'display', value: 'flex' });
      row.append({ prop: 'flex-flow', value: 'row wrap' });
      row.append({ prop: 'align-items', value: 'flex-start' });
      row.append({ prop: 'align-content', value: 'flex-start' });
    }

    node.append(row);

    rowClearfix.selectors = rows.map(selector => `${selector}::after`);
    rowClearfix.append({ prop: 'content', value: '""' });
    rowClearfix.append({ prop: 'display', value: 'table' });
    rowClearfix.append({ prop: 'clear', value: 'both' });

    node.append(rowClearfix);
  }
};
