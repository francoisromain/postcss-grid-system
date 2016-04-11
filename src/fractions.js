import postcss from 'postcss';
import utils from './utils';

export default (opts, rootCss, fractions) => {
  if (fractions.length > 0) {
    const fractionFloat = postcss.rule();

    fractionFloat.selectors = utils.flatten(fractions);

    fractionFloat.append({ prop: 'margin-right', value: `${opts.gutter}rem` });
    fractionFloat.append({ prop: 'margin-bottom', value: `${opts.gutter}rem` });

    if (opts.display === 'flex') {
      fractionFloat.append({ prop: 'flex', value: '0 1 auto' });
    } else if (opts.display === 'float') {
      fractionFloat.append({ prop: 'float', value: 'left' });
    }

    rootCss.append(fractionFloat);

    for (let total = 2; total < fractions.length; total++) {
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

          rootCss.append(fraction);
        }
      }
    }
  }
};
