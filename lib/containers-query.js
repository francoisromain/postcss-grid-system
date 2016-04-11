var postcss = require('postcss');

module.exports = function (opts, breakpoint, mediaQuery, containers) {
  var containerQuery;

  if (containers.length) {
      var containerQuery = postcss.rule();
      containerQuery.selectors = containers;
      var containerWidth = breakpoint * opts.unit - opts.gutter +
          2 * opts.padding;
      containerQuery.append({
          prop: 'width',
          value: containerWidth + 'rem'
      });
      mediaQuery.append(containerQuery);
  }
};
