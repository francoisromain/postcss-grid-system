import postcss from 'postcss';

export default (opts, breakpoint, mediaQuery, rights) => {
  if (rights[breakpoint]) {
    const right = postcss.rule();

    right.selectors = rights[breakpoint];

    if (opts.display === 'flex') {
      right.append({ prop: 'margin-left', value: 'auto' });
    } else if (opts.display === 'float') {
      right.append({ prop: 'float', value: 'right' });
    }

    mediaQuery.append(right);
  }
};
