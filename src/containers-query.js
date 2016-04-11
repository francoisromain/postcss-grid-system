import postcss from 'postcss';

export default (opts, breakpoint, mediaQuery, containers) => {
  if (containers.length) {
    const containerQuery = postcss.rule();
    containerQuery.selectors = containers;
    const containerWidth = breakpoint * opts.unit - opts.gutter + 2 * opts.padding;
    containerQuery.append({ prop: 'width', value: `${containerWidth}rem` });
    mediaQuery.append(containerQuery);
  }
};
