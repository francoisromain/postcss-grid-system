import postcss from 'postcss';
import utils from './utils';

export default (blocs, node, opts, breakpoint) => {
  if (blocs.length) {
    const blocWidth = {};

    for (let i = 1; i <= breakpoint; i++) {
      blocWidth[i] = postcss.rule();
      const blocWidthValue = opts.unit * i - opts.gutter;
      if (opts.display === 'flex') {
        blocWidth[i].append({ prop: 'flex', value: `0 1 ${blocWidthValue}rem` });
      } else if (opts.display === 'float') {
        blocWidth[i].append({ prop: 'width', value: `${blocWidthValue}rem` });
      }
    }

    for (let units = 1; units <= breakpoint; units++) {
      if (blocs[units]) {
        for (let width = 1; width <= opts.max; width++) {
          if (blocs[units][width]) {
            let i1 = false;
            if (width >= breakpoint) {
              i1 = breakpoint;
            } else if (units === breakpoint) {
              i1 = width;
            }

            if (i1) {
              utils.selectorsAdd(blocWidth[i1], blocs[units][width][0]);
            }

            if (width > 1 && width < opts.max) {
              for (let offset = 1; offset + width <= opts.max; offset++) {
                let i2 = false;
                if (width + offset <= breakpoint && units === breakpoint) {
                  i2 = width;
                } else if (width + offset >= breakpoint && breakpoint - offset > 1) {
                  i2 = breakpoint - offset;
                } else if (units === breakpoint) {
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
    }

    for (let i = 1; i <= breakpoint; i++) {
      if (blocWidth[i].selector) {
        node.append(blocWidth[i]);
      }
    }
  }
};
