import postcss from 'postcss';
import utils from './utils';

export default (opts, breakpoint, mediaQuery, blocs) => {
  const blocWidth = {};
  const max = blocs[breakpoint].length;

  for (let idx = 1; idx <= breakpoint; idx++) {
    blocWidth[idx] = postcss.rule();
    const blocWidthValue = opts.unit * idx - opts.gutter;
    if (opts.display === 'flex') {
      blocWidth[idx].append({ prop: 'flex', value: `0 1 ${blocWidthValue}rem` });
    } else if (opts.display === 'float') {
      blocWidth[idx].append({ prop: 'width', value: `${blocWidthValue}rem` });
    }
  }

  for (let units = 1; units <= breakpoint; units++) {
    for (let width = 1; width <= max; width++) {
      if (blocs[units][width]) {
        let i1 = false;
        if (width >= breakpoint) {
          i1 = breakpoint;
        } else if (breakpoint === units) {
          i1 = width;
        }
        if (i1) {
          utils.selectorsAdd(blocWidth[i1], blocs[units][width][0]);
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
              utils.selectorsAdd(blocWidth[i2], blocs[units][width][offset]);
            }
          }
        }
      }
    }
  }
  for (let idx = 1; idx <= breakpoint; idx++) {
    if (blocWidth[idx].selector) {
      mediaQuery.append(blocWidth[idx]);
    }
  }
};
