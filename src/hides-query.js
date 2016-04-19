import postcss from 'postcss';

export default (hides, node, breakpoint) => {
  if (hides.length && hides[breakpoint] && hides[breakpoint].length) {
    const hide = postcss.rule();

    hide.selectors = hides[breakpoint];
    hide.append({ prop: 'display', value: 'none' });
    hide.append({ prop: 'visibility', value: 'hidden' });

    node.append(hide);
  }
};
