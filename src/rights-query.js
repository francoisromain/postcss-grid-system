import postcss from 'postcss';

export default (rights, node, opts, breakpoint) => {
  if (rights.length && rights[breakpoint] && rights[breakpoint].length) {
    const right = postcss.rule();

    right.selectors = rights[breakpoint];

    if (opts.display === 'flex') {
      right.append({ prop: 'margin-left', value: 'auto' });
    } else if (opts.display === 'float') {
      right.append({ prop: 'float', value: 'right' });
    }

    node.append(right);
  }
};
