import { flatten } from './utils';

export default (containers, opts, { rule }) => {
  const container = rule();

  container.selectors = flatten(containers);

  container.append({ prop: 'padding-left', value: `${opts.padding}rem` });
  container.append({ prop: 'padding-right', value: `${opts.padding}rem` });
  container.append({ prop: 'overflow', value: 'hidden' });

  if (opts.align === 'center') {
    container.append({ prop: 'margin-left', value: 'auto' });
    container.append({ prop: 'margin-right', value: 'auto' });
  }

  return container;
};
