var postcss = require('postcss');

module.exports = function containersFn(opts, rootCss, containers) {
  var container;

  if (containers.length) {
    container = postcss.rule();
    container.selectors = containers;
    container.append({
      prop: 'padding-left',
      value: opts.padding + 'rem'
    });
    container.append({
      prop: 'padding-right',
      value: opts.padding + 'rem'
    });
    if (opts.align === 'center') {
      container.append({ prop: 'margin-left', value: 'auto' });
      container.append({ prop: 'margin-right', value: 'auto' });
    }
    rootCss.append(container);
  }
};
