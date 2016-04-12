import postcss from 'postcss';
import utils from './utils';

export default (opts, breakpoint, mediaQuery, columns) => {
  if (columns.length && columns[breakpoint].length) {
    const columnCount = {};
    const max = columns[breakpoint].length;

    for (let index = 1; index <= breakpoint; index++) {
      columnCount[index] = postcss.rule();
      columnCount[index].append({ prop: 'column-count', value: index.toString() });
    }

    for (let units = 1; units <= breakpoint; units++) {
      for (let width = 1; width <= max; width++) {
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

          if (width > 1 && width < max) {
            for (let offset = 1; offset <= max - width; offset++) {
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
    for (let index = 1; index <= breakpoint; index++) {
      if (columnCount[index].selector) {
        mediaQuery.append(columnCount[index]);
      }
    }
  }
};
