import postcss from 'postcss';
import utils from './utils';

export default (blocs, node, opts, breakpoint) => {
  if (blocs && blocs.length) {
    const blocLeft = {};
    const blocRight = {};

    for (let width = 1; width <= breakpoint; width++) {
      blocLeft[width] = postcss.rule();
      blocRight[width] = postcss.rule();
      if (opts.display === 'float') {
        blocLeft[width].append({ prop: 'float', value: 'left' });
        blocLeft[width].append({ prop: 'clear', value: 'none' });

        blocRight[width].append({ prop: 'float', value: 'right' });
        blocRight[width].append({ prop: 'clear', value: 'none' });
      } else {
        blocRight[width].append({ prop: 'margin-left', value: 'auto' });
      }
    }

    for (let width = 0; width <= breakpoint; width++) {
      if (blocs[breakpoint] && blocs[breakpoint][width] && blocs[breakpoint][width][1]) {
        utils.selectorsAdd(blocLeft[width], blocs[breakpoint][width][1]);
      }
      if (blocs[breakpoint] && blocs[breakpoint][width] && blocs[breakpoint][width][0]) {
        utils.selectorsAdd(blocRight[width], blocs[breakpoint][width][0]);
      }
    }


    for (let width = 1; width <= breakpoint; width++) {
      if (blocRight[width].selector && blocRight[width].nodes.length) {
        node.append(blocRight[width]);
      }

      if (blocLeft[width].selector && blocLeft[width].nodes.length) {
        node.append(blocLeft[width]);
      }
    }
  }
};
