var postcss = require('postcss');

module.exports = function (opts, rootCss) {

    var blocLeft = postcss.rule({ selector: '.bloc-left' });
    if (opts.display === 'flex') {
        blocLeft.append({ prop: 'flex', value: '0 1 auto' });
    } else if (opts.display === 'float') {
        blocLeft.append({ prop: 'float', value: 'left' });
        blocLeft.append({ prop: 'clear', value: 'none' });
        blocLeft.selector +=
            ', .bloc-one-half, .bloc-one-third' +
            ', .bloc-two-third, .bloc-thumb';
    }
    rootCss.append(blocLeft);

    var blocOneHalf = postcss.rule({ selector: '.bloc-one-half' });
    var blocOneHalfValue = opts.unit / 2 - opts.gutter;
    if (opts.display === 'flex') {
        blocOneHalf.append({
            prop: 'flex',
            value: '0 1 ' + blocOneHalfValue + 'rem'
        });
    } else if (opts.display === 'float') {
        blocOneHalf.append({
            prop: 'width',
            value: blocOneHalfValue + 'rem'
        });
    }
    rootCss.append(blocOneHalf);

    var blocOneThird = postcss.rule({ selector: '.bloc-one-third' });
    var blocOneThirdValue = opts.unit / 3 - opts.gutter;
    if (opts.display === 'flex') {
        blocOneThird.append({
            prop: 'flex',
            value: '0 1 ' + blocOneThirdValue + 'rem'
        });
    } else if (opts.display === 'float') {
        blocOneThird.append({
            prop: 'width',
            value: blocOneThirdValue + 'rem'
        });
    }
    rootCss.append(blocOneThird);

    var blocTwoThird = postcss.rule({ selector: '.bloc-two-third' });
    var blocTwoThirdValue = opts.unit * 2 / 3 - opts.gutter;
    if (opts.display === 'flex') {
        blocTwoThird.append({
            prop: 'flex',
            value: '0 1 ' + blocTwoThirdValue + 'rem'
        });
    } else if (opts.display === 'float') {
        blocTwoThird.append({
            prop: 'width',
            value: blocTwoThirdValue + 'rem'
        });
    }
    rootCss.append(blocTwoThird);

    var thumbQty = 1;
    var blocThumb = postcss.rule({ selector: '.bloc-thumb' });
    blocThumb.append({
        prop: 'text-align',
        value: 'center'
    });
    while (opts.unit / thumbQty - opts.gutter > opts.thumb) {
        thumbQty++;
    }
    var blocThumbValue = opts.unit / (thumbQty - 1) - opts.gutter;
    if (opts.display === 'flex') {
        blocThumb.append({
            prop: 'flex',
            value: '0 1 ' + blocThumbValue + 'rem'
        });
    } else if (opts.display === 'float') {
        blocThumb.append({
            prop: 'width',
            value: blocThumbValue + 'rem'
        });
    }
    rootCss.append(blocThumb);
};
