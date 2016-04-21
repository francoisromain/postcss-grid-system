import postcss from 'postcss';
import utils from './utils';

export default (fractions, node, opts) => {
  if (fractions && fractions.length) {
    for (let total = 2; total < fractions.length; total++) {
      if (fractions[total]) {
        for (let ratio = 1; ratio < fractions[total].length; ratio++) {
          const fractionSelectors = fractions[total][ratio];

          if (fractionSelectors) {
            const fraction = postcss.rule();
            const fractionValue = opts.unit * ratio / total - opts.gutter;

            fraction.selectors = fractionSelectors;

            if (opts.display === 'flex') {
              fraction.append({ prop: 'flex', value: `0 1 ${fractionValue}rem` });
            } else if (opts.display === 'float') {
              fraction.append({ prop: 'width', value: `${fractionValue}rem` });
            }

            node.append(fraction);
          }
        }
      }
    }
  }
};
