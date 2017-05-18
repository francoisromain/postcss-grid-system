export default (rules, node) => {
  if (rules) {
    for (let rule = 0; rule < rules.length; rule += 1) {
      node.append(rules[rule]);
    }
  }
};
