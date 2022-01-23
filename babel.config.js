module.exports = {
  presets: [
    [
      '@babel/env',
      {
        debug: false,
        useBuiltIns: 'usage',
        corejs: "3.0",
        targets: {
          node: '6',
        },
      },
    ],
  ],
};
