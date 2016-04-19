import postcss from 'postcss';
import utils from './utils';

export default (blobs, node, opts) => {
  if (blobs && blobs.length && opts.display === 'float') {
    const blobFloat = postcss.rule();

    blobFloat.append({ prop: 'float', value: 'left' });
    blobFloat.append({ prop: 'clear', value: 'none' });

    for (let total = 2; total <= blobs.length; total++) {
      if (blobs[total]) {
        for (let ratio = 1; ratio < blobs[total].length; ratio++) {
          utils.selectorsAdd(blobFloat, blobs[total][ratio]);
        }
      }
    }

    node.append(blobFloat);
  }
};
