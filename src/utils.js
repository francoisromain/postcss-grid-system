const flatten = (arr) =>
  arr.reduce((flat, next) => {
    if (!next) {
      return flat;
    }

    return flat.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);

const selectorsAdd = (selector, selectors) => {
  if (selectors && selector) return `${selector}, ${selectors.toString()}`;

  if (selectors) return selectors.toString();

  return selector;
};

const nodeRemove = (node, cleanParent) => {
  if (cleanParent && node.parent.nodes.length === 1) {
    node.parent.remove();
  } else {
    node.remove();
  }
};

export { flatten, selectorsAdd, nodeRemove };
