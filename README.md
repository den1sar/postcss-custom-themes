# postcss-custom-themes

Generate theme specific classes, substituting initial css variables for the theme ones.
Creates a global `theme-{themeName}` class that is prepended to every class that has css variables.
Must be inserted before postcss-custom-properties.

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
      modules: false,
    }),
    require('postcss-custom-properties')({
      preserve: true,
      importFrom: 'css/colors.css',
    })
  ]
}
```

## Options
|                    Name                     |            Type             | Required | Description                                        |
| :-----------------------------------------: | :-------------------------: | :---------: | :------------------------------------------------- |
|            **[`themes`](#themes)**          |          `Array`          |   `true`  | Array of theme prefixes                                |
|           **[`importFrom`](#importFrom)**           |    `String`    | `true`  | File with css variables. Needed for substitution checks                    |
|           **[`modules `](#modules)**           |    `Boolean`    | `false` default: `false`  | If you use `CSSModules`, set it to true in order to apply the theme class globally (wraps the theme class in `:global` selector).                    |

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
```

```css
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