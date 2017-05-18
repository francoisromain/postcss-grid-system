import postcss from 'postcss';
import utils from './utils';

export default (columns, node, opts, breakpoint) => {
  if (columns.length) {
    const columnCount = {};

    for (let i = 1; i <= breakpoint; i += 1) {
      columnCount[i] = postcss.rule();
      columnCount[i].append({ prop: 'column-count', value: i.toString() });
    }

    for (let units = 0; units <= breakpoint; units += 1) {
      if (columns[units]) {
        for (let width = 1; width <= opts.max; width += 1) {
          if (columns[units][width]) {
            let i1 = false;
            if (width >= breakpoint) {
              i1 = breakpoint;
            } else if (breakpoint === units) {
              i1 = width;
            }
            if (i1) {
              utils.selectorsAdd(columnCount[i1], columns[units][width][0]);
            }
          }
        }
      }
    }

    for (let index = 1; index <= breakpoint; index += 1) {
      if (columnCount[index].selector) {
        node.append(columnCount[index]);
      }
    }
  }
};
