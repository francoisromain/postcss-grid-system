import postcss from 'postcss';
import utils from './utils';

const containersQuery = (containers, node, opts, breakpoint) => {
  if (containers.length) {
    const containerQuery = postcss.rule();
    const containerWidth = breakpoint * opts.width - opts.gutter + 2 * opts.padding;

    for (let i = 0; i <= breakpoint; i += 1) {
      if (containers[i] && containers[i].length) {
        utils.selectorsAdd(containerQuery, containers[i]);
      }
    }

    containerQuery.append({ prop: 'width', value: `${containerWidth}rem` });

    node.append(containerQuery);
  }
};

export default containersQuery;
