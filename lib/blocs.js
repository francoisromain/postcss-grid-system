'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (opts, rootCss, blocs) {
  var bloc = _postcss2.default.rule();
  bloc.selectors = _utils2.default.flatten(blocs);
  bloc.append({ prop: 'margin-right', value: opts.gutter + 'rem' });
  bloc.append({ prop: 'margin-bottom', value: opts.gutter + 'rem' });
  if (opts.display === 'flex') {
    bloc.append({ prop: 'flex', value: '0 1 100%' });
  } else if (opts.display === 'float') {
    bloc.append({ prop: 'clear', value: 'both' });
  }
  rootCss.append(bloc);
};