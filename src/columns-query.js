import { selectorsAdd } from './utils';

export default (columns, opts, breakpoint, { rule }) => {
  const columnsIndex = {};
  const cols = [];

  for (let i = 1; i <= breakpoint; i += 1) {
    columnsIndex[i] = rule();
    columnsIndex[i].append({ prop: 'column-count', value: i.toString() });
  }

  for (let i = 0; i <= breakpoint; i += 1) {
    if (columns[i]) {
      for (let width = 1; width <= opts.max; width += 1) {
        if (columns[i][width]) {
          let i1 = null;

          if (width >= breakpoint) {
            i1 = breakpoint;
          } else if (breakpoint === i) {
            i1 = width;
          }

          if (i1) {
            columnsIndex[i1].selector = selectorsAdd(
              columnsIndex[i1].selector,
              columns[i][width][0]
            );
          }
        }
      }
    }
  }

  for (let i = 1; i <= breakpoint; i += 1) {
    if (columnsIndex[i].selector) {
      cols.push(columnsIndex[i]);
    }
  }

  return cols;
};
