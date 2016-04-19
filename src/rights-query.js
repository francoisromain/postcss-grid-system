import postcss from 'postcss';

export default (rights, node, opts) => {
  if (rights && rights.length) {
    const right = postcss.rule();

    right.selectors = rights;

    if (opts.display === 'flex') {
      right.append({ prop: 'margin-left', value: 'auto' });
    } else if (opts.display === 'float') {
      right.append({ prop: 'float', value: 'right' });
    }

    node.append(right);
  }
};
