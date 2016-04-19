import postcss from 'postcss';
import utils from './utils';

export default (blobs, node, opts) => {
  if (blobs && blobs.length) {
    for (let total = 2; total <= blobs.length; total++) {
      if (blobs[total]) {
        for (let ratio = 1; ratio < blobs[total].length; ratio++) {
          if (blobs[total][ratio]) {
            const blobWidth = postcss.rule();
            const blobWidthValue = 100 * ratio / total;
            const blobWidthString = `${blobWidthValue}% - ${opts.gutter}rem`;

            utils.selectorsAdd(blobWidth, blobs[total][ratio]);

            if (opts.display === 'flex') {
              blobWidth.append({ prop: 'flex', value: `0 1 calc(${blobWidthString})` });
            } else if (opts.display === 'float') {
              blobWidth.append({ prop: 'width', value: `calc(${blobWidthString})` });
            }

            node.append(blobWidth);
          }
        }
      }
    }
  }
};
