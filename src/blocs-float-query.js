import postcss from 'postcss';
import utils from './utils';

export default (opts, breakpoint, mediaQuery, blocs) => {
  const max = blocs[breakpoint].length;

  if (opts.display === 'float' && blocs) {
    const blocFloat = postcss.rule();
    blocFloat.append({ prop: 'float', value: 'left' });
    blocFloat.append({ prop: 'clear', value: 'none' });
    for (let width = max; width > 0; width--) {
      if (blocs[breakpoint][width]) {
        utils.selectorsAdd(blocFloat, blocs[breakpoint][width][0]);
        if (width > 1 && width < max) {
          for (let offset = 1; offset <= max - width; offset++) {
            if (blocs[breakpoint][width]) {
              utils.selectorsAdd(blocFloat, blocs[breakpoint][width][offset]);
            }
          }
        }
      }
    }
    mediaQuery.append(blocFloat);
  }
};
