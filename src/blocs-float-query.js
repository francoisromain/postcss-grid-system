import postcss from 'postcss';
import utils from './utils';

export default (blocs, node, opts) => {
  if (blocs && blocs.length && opts.display === 'float') {
    const blocFloat = postcss.rule();

    blocFloat.append({ prop: 'float', value: 'left' });
    blocFloat.append({ prop: 'clear', value: 'none' });

    for (let width = opts.max; width > 0; width--) {
      if (blocs[width]) {
        if (blocs[width][0]) {
          utils.selectorsAdd(blocFloat, blocs[width][0]);
        }
        if (width > 1 && width < opts.max) {
          for (let offset = 1; offset <= opts.max - width; offset++) {
            if (blocs[width][offset]) {
              utils.selectorsAdd(blocFloat, blocs[width][offset]);
            }
          }
        }
      }
    }

    node.append(blocFloat);
  }
};
