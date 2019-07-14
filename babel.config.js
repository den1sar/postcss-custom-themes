module.exports = {
  presets: [
    [
      '@babel/env',
      {
        debug: false,
        useBuiltIns: 'usage',
        targets: {
          node: '6',
        },
      },
    ],
  ],
};
