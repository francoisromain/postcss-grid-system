export default (rules, node) => {
  if (rules) {
    for (let rule = 0; rule < rules.length; rule++) {
      node.append(rules[rule]);
    }
  }
};
