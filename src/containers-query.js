import postcss from 'postcss';

export default (containers, node, opts, breakpoint) => {
  if (containers.length) {
    const containerQuery = postcss.rule();
    const containerWidth = breakpoint * opts.unit - opts.gutter + 2 * opts.padding;

    containerQuery.selectors = containers;
    containerQuery.append({ prop: 'width', value: `${containerWidth}rem` });

    node.append(containerQuery);
  }
};
