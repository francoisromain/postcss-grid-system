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
      }
    }

    node.append(blocFloat);
  }
};
