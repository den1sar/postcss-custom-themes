const postcss = require('postcss');
const readFile = require('./lib');

async function getCustomPropertiesFromCSSFile(from) {
  const css = await readFile(from);
  return postcss.parse(css, {from});
}

module.exports = (opts) => {
  const options = Object.assign({
    themes: [],
    importFrom: '',
    modules: false,
  }, opts);

  return {
    postcssPlugin: 'postcss-custom-themes',
    async Rule(rule) {
      if (options.themes && options.themes.length && options.importFrom) {
        const cssFile = await getCustomPropertiesFromCSSFile(options.importFrom);
        const regExp = /var\(--([^)]*)\)/g;
        const hasVars = rule.some(i => typeof i.value === 'undefined' ? null : i.value.match(regExp));

        if (hasVars) {
          for (const theme of options.themes) {
            const selector = options.modules ? `:global(.theme-${theme})` : `.theme-${theme}`;
            const themeRule = rule.clone({
              selector: `${selector} ${rule.selector}`
            });

            themeRule.replaceValues(regExp, string => {
              const prop = string.replace(regExp, '$1');
              let newDeclValue;

              cssFile.walkDecls((decl) => {
                if (decl.prop === `--theme-${theme}-${prop}`) {
                  newDeclValue = `var(--theme-${theme}-${prop})`;
                }
              });

              return newDeclValue;
            });

            themeRule.walkDecls(decl => {
              if (!decl.value.match(regExp)) {
                decl.remove();
              }
            });

            if (themeRule.nodes.length) {
              rule.root().insertBefore(rule, themeRule);
            }
          }
        }
      }
    }
  }
}

module.exports.postcss = true;
