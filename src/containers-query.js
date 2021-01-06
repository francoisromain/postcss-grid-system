import { selectorsAdd } from './utils';

export default (containers, opts, breakpoint, { rule }) => {
  const containerQuery = rule();
  const containerWidth =
    breakpoint * opts.width - opts.gutter + 2 * opts.padding;

  for (let i = 0; i <= breakpoint; i += 1) {
    if (containers[i] && containers[i].length) {
      containerQuery.selector = selectorsAdd(
        containerQuery.selector,
        containers[i]
      );
    }
  }

  containerQuery.append({ prop: 'width', value: `${containerWidth}rem` });

  return containerQuery;
};
