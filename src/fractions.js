import postcss from 'postcss';
import { flatten } from './utils';

export default (fractions, node, opts) => {
  if (fractions.length) {
    const fraction = postcss.rule();

    fraction.selectors = flatten(fractions);

    fraction.append({ prop: 'margin-right', value: `${opts.gutter}rem` });
    fraction.append({ prop: 'margin-bottom', value: `${opts.gutter}rem` });

    if (opts.display === 'flex') {
      fraction.append({ prop: 'flex', value: '0 1 100%' });
    } else if (opts.display === 'float') {
      fraction.append({ prop: 'clear', value: 'both' });
    }

    node.append(fraction);
  }
};
