import postcss from 'postcss';
import utils from './utils';

export default (opts, breakpoint, mediaQuery, blobs) => {
  if (opts.display === 'float' && blobs) {
    const blobFloat = postcss.rule();

    blobFloat.append({ prop: 'float', value: 'left' });
    blobFloat.append({ prop: 'clear', value: 'none' });

    for (let total = 2; total <= blobs[breakpoint].length; total++) {
      if (blobs[breakpoint][total]) {
        for (let ratio = 1; ratio < blobs[breakpoint][total].length; ratio++) {
          utils.selectorsAdd(blobFloat, blobs[breakpoint][total][ratio]);
        }
      }
    }

    mediaQuery.append(blobFloat);
  }
};
