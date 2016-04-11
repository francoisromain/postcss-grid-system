module.exports = {
    flatten: function (arr) {
        var that = this;
        return arr.reduce(function (flat, next) {
            if (!next) {
                return flat;
            }
            return flat.concat(Array.isArray(next) ?
                that.flatten(next) : next);
        }, []);
    },
    selectorsAdd: function (rule, selectors) {
        if (selectors) {
            rule.selector = rule.selector ?
                rule.selector + ', ' + selectors.toString() :
                selectors.toString();
        }
    },
    declClean: function (decl) {
        if (decl.parent.nodes.length === 1) {
            decl.parent.remove();
        } else {
            decl.remove();
        }
    }
};
