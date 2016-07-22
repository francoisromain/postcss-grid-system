import postcss from 'postcss';
import utils from './utils';

export default (blocs, node, opts, breakpoint) => {
  if (blocs.length) {
    const blocWidth = {};
    const blocWidthFill = (unit, width) => {
      if (blocs[unit] && blocs[unit][width] && blocs[unit][width][1]) {
        utils.selectorsAdd(blocWidth[width], blocs[unit][width][1]);
      }
      if (blocs[unit] && blocs[unit][width] && blocs[unit][width][0]) {
        utils.selectorsAdd(blocWidth[width], blocs[unit][width][0]);
      }
    };

    for (let width = 1; width <= breakpoint; width++) {
      blocWidth[width] = postcss.rule();
      const blocWidthValue = opts.width * width - opts.gutter;
      if (opts.display === 'flex') {
        blocWidth[width].append({ prop: 'flex', value: `0 1 ${blocWidthValue}rem` });
      } else if (opts.display === 'float') {
        blocWidth[width].append({ prop: 'width', value: `${blocWidthValue}rem` });
      }
    }

    for (let unit = 0; unit <= opts.max; unit++) {
      if (unit === breakpoint) {
        for (let width = 0; width <= breakpoint; width++) {
          blocWidthFill(unit, width);
        }
      } else if (unit < breakpoint) {
        blocWidthFill(unit, breakpoint);
      }
    }

    for (let width = 1; width <= breakpoint; width++) {
      if (blocWidth[width].selector && blocWidth[width].nodes.length) {
        node.append(blocWidth[width]);
      }
    }
  }
};
