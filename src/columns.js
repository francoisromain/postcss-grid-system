import postcss from 'postcss';
import utils from './utils';

const c = (columns, node, opts) => {
  if (columns.length) {
    const columnsGap = postcss.rule();

    columnsGap.selectors = utils.flatten(columns);
    columnsGap.append({ prop: 'column-gap', value: `${opts.gutter}rem` });

    node.append(columnsGap);
  }
};

export default c;
