import postcss from 'postcss';
import utils from './utils';

export default (opts, breakpoint, mediaQuery, blobs) => {
  if (blobs.length && blobs[breakpoint].length) {
    for (let total = 2; total <= blobs[breakpoint].length; total++) {
      if (blobs[breakpoint][total]) {
        for (let ratio = 1; ratio < blobs[breakpoint][total].length; ratio++) {
          if (blobs[breakpoint][total][ratio]) {
            const blobWidth = postcss.rule();
            const blobWidthValue = 100 * ratio / total;
            const blobWidthString = `${blobWidthValue}% - ${opts.gutter}rem`;

            utils.selectorsAdd(blobWidth, blobs[breakpoint][total][ratio]);

            if (opts.display === 'flex') {
              blobWidth.append({ prop: 'flex', value: `0 1 calc(${blobWidthString})` });
            } else if (opts.display === 'float') {
              blobWidth.append({ prop: 'width', value: `calc(${blobWidthString})` });
            }

            mediaQuery.append(blobWidth);
          }
        }
      }
    }
  }
};
