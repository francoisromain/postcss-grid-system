import postcss from 'postcss';

export default (opts, rootCss, containers) => {
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

    rootCss.append(container);
  }
};
