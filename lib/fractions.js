'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (opts, rootCss, fractions) {
  if (fractions.length) {
    var fractionFloat = _postcss2.default.rule();

    fractionFloat.selectors = _utils2.default.flatten(fractions);

    fractionFloat.append({ prop: 'margin-right', value: opts.gutter + 'rem' });
    fractionFloat.append({ prop: 'margin-bottom', value: opts.gutter + 'rem' });

    if (opts.display === 'flex') {
      fractionFloat.append({ prop: 'flex', value: '0 1 auto' });
    } else if (opts.display === 'float') {
      fractionFloat.append({ prop: 'float', value: 'left' });
    }

    rootCss.append(fractionFloat);

    for (var total = 2; total < fractions.length; total++) {
      if (fractions[total]) {
        for (var ratio = 1; ratio < fractions[total].length; ratio++) {
          var fractionSelectors = fractions[total][ratio];

          if (fractionSelectors) {
            var fraction = _postcss2.default.rule();
            var fractionValue = opts.unit * ratio / total - opts.gutter;

            fraction.selectors = fractionSelectors;

            if (opts.display === 'flex') {
              fraction.append({ prop: 'flex', value: '0 1 ' + fractionValue + 'rem' });
            } else if (opts.display === 'float') {
              fraction.append({ prop: 'width', value: fractionValue + 'rem' });
            }

            rootCss.append(fraction);
          }
        }
      }
    }
  }
};