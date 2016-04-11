var postcss = require('postcss');
var utils = require('./utils.js');

module.exports = function fractionsFn(opts, rootCss, fractions) {
  var total;
  var ratio;
  var fractionSelectors;
  var fraction;
  var fractionValue;
  fraction = postcss.rule();
  fraction.selectors = utils.flatten(fractions);
  fraction.append({ prop: 'margin-right', value: opts.gutter + 'rem' });
  fraction.append({ prop: 'margin-bottom', value: opts.gutter + 'rem' });
  if (opts.display === 'flex') {
    fraction.append({ prop: 'flex', value: '0 1 auto' });
  } else if (opts.display === 'float') {
    fraction.append({ prop: 'float', value: 'left' });
  }
  rootCss.append(fraction);

  for (total = 2; total < fractions.length; total++) {
    for (ratio = 1; ratio < fractions[total].length; ratio++) {
      fractionSelectors = fractions[total][ratio];
      if (fractionSelectors) {
        fraction = postcss.rule();
        fraction.selectors = fractionSelectors;
        fractionValue = opts.unit * ratio / total - opts.gutter;
        if (opts.display === 'flex') {
          fraction.append({ prop: 'flex', value: '0 1 ' + fractionValue + 'rem' });
        } else if (opts.display === 'float') {
          fraction.append({ prop: 'width', value: fractionValue + 'rem' });
        }
        rootCss.append(fraction);
      }
    }
  }
};
