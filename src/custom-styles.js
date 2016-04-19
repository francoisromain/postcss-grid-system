export default (customStyles, node) => {
  if (customStyles) {
    for (let rule = 0; rule < customStyles.length; rule++) {
      node.append(customStyles[rule]);
    }
  }
};
