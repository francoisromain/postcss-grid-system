import postcss from 'postcss';
import utils from './utils';

export default (blocs, node, opts) => {
  if (blocs && blocs.length) {
    const blocLeft = postcss.rule();
    const blocRight = postcss.rule();

    if (opts.display === 'float') {
      blocLeft.append({ prop: 'float', value: 'left' });
      blocLeft.append({ prop: 'clear', value: 'none' });

      blocRight.append({ prop: 'float', value: 'right' });
      blocRight.append({ prop: 'clear', value: 'none' });
    } else {
      blocRight.append({ prop: 'margin-left', value: 'auto' });
    }

    for (let width = opts.max; width > 0; width--) {
      if (blocs[width] && blocs[width][1]) {
        utils.selectorsAdd(blocLeft, blocs[width][1]);
      }
      if (blocs[width] && blocs[width][0]) {
        utils.selectorsAdd(blocRight, blocs[width][0]);
      }
    }

    if (blocRight.selector && blocRight.nodes.length) {
      node.append(blocRight);
    }

    if (blocLeft.selector && blocLeft.nodes.length) {
      node.append(blocLeft);
    }
  }
};
