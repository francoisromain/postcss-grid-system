import postcss from 'postcss';

export default (shows, node) => {
  if (shows && shows.length) {
    const show = postcss.rule();

    show.selectors = shows;
    show.append({ prop: 'display', value: 'block' });
    show.append({ prop: 'visibility', value: 'visible' });

    node.append(show);
  }
};
