var postcss = require('postcss');

module.exports = function containersQuery(opts, breakpoint, mediaQuery, containers) {
  var containerQuery;
  var containerWidth;

  if (containers.length) {
    containerQuery = postcss.rule();
    containerQuery.selectors = containers;
    containerWidth = breakpoint * opts.unit - opts.gutter +
      2 * opts.padding;
    containerQuery.append({
      prop: 'width',
      value: containerWidth + 'rem'
    });
    mediaQuery.append(containerQuery);
  }
};
