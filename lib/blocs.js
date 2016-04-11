var postcss = require('postcss');
var utils = require('./utils.js');

module.exports = function blocsFn(opts, rootCss, blocs) {
  var bloc = postcss.rule();

  bloc.selectors = utils.flatten(blocs);
  bloc.append({ prop: 'margin-right', value: opts.gutter + 'rem' });
  bloc.append({ prop: 'margin-bottom', value: opts.gutter + 'rem' });
  if (opts.display === 'flex') {
    bloc.append({ prop: 'flex', value: '0 1 100%' });
  } else if (opts.display === 'float') {
    bloc.append({ prop: 'clear', value: 'both' });
  }
  rootCss.append(bloc);
};
