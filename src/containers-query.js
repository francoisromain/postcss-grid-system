import postcss from 'postcss';

export default (opts, breakpoint, mediaQuery, containers) => {
  if (containers.length) {
    const containerQuery = postcss.rule();
    const containerWidth = breakpoint * opts.unit - opts.gutter + 2 * opts.padding;

    containerQuery.selectors = containers;
    containerQuery.append({ prop: 'width', value: `${containerWidth}rem` });

    mediaQuery.append(containerQuery);
  }
};
