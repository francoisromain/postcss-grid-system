import { selectorsAdd } from './utils';

export default (blocs, opts, breakpoint, { rule }) => {
  const blocWidthIndex = {};
  const blocLeftIndex = {};
  const blocRightIndex = {};
  const blocWidths = [];
  const blocLefts = [];
  const blocRights = [];

  const fill = (unit, width) => {
    if (blocs[unit] && blocs[unit][width] && blocs[unit][width][1]) {
      blocWidthIndex[width].selector = selectorsAdd(
        blocWidthIndex[width].selector,
        blocs[unit][width][1]
      );
      blocLeftIndex[width].selector = selectorsAdd(
        blocLeftIndex[width].selector,
        blocs[unit][width][1]
      );
    }

    if (blocs[unit] && blocs[unit][width] && blocs[unit][width][0]) {
      blocWidthIndex[width].selector = selectorsAdd(
        blocWidthIndex[width].selector,
        blocs[unit][width][0]
      );
      blocRightIndex[width].selector = selectorsAdd(
        blocRightIndex[width].selector,
        blocs[unit][width][0]
      );
    }
  };

  for (let width = 1; width <= breakpoint; width += 1) {
    blocLeftIndex[width] = rule();
    blocRightIndex[width] = rule();
    blocWidthIndex[width] = rule();

    const value = opts.width * width - opts.gutter;
    if (opts.display === 'float') {
      blocLeftIndex[width].append({ prop: 'float', value: 'left' });
      blocLeftIndex[width].append({ prop: 'clear', value: 'none' });

      blocRightIndex[width].append({ prop: 'float', value: 'right' });
      blocRightIndex[width].append({ prop: 'clear', value: 'none' });
      blocWidthIndex[width].append({
        prop: 'width',
        value: `${value}rem`,
      });
    } else {
      blocRightIndex[width].append({ prop: 'margin-left', value: 'auto' });
      blocWidthIndex[width].append({
        prop: 'flex',
        value: `0 1 ${value}rem`,
      });
    }
  }

  for (let unit = 0; unit <= opts.max; unit += 1) {
    if (unit < breakpoint) {
      fill(unit, breakpoint);
    } else if (unit === breakpoint) {
      for (let width = 0; width <= breakpoint; width += 1) {
        fill(unit, width);
      }
    }
  }

  for (let width = 1; width <= breakpoint; width += 1) {
    if (blocWidthIndex[width].selector && blocWidthIndex[width].nodes.length) {
      blocWidths.push(blocWidthIndex[width]);
    }

    if (blocRightIndex[width].selector && blocRightIndex[width].nodes.length) {
      blocRights.push(blocRightIndex[width]);
    }

    if (blocLeftIndex[width].selector && blocLeftIndex[width].nodes.length) {
      blocLefts.push(blocLeftIndex[width]);
    }
  }

  return { blocWidths, blocRights, blocLefts };
};
