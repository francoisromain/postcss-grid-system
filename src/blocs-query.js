import postcss from 'postcss';
import { selectorsAdd } from './utils';

export default (blocs, node, opts, breakpoint) => {
  if (blocs.length) {
    const blocWidth = {};
    const blocLeft = {};
    const blocRight = {};

    const blocWidthFill = (unit, width) => {
      if (blocs[unit] && blocs[unit][width] && blocs[unit][width][1]) {
        selectorsAdd(blocWidth[width], blocs[unit][width][1]);
        selectorsAdd(blocLeft[width], blocs[unit][width][1]);
      }
      if (blocs[unit] && blocs[unit][width] && blocs[unit][width][0]) {
        selectorsAdd(blocWidth[width], blocs[unit][width][0]);
        selectorsAdd(blocRight[width], blocs[unit][width][0]);
      }
    };

    for (let width = 1; width <= breakpoint; width += 1) {
      blocLeft[width] = postcss.rule();
      blocRight[width] = postcss.rule();
      blocWidth[width] = postcss.rule();
      const blocWidthValue = opts.width * width - opts.gutter;
      if (opts.display === 'float') {
        blocLeft[width].append({ prop: 'float', value: 'left' });
        blocLeft[width].append({ prop: 'clear', value: 'none' });

        blocRight[width].append({ prop: 'float', value: 'right' });
        blocRight[width].append({ prop: 'clear', value: 'none' });
        blocWidth[width].append({
          prop: 'width',
          value: `${blocWidthValue}rem`,
        });
      } else {
        blocRight[width].append({ prop: 'margin-left', value: 'auto' });
        blocWidth[width].append({
          prop: 'flex',
          value: `0 1 ${blocWidthValue}rem`,
        });
      }
    }

    for (let unit = 0; unit <= opts.max; unit += 1) {
      if (unit < breakpoint) {
        blocWidthFill(unit, breakpoint);
      } else if (unit === breakpoint) {
        for (let width = 0; width <= breakpoint; width += 1) {
          blocWidthFill(unit, width);
        }
      }
    }

    for (let width = 1; width <= breakpoint; width += 1) {
      if (blocWidth[width].selector && blocWidth[width].nodes.length) {
        node.append(blocWidth[width]);
      }

      if (blocRight[width].selector && blocRight[width].nodes.length) {
        node.append(blocRight[width]);
      }

      if (blocLeft[width].selector && blocLeft[width].nodes.length) {
        node.append(blocLeft[width]);
      }
    }
  }
};
