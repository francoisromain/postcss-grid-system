import { flatten } from './utils';

export default (columns, opts, { rule }) => {
  const columnsGap = rule();

  columnsGap.selectors = flatten(columns);
  columnsGap.append({ prop: 'column-gap', value: `${opts.gutter}rem` });

  return columnsGap;
};
