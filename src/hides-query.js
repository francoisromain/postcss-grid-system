import postcss from 'postcss';

export default (hides, node) => {
  if (hides && hides.length) {
    const hide = postcss.rule();

    hide.selectors = hides;
    hide.append({ prop: 'display', value: 'none' });
    hide.append({ prop: 'visibility', value: 'hidden' });

    node.append(hide);
  }
};
