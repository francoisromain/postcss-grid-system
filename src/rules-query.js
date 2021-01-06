export default (rules) => {
  const res = [];
  for (let rule = 0; rule < rules.length; rule += 1) {
    res.push(rules[rule]);
  }

  return res;
};
