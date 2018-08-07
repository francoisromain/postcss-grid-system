const flatten = arr => arr.reduce((flat, next) => {
  if (!next) {
    return flat;
  }

  return flat.concat(Array.isArray(next) ? flatten(next) : next);
}, []);

const selectorsAdd = (rule, selectors) => {
  if (selectors) {
    const r = rule;

    r.selector = r.selector ? `${r.selector}, ${selectors.toString()}` : selectors.toString();
  }
};

const nodeClean = (node, cleanParent) => {
  if (cleanParent && node.parent.nodes.length === 1) {
    node.parent.remove();
  } else {
    node.remove();
  }
};

export { flatten, selectorsAdd, nodeClean };
