module.exports = {
  flatten: function flatten(arr) {
    var that = this;
    return arr.reduce(function flattenReturn(flat, next) {
      if (!next) {
        return flat;
      }
      return flat.concat(Array.isArray(next) ? that.flatten(next) : next);
    }, []);
  },
  selectorsAdd: function selectorsAdd(rule, selectors) {
    var r = rule;
    if (selectors) {
      r.selector = r.selector ?
        r.selector + ', ' + selectors.toString() :
        selectors.toString();
    }
  },
  declClean: function declClean(decl) {
    if (decl.parent.nodes.length === 1) {
      decl.parent.remove();
    } else {
      decl.remove();
    }
  }
};
