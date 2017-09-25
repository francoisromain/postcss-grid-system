import postcss from 'postcss';

export default (fractions, node, opts) => {
  if (fractions && fractions.length) {
    for (let total = 2; total < fractions.length; total += 1) {
      if (fractions[total]) {
        for (let ratio = 1; ratio < fractions[total].length; ratio += 1) {
          const fractionSelectors = fractions[total][ratio];

          if (fractionSelectors) {
            const fraction = postcss.rule();
            const fractionValue = ((opts.width * ratio) / total) - opts.gutter;

            fraction.selectors = fractionSelectors;

            if (opts.display === 'flex') {
              fraction.append({ prop: 'flex', value: `0 1 ${fractionValue}rem` });
            } else if (opts.display === 'float') {
              fraction.append({ prop: 'float', value: 'left' });
              fraction.append({ prop: 'clear', value: 'none' });
              fraction.append({ prop: 'width', value: `${fractionValue}rem` });
            }

            node.append(fraction);
          }
        }
      }
    }
  }
};
