# postcss-custom-themes
Postcss plugin duplicating class with theme selector and changing all variables to the same, only with theme prefix.

## Install
```npm install -D postcss-custom-themes```

## Usage
```js
// postcss.config.js

module.exports = {
  plugins: [
    require('postcss-custom-themes')({
      themes: ['dark'],
      importFrom: 'css/colors.css',
      modules: false, // not required
    }),
    require('postcss-custom-properties')({
      preserve: true,
      importFrom: 'css/colors.css',
    })
  ]
}
```

### Input CSS
```css
:root {
  --theme-dark-mainColor: #000;
  --theme-dark-additionalColor: #fff;
}

:root {
  --mainColor: #fff;
  --additionalColor: #000;
}

.root {
  display: block;
  background: var(--mainColor);
  color: var(--additionalColor);
}
```

## Output CSS
```css
.theme-dark .root {
  background: #000;
  color: #fff;
}
.root {
  display: block;
  background: #fff;
  color: #000;
}
```
