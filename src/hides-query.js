import postcss from 'postcss';

export default (breakpoint, mediaQuery, hides) => {
  if (hides.length && hides[breakpoint] && hides[breakpoint].length) {
    const hide = postcss.rule();

    hide.selectors = hides[breakpoint];
    hide.append({ prop: 'display', value: 'none' });
    hide.append({ prop: 'visibility', value: 'hidden' });

    mediaQuery.append(hide);
  }
};
