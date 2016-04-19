import postcss from 'postcss';

export default (containers, node, opts) => {
  if (containers.length) {
    const container = postcss.rule();

    container.selectors = containers;
    container.append({ prop: 'padding-left', value: `${opts.padding}rem` });
    container.append({ prop: 'padding-right', value: `${opts.padding}rem` });
    container.append({ prop: 'overflow', value: 'hidden' });

    if (opts.align === 'center') {
      container.append({ prop: 'margin-left', value: 'auto' });
      container.append({ prop: 'margin-right', value: 'auto' });
    }

    node.append(container);
  }
};
