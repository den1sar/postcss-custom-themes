const fs = require('fs');
const postcss = require('postcss');
const postcssCustomProperties = require('postcss-custom-properties');
const customThemes = require('../src');

module.exports = mainTest;
async function mainTest(cssPath, options) {
  const css = await fs.readFileSync(cssPath, 'utf8');
  const result = await postcss([
    customThemes(options),
    postcssCustomProperties({
      preserve: false,
      importFrom: './test/css/colors.css',
    }),
  ]).process(css, {from: undefined});
  return result.css;
}
