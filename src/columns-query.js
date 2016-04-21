import postcss from 'postcss';
import utils from './utils';

export default (columns, node, opts, breakpoint) => {
  if (columns.length) {
    const columnCount = {};

    for (let i = 1; i <= breakpoint; i++) {
      columnCount[i] = postcss.rule();
      columnCount[i].append({ prop: 'column-count', value: i.toString() });
    }

    for (let units = 0; units <= breakpoint; units++) {
      if (columns[units]) {
        for (let width = 1; width <= opts.max; width++) {
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

            if (width > 1 && width < opts.max) {
              for (let offset = 1; offset <= opts.max - width; offset++) {
                let i2 = false;
                if (width + offset <= breakpoint && breakpoint === units) {
                  i2 = width;
                } else if (width + offset >= breakpoint && breakpoint - offset >= 1) {
                  i2 = breakpoint - offset;
                } else if (breakpoint === units) {
                  i2 = 1;
                }
                if (i2) {
                  utils.selectorsAdd(columnCount[i2], columns[units][width][offset]);
                }
              }
            }
          }
        }
      }
    }

    for (let index = 1; index <= breakpoint; index++) {
      if (columnCount[index].selector) {
        node.append(columnCount[index]);
      }
    }
  }
};
