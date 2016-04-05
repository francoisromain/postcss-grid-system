var postcss = require('postcss');

module.exports = function (breakpoint, mediaQuery) {

    var show = postcss.rule({ selector: '.show-' + breakpoint });
    show.append({ prop: 'display', value: 'block' });
    show.append({ prop: 'visibility', value: 'visible' });
    mediaQuery.append(show);
};
