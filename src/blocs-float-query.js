import postcss from 'postcss';
import utils from './utils';

export default (opts, breakpoint, mediaQuery, blocs) => {
  if (blocs.length && blocs[breakpoint] && blocs[breakpoint].length && opts.display === 'float') {
    const blocFloat = postcss.rule();

    blocFloat.append({ prop: 'float', value: 'left' });
    blocFloat.append({ prop: 'clear', value: 'none' });

    for (let width = opts.max; width > 0; width--) {
      if (blocs[breakpoint][width]) {
        if (blocs[breakpoint][width][0]) {
          utils.selectorsAdd(blocFloat, blocs[breakpoint][width][0]);
        }
        if (width > 1 && width < opts.max) {
          for (let offset = 1; offset <= opts.max - width; offset++) {
            if (blocs[breakpoint][width][offset]) {
              utils.selectorsAdd(blocFloat, blocs[breakpoint][width][offset]);
            }
          }
        }
      }
    }

    mediaQuery.append(blocFloat);
  }
};
