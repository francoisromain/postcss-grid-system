var postcss = require('postcss');

module.exports = function showsQuery(breakpoint, mediaQuery, shows) {
  var show;

  if (shows[breakpoint]) {
    show = postcss.rule();
    show.selectors = shows[breakpoint];
    show.append({ prop: 'display', value: 'block' });
    show.append({ prop: 'visibility', value: 'visible' });
    mediaQuery.append(show);
  }
};
