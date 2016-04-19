'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (blobs, node, opts) {
  if (blobs && blobs.length && opts.display === 'float') {
    var blobFloat = _postcss2.default.rule();

    blobFloat.append({ prop: 'float', value: 'left' });
    blobFloat.append({ prop: 'clear', value: 'none' });

    for (var total = 2; total <= blobs.length; total++) {
      if (blobs[total]) {
        for (var ratio = 1; ratio < blobs[total].length; ratio++) {
          _utils2.default.selectorsAdd(blobFloat, blobs[total][ratio]);
        }
      }
    }

    node.append(blobFloat);
  }
};