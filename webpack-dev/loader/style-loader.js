function loader(sources) {
  let style = `
    let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(sources)}
    document.head.appendChild(style);
  `
  return style;
}

module.exports = loader;