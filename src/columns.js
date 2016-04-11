import postcss from 'postcss';
import utils from './utils';

export default (opts, rootCss, columns) => {
  if (columns.length) {
    const columnsGap = postcss.rule();
    columnsGap.selectors = utils.flatten(columns);
    columnsGap.append({ prop: 'column-gap', value: `${opts.gutter}rem` });
    rootCss.append(columnsGap);
  }
};
