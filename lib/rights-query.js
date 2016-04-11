var postcss = require('postcss');

module.exports = function rightsQuery(opts, breakpoint, mediaQuery, rights) {
  var right;

  if (rights[breakpoint]) {
    right = postcss.rule();
    right.selectors = rights[breakpoint];
    if (opts.display === 'flex') {
      right.append({ prop: 'margin-left', value: 'auto' });
    } else if (opts.display === 'float') {
      right.append({ prop: 'float', value: 'right' });
    }
    mediaQuery.append(right);
  }
};
