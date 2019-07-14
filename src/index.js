const postcss = require('postcss');
const readFile = require('./lib');

async function getCustomPropertiesFromCSSFile(from) {
  const css = await readFile(from);
  return postcss.parse(css, { from });
}

module.exports = postcss.plugin('postcss-custom-themes', opts => {
  opts = Object.assign({
    themes: [],
    importFrom: '',
    modules: false,
  }, opts);

  return async (css) => {
    if (opts.themes && opts.themes.length && opts.importFrom) {
      const cssFile = await getCustomPropertiesFromCSSFile(opts.importFrom);
      const regExp = /var\(--([^)]*)\)/g;
      css.walkRules(rule => {
        const hasVars = rule.some(i => i.value.match(regExp));
        if (hasVars) {
          opts.themes.forEach(theme => {
            const selector = opts.modules ? `:global(.theme-${theme})` : `.theme-${theme}`;
            const themeRule = rule.clone({
              selector: `${selector} ${rule.selector}`
            });
            themeRule.replaceValues(regExp, string => {
              const prop = string.replace(regExp, '$1');
              const hasThemeVar = cssFile.some(i => i.some(d => d.prop === `--theme-${theme}-${prop}`));

              if (hasThemeVar) {
                return `var(--theme-${theme}-${prop})`;
              }
            });
            themeRule.walkDecls(decl => {
              if (!decl.value.match(regExp)) {
                decl.remove();
              }
            });
            if (themeRule.nodes.length) {
              css.insertBefore(rule, themeRule);
            }
          });
        }
      });
    }
  }
});
