import postcss from 'postcss';
import utils from './utils';

export default (blocs, node, opts, breakpoint) => {
  if (blocs.length) {
    const blocWidth = {};

    for (let width = 1; width <= breakpoint; width++) {
      blocWidth[width] = postcss.rule();
      const blocWidthValue = opts.width * width - opts.gutter;
      if (opts.display === 'flex') {
        blocWidth[width].append({ prop: 'flex', value: `0 1 ${blocWidthValue}rem` });
      } else if (opts.display === 'float') {
        blocWidth[width].append({ prop: 'width', value: `${blocWidthValue}rem` });
      }
    }

    for (let width = 0; width <= breakpoint; width++) {
      if (blocs[breakpoint] && blocs[breakpoint][width] && blocs[breakpoint][width][1]) {
        utils.selectorsAdd(blocWidth[width], blocs[breakpoint][width][1]);
      }
      if (blocs[breakpoint] && blocs[breakpoint][width] && blocs[breakpoint][width][0]) {
        utils.selectorsAdd(blocWidth[width], blocs[breakpoint][width][0]);
      }
    }

    for (let width = 1; width <= breakpoint; width++) {
      if (blocWidth[width].selector && blocWidth[width].nodes.length) {
        node.append(blocWidth[width]);
      }
    }
  }
};
