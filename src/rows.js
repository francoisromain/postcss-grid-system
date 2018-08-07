import postcss from 'postcss';
import utils from './utils';

const r = (rows, node, opts) => {
  if (rows.length) {
    const row = postcss.rule();
    const rowClearFix = postcss.rule();

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

    rowClearFix.selectors = rows.map(selector => `${selector}::after`);
    rowClearFix.append({ prop: 'content', value: '""' });
    rowClearFix.append({ prop: 'display', value: 'table' });
    rowClearFix.append({ prop: 'clear', value: 'both' });

    node.append(rowClearFix);
  }
};

export default r;
