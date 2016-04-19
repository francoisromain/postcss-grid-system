export default (customStyles, node, breakpoint) => {
  if (customStyles[breakpoint]) {
    for (let rule = 0; rule < customStyles[breakpoint].length; rule++) {
      node.append(customStyles[breakpoint][rule]);
    }
  }
};
