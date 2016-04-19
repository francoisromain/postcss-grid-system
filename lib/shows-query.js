'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (shows, node, breakpoint) {
  if (shows.length && shows[breakpoint] && shows[breakpoint].length) {
    var show = _postcss2.default.rule();

    show.selectors = shows[breakpoint];
    show.append({ prop: 'display', value: 'block' });
    show.append({ prop: 'visibility', value: 'visible' });

    node.append(show);
  }
};