import postcss from 'postcss';
import utils from './utils';

export default (containers, node, opts, breakpoint) => {
  if (containers.length) {
    const containerQuery = postcss.rule();
    const containerWidth = breakpoint * opts.unit - opts.gutter + 2 * opts.padding;
 
    for (let i = 0; i <= breakpoint; i++) {
      if (containers[i] && containers[i].length) {
        utils.selectorsAdd(containerQuery, containers[i]);
      }
    }

    containerQuery.append({ prop: 'width', value: `${containerWidth}rem` });

    node.append(containerQuery);
  }
};
