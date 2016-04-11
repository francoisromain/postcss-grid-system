const utils = {
  flatten: function flatten(arr) {
    const that = this;

    return arr.reduce((flat, next) => {
      if (!next) {
        return flat;
      }

      return flat.concat(Array.isArray(next) ? that.flatten(next) : next);
    }, []);
  },
  selectorsAdd: function selectorsAdd(rule, selectors) {
    if (selectors) {
      const r = rule;

      r.selector = r.selector ?
        `${r.selector}, ${selectors.toString()}` :
        selectors.toString();
    }
  },
  declClean: function declClean(decl) {
    if (decl.parent.nodes.length === 1) {
      decl.parent.remove();
    } else {
      decl.remove();
    }
  },
};

export default utils;
